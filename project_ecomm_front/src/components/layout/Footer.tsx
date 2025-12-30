import Link from 'next/link';
import { Store, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                <Store className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-extrabold">MarketPlace</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              Your trusted multi-vendor marketplace for discovering unique products from independent sellers worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 mr-0 group-hover:mr-2 transition-all"></span>
                All Products
              </Link></li>
              <li><Link href="/categories" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 mr-0 group-hover:mr-2 transition-all"></span>
                Categories
              </Link></li>
              <li><Link href="/shops" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 mr-0 group-hover:mr-2 transition-all"></span>
                Shops
              </Link></li>
              <li><Link href="/deals" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 mr-0 group-hover:mr-2 transition-all"></span>
                Deals
              </Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-pink-500 mr-0 group-hover:mr-2 transition-all"></span>
                Help Center
              </Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-pink-500 mr-0 group-hover:mr-2 transition-all"></span>
                Contact Us
              </Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-pink-500 mr-0 group-hover:mr-2 transition-all"></span>
                Shipping Info
              </Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-pink-500 mr-0 group-hover:mr-2 transition-all"></span>
                Returns
              </Link></li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Sell With Us</h3>
            <ul className="space-y-3">
              <li><Link href="/become-seller" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-2 transition-all"></span>
                Become a Seller
              </Link></li>
              <li><Link href="/seller-guide" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-2 transition-all"></span>
                Seller Guide
              </Link></li>
              <li><Link href="/fees" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-2 transition-all"></span>
                Fees & Pricing
              </Link></li>
              <li><Link href="/policies" className="text-gray-300 hover:text-white transition flex items-center group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-2 transition-all"></span>
                Policies
              </Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} MarketPlace. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
