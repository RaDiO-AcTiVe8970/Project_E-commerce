'use client';

import Link from 'next/link';
import { Package, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    icon: '📱',
    description: 'Gadgets, devices, and tech accessories',
    products: 12453,
    trending: true,
    gradient: 'from-blue-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
  },
  {
    id: 2,
    name: 'Fashion',
    icon: '👗',
    description: 'Clothing, shoes, and accessories',
    products: 8921,
    trending: true,
    gradient: 'from-pink-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
  },
  {
    id: 3,
    name: 'Home & Garden',
    icon: '🏡',
    description: 'Furniture, decor, and home essentials',
    products: 6734,
    trending: false,
    gradient: 'from-green-500 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400',
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    icon: '⚽',
    description: 'Equipment, activewear, and outdoor gear',
    products: 5432,
    trending: true,
    gradient: 'from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
  },
  {
    id: 5,
    name: 'Books & Media',
    icon: '📚',
    description: 'Books, music, movies, and games',
    products: 9876,
    trending: false,
    gradient: 'from-yellow-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
  },
  {
    id: 6,
    name: 'Toys & Games',
    icon: '🎮',
    description: 'Toys, games, and entertainment',
    products: 4321,
    trending: true,
    gradient: 'from-cyan-500 to-blue-500',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400',
  },
  {
    id: 7,
    name: 'Beauty & Health',
    icon: '💄',
    description: 'Cosmetics, skincare, and wellness',
    products: 7654,
    trending: true,
    gradient: 'from-pink-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
  },
  {
    id: 8,
    name: 'Jewelry & Watches',
    icon: '💎',
    description: 'Fine jewelry, watches, and accessories',
    products: 3210,
    trending: false,
    gradient: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  },
  {
    id: 9,
    name: 'Automotive',
    icon: '🚗',
    description: 'Car parts, accessories, and tools',
    products: 5678,
    trending: false,
    gradient: 'from-gray-600 to-gray-800',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
  },
  {
    id: 10,
    name: 'Pet Supplies',
    icon: '🐾',
    description: 'Food, toys, and care for your pets',
    products: 4567,
    trending: true,
    gradient: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400',
  },
  {
    id: 11,
    name: 'Arts & Crafts',
    icon: '🎨',
    description: 'Supplies for creative projects',
    products: 3456,
    trending: false,
    gradient: 'from-red-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
  },
  {
    id: 12,
    name: 'Office Supplies',
    icon: '📎',
    description: 'Stationery, furniture, and equipment',
    products: 2345,
    trending: false,
    gradient: 'from-blue-600 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
  },
];

export default function CategoriesPage() {
  const trendingCategories = categories.filter(cat => cat.trending);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold mb-4">Browse Categories</h1>
          <p className="text-xl text-purple-100">Explore products from all categories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trending Categories */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-8 w-8 text-orange-500" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Trending Categories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {trendingCategories.map((category) => (
              <Link key={category.id} href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-60 group-hover:opacity-40 transition`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl">{category.icon}</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Hot
                    </div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">{category.products.toLocaleString()} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* All Categories */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Package className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              All Categories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50 group-hover:opacity-30 transition`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl drop-shadow-lg">{category.icon}</span>
                    </div>
                    {category.trending && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                        <TrendingUp className="h-4 w-4" />
                        Trending
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {category.products.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">products</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-700"></div>
          <div className="relative z-10">
            <Package className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-extrabold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Browse all products or use our search to find exactly what you need
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products">
                <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition">
                  Browse All Products
                </button>
              </Link>
              <Link href="/shops">
                <button className="bg-white/20 backdrop-blur-lg border-2 border-white text-white hover:bg-white/30 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition">
                  Explore Shops
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
