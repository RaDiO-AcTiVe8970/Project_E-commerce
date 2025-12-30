'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { useCart } from '@/lib/hooks/useCart';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, User, LogOut, Store, Menu, Heart, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="border-b bg-white shadow-md sticky top-0 z-50 backdrop-blur-lg bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
              <Store className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MarketPlace
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for amazing products..."
                className="w-full px-6 py-3 pr-12 border-2 border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full hover:shadow-lg transition-all hover:scale-105">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 rounded-full">
                  <Heart className="h-6 w-6 text-gray-700" />
                </Button>
                
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 rounded-full">
                    <ShoppingCart className="h-6 w-6 text-gray-700" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>
                
                <Link href="/profile">
                  <Button variant="ghost" size="icon" className="hover:bg-purple-50 rounded-full">
                    <User className="h-6 w-6 text-gray-700" />
                  </Button>
                </Link>

                {user?.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}

                {user?.role === 'SELLER' && (
                  <Link href="/dashboard">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all">
                      Dashboard
                    </Button>
                  </Link>
                )}

                <Button variant="ghost" size="icon" onClick={logout} className="hover:bg-red-50 rounded-full">
                  <LogOut className="h-6 w-6 text-gray-700" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-purple-50 rounded-full">
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-6 py-3 pr-12 border-2 border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
