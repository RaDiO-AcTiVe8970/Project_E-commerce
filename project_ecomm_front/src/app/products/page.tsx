'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Grid3x3, List, Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Mock data - will be replaced with API calls
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.5,
    reviews: 128,
    shop: 'TechGear Store',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    rating: 4.8,
    reviews: 256,
    shop: 'WearTech',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Designer Sunglasses',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    rating: 4.6,
    reviews: 89,
    shop: 'Fashion Hub',
    category: 'Fashion'
  },
  {
    id: 4,
    name: 'Leather Backpack',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    rating: 4.7,
    reviews: 145,
    shop: 'Urban Bags',
    category: 'Fashion'
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400',
    rating: 4.9,
    reviews: 312,
    shop: 'TechGear Store',
    category: 'Electronics'
  },
  {
    id: 6,
    name: 'Running Shoes',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 4.4,
    reviews: 203,
    shop: 'SportsPro',
    category: 'Sports'
  },
  {
    id: 7,
    name: 'Coffee Maker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    rating: 4.3,
    reviews: 167,
    shop: 'Home Essentials',
    category: 'Home'
  },
  {
    id: 8,
    name: 'Yoga Mat Premium',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    rating: 4.6,
    reviews: 98,
    shop: 'FitLife',
    category: 'Sports'
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Toys', 'Beauty'];
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

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
    return matchesSearch && matchesCategory && matchesPrice;
  });

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
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
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
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white shadow-lg transition">
                    <Heart className="h-5 w-5 text-gray-700 hover:text-red-500" />
                  </button>
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.category}
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-sm text-gray-500 mb-1">{product.shop}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${product.price}
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
