import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/layout/Footer';
import { TrendingUp, Shield, Truck, CreditCard, Sparkles, ShoppingBag, Heart, Star, ArrowRight, Tag, Zap, Store } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-white border border-white/30">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">New arrivals every week</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
              Discover Amazing
              <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Products & Deals
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto drop-shadow-lg">
              Shop from thousands of independent sellers and find unique items you&apos;ll love
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="text-lg px-10 py-7 bg-white text-purple-600 hover:bg-gray-100 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/become-seller">
                <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-white text-white hover:bg-white hover:text-purple-600 shadow-2xl transition-all duration-300 hover:scale-105">
                  <Store className="mr-2 h-5 w-5" />
                  Become a Seller
                </Button>
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/90">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                <span className="font-semibold">4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <span className="font-semibold">50K+ Products</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 fill-red-300 text-red-300" />
                <span className="font-semibold">100K+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-xl text-gray-600">Experience the best online shopping with amazing perks</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="mx-auto bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Secure Shopping</h3>
                <p className="text-gray-600">
                  Bank-level encryption protects your payment information at all times
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Fast Delivery</h3>
                <p className="text-gray-600">
                  Free shipping on orders over $50 with real-time tracking
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-orange-100">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-400 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="mx-auto bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Top Quality</h3>
                <p className="text-gray-600">
                  Hand-picked products from verified sellers with quality guarantee
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-400 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="mx-auto bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Easy Returns</h3>
                <p className="text-gray-600">
                  30-day money-back guarantee with free return shipping
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Deals Banner */}
      <section className="py-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-white">
            <Zap className="h-6 w-6 animate-pulse" />
            <p className="text-lg font-bold">Flash Sale! Up to 70% OFF on selected items</p>
            <Tag className="h-6 w-6 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">Explore our wide range of products</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', color: 'from-blue-400 to-blue-600', emoji: '📱' },
              { name: 'Fashion', color: 'from-pink-400 to-purple-600', emoji: '👗' },
              { name: 'Home & Garden', color: 'from-green-400 to-emerald-600', emoji: '🏡' },
              { name: 'Sports', color: 'from-orange-400 to-red-600', emoji: '⚽' },
              { name: 'Books', color: 'from-yellow-400 to-orange-600', emoji: '📚' },
              { name: 'Toys', color: 'from-cyan-400 to-blue-600', emoji: '🎮' },
              { name: 'Beauty', color: 'from-pink-400 to-red-600', emoji: '💄' },
              { name: 'Jewelry', color: 'from-purple-400 to-pink-600', emoji: '💎' },
            ].map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`}>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-40">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                    <span className="text-5xl mb-3 group-hover:scale-110 transition-transform">{category.emoji}</span>
                    <h3 className="font-bold text-xl">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Start earning today</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl">
            Ready to Start Selling?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-95 drop-shadow-lg">
            Join 10,000+ successful sellers already making money on our platform with zero setup fees
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/become-seller">
              <Button size="lg" className="text-lg px-10 py-7 bg-white text-purple-600 hover:bg-gray-100 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                <Sparkles className="mr-2 h-5 w-5" />
                Open Your Shop Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/seller-guide">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-white text-white hover:bg-white hover:text-purple-600 shadow-2xl transition-all duration-300">
                Learn More
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-white/80">Active Sellers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">$2M+</div>
              <div className="text-white/80">Monthly Sales</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-white/80">Seller Rating</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
