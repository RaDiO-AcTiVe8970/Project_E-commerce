'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Store, Star, MapPin, Package, Users, TrendingUp, Search, Grid3x3, List, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Mock shop data
const mockShop = {
  id: 1,
  name: 'TechGear Store',
  description: 'Premium electronics and tech accessories for modern living. We specialize in high-quality gadgets and innovative technology products.',
  rating: 4.8,
  reviews: 1234,
  products: 156,
  followers: 2340,
  sales: 5678,
  image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200',
  location: 'San Francisco, CA',
  category: 'Electronics',
  verified: true,
  joinDate: '2022-05-15',
  responseTime: '< 2 hours',
  shippingTime: '2-4 days',
};

// Mock products from this shop
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.5,
    reviews: 128,
    sold: 234,
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    rating: 4.8,
    reviews: 256,
    sold: 456,
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400',
    rating: 4.9,
    reviews: 312,
    sold: 567,
  },
  {
    id: 9,
    name: 'Wireless Mouse',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    rating: 4.6,
    reviews: 189,
    sold: 789,
  },
  {
    id: 10,
    name: 'USB-C Hub',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
    rating: 4.4,
    reviews: 145,
    sold: 321,
  },
  {
    id: 11,
    name: 'Laptop Stand',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    rating: 4.7,
    reviews: 203,
    sold: 432,
  },
];

export default function ShopDetailPage() {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isFollowing, setIsFollowing] = useState(false);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Shop Header */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white">
        <div className="absolute inset-0 opacity-20">
          <img src={mockShop.image} alt={mockShop.name} className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Shop Logo */}
            <div className="bg-white p-6 rounded-3xl shadow-2xl">
              <Store className="h-24 w-24 text-purple-600" />
            </div>

            {/* Shop Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-5xl font-extrabold">{mockShop.name}</h1>
                {mockShop.verified && (
                  <div className="bg-blue-500 p-2 rounded-full" title="Verified Shop">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <p className="text-xl text-purple-100 mb-6 max-w-3xl">{mockShop.description}</p>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg">{mockShop.rating}</span>
                  <span className="text-purple-100">({mockShop.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{mockShop.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  <span>{mockShop.products} Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{mockShop.followers} Followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>{mockShop.sales} Sales</span>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => setIsFollowing(!isFollowing)}
                className={`font-bold text-lg px-8 ${
                  isFollowing
                    ? 'bg-white text-purple-600 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
                }`}
              >
                {isFollowing ? '✓ Following' : '+ Follow Shop'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Shop Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Package className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{mockShop.products}</p>
              <p className="text-gray-600">Total Products</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{mockShop.sales}</p>
              <p className="text-gray-600">Total Sales</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{mockShop.rating}</p>
              <p className="text-gray-600">Shop Rating</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{mockShop.followers}</p>
              <p className="text-gray-600">Followers</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Response Time</h3>
              <p className="text-gray-600">{mockShop.responseTime}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Shipping Time</h3>
              <p className="text-gray-600">{mockShop.shippingTime}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Member Since</h3>
              <p className="text-gray-600">{new Date(mockShop.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Shop Products
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search products in this shop..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base border-gray-300 focus:border-purple-500"
                />
              </div>
            </div>

            {/* View Toggle & Sort */}
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
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {product.sold} sold
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
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
        </div>
      </div>
    </div>
  );
}
