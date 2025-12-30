'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, ShoppingBag, TrendingUp, Users, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="space-y-4 pb-8">
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                <Store className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-4xl text-center font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center text-base text-gray-600">
              Sign in to access your account and start shopping
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-purple-600 hover:text-purple-800 font-medium transition"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-6 pt-2">
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all" 
                disabled={loading}
              >
                {loading ? 'Signing in...' : (
                  <span className="flex items-center justify-center gap-2">
                    Sign in
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
              <p className="text-base text-center text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/auth/register" className="text-purple-600 hover:text-purple-800 font-bold transition">
                  Sign up for free
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* Right Side - Branding & Benefits */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="relative z-10 text-white max-w-md space-y-10">
          <div>
            <h1 className="text-5xl font-extrabold mb-4">Join the MarketPlace Revolution</h1>
            <p className="text-xl text-purple-100">Discover unique products from independent sellers worldwide</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <div className="bg-white/20 p-3 rounded-xl">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">50,000+ Products</h3>
                <p className="text-purple-100">From electronics to handmade crafts</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <div className="bg-white/20 p-3 rounded-xl">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">10,000+ Sellers</h3>
                <p className="text-purple-100">Trusted independent merchants</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <div className="bg-white/20 p-3 rounded-xl">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">100% Secure</h3>
                <p className="text-purple-100">Safe payments & buyer protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
