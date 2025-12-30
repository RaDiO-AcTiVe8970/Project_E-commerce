'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Grid3x3, List, Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { productsApi, Product } from '@/lib/api/products';
import { categoriesApi, Category } from '@/lib/api/categories';
import { toast } from '@/hooks/use-toast';

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: Infinity },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productsApi.getAll(),
        categoriesApi.getAll(),
      ]);
      setProducts(productsData.data);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category?.name === selectedCategory;
    const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
    return matchesSearch && matchesCategory && matchesPrice && product.isActive;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold mb-4">Discover Products</h1>
          <p className="text-xl text-purple-100">Explore 50,000+ unique items from independent sellers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base border-gray-300 focus:border-purple-500"
                />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                className="h-12"
              >
                <Grid3x3 className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                className="h-12"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-wrap gap-3 mt-4">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => setSelectedPriceRange(range)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedPriceRange.label === range.label
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-orange-500'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 text-lg">
            <span className="font-bold text-gray-900">{filteredProducts.length}</span> products found
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Products Grid/List */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
          : 'flex flex-col gap-4'
        }>
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="group h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden">
                <div className="relative">
                  <img
                    src={product.images[0] || 'https://via.placeholder.com/400'}
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white shadow-lg transition">
                    <Heart className="h-5 w-5 text-gray-700 hover:text-red-500" />
                  </button>
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.category?.name}
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-sm text-gray-500 mb-1">{product.shop?.name}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">
                        {product.reviews && product.reviews.length > 0 ? '4.5' : 'New'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviews?.length || 0} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </p>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
