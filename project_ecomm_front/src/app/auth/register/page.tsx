'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Benefits */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="relative z-10 text-white max-w-md space-y-10">
          <div>
            <h1 className="text-5xl font-extrabold mb-4">Start Your Selling Journey</h1>
            <p className="text-xl text-orange-100">Join thousands of sellers making their dreams a reality</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <div className="bg-white/20 p-3 rounded-xl">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">100% Free to Start</h3>
                <p className="text-orange-100">No listing fees or monthly charges</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <div className="bg-white/20 p-3 rounded-xl">
                <Clock className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">5 Minute Setup</h3>
                <p className="text-orange-100">Create your shop and start selling fast</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <div className="bg-white/20 p-3 rounded-xl">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Seller Protection</h3>
                <p className="text-orange-100">We've got your back every step of the way</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="space-y-4 pb-8">
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                <Store className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-4xl text-center font-extrabold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Join MarketPlace
            </CardTitle>
            <CardDescription className="text-center text-base text-gray-600">
              Create your free account and start exploring
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-6 pt-2">
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all" 
                disabled={loading}
              >
                {loading ? 'Creating account...' : (
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
              <p className="text-base text-center text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-orange-600 hover:text-orange-800 font-bold transition">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
