'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Store, Star, MapPin, Package, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Mock shops data
const mockShops = [
  {
    id: 1,
    name: 'TechGear Store',
    description: 'Premium electronics and tech accessories for modern living',
    rating: 4.8,
    reviews: 1234,
    products: 156,
    followers: 2340,
    sales: 5678,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400',
    location: 'San Francisco, CA',
    category: 'Electronics',
    verified: true,
  },
  {
    id: 2,
    name: 'Fashion Hub',
    description: 'Trendy fashion and accessories for every style',
    rating: 4.6,
    reviews: 892,
    products: 234,
    followers: 3450,
    sales: 4321,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    location: 'New York, NY',
    category: 'Fashion',
    verified: true,
  },
  {
    id: 3,
    name: 'Home Essentials',
    description: 'Quality home goods and decor for comfortable living',
    rating: 4.7,
    reviews: 567,
    products: 189,
    followers: 1890,
    sales: 3456,
    image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400',
    location: 'Austin, TX',
    category: 'Home',
    verified: true,
  },
  {
    id: 4,
    name: 'SportsPro',
    description: 'Professional sports equipment and activewear',
    rating: 4.9,
    reviews: 1567,
    products: 287,
    followers: 4560,
    sales: 7890,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400',
    location: 'Los Angeles, CA',
    category: 'Sports',
    verified: true,
  },
  {
    id: 5,
    name: 'Urban Bags',
    description: 'Stylish bags and leather goods for urban lifestyle',
    rating: 4.5,
    reviews: 678,
    products: 145,
    followers: 2100,
    sales: 2890,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400',
    location: 'Seattle, WA',
    category: 'Fashion',
    verified: false,
  },
  {
    id: 6,
    name: 'WearTech',
    description: 'Smart wearables and fitness technology',
    rating: 4.8,
    reviews: 934,
    products: 98,
    followers: 3210,
    sales: 4567,
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400',
    location: 'Boston, MA',
    category: 'Electronics',
    verified: true,
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Beauty'];

export default function ShopsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredShops = mockShops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || shop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold mb-4">Explore Shops</h1>
          <p className="text-xl text-orange-100">Discover unique shops from independent sellers worldwide</p>
          <div className="flex gap-6 mt-8">
            <div className="bg-white/20 backdrop-blur-lg px-6 py-4 rounded-2xl border border-white/30">
              <p className="text-3xl font-bold">10,000+</p>
              <p className="text-sm text-orange-100">Active Shops</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg px-6 py-4 rounded-2xl border border-white/30">
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-sm text-orange-100">Products</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg px-6 py-4 rounded-2xl border border-white/30">
              <p className="text-3xl font-bold">4.7★</p>
              <p className="text-sm text-orange-100">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for shops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base border-gray-300 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-12"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="followers">Most Followers</option>
              <option value="products">Most Products</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 text-lg mb-6">
          <span className="font-bold text-gray-900">{filteredShops.length}</span> shops found
        </p>

        {/* Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <Link key={shop.id} href={`/shops/${shop.id}`}>
              <Card className="group h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden">
                <div className="relative">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {shop.verified && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {shop.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                    {shop.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{shop.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
                    <MapPin className="h-4 w-4" />
                    {shop.location}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-bold text-lg">{shop.rating}</span>
                    </div>
                    <span className="text-gray-500">({shop.reviews} reviews)</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <Package className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                      <p className="font-bold text-gray-900">{shop.products}</p>
                      <p className="text-xs text-gray-500">Products</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-5 w-5 mx-auto mb-1 text-pink-600" />
                      <p className="font-bold text-gray-900">{shop.followers}</p>
                      <p className="text-xs text-gray-500">Followers</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                      <p className="font-bold text-gray-900">{shop.sales}</p>
                      <p className="text-xs text-gray-500">Sales</p>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Visit Shop
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredShops.length === 0 && (
          <div className="text-center py-16">
            <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No shops found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-3xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <Store className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-extrabold mb-4">Want to Start Your Own Shop?</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful sellers and turn your passion into profit
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto font-bold">
              Become a Seller
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
