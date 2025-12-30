'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Store, Sparkles, TrendingUp, Users, Package, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function BecomeSellerPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    shopName: '',
    description: '',
    category: '',
    website: '',
    phoneNumber: '',
    businessAddress: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to become a seller',
        variant: 'destructive',
      });
      router.push('/auth/login');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Create shop API endpoint
      // await shopApi.create(formData);
      
      toast({
        title: 'Application Submitted!',
        description: 'Your seller application has been received. We will review it shortly.',
      });
      
      // For now, just show success and redirect
      setTimeout(() => {
        router.push('/profile');
      }, 2000);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to submit application',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Store className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-6xl font-extrabold mb-4">Become a Seller</h1>
          <p className="text-2xl text-purple-100 max-w-3xl mx-auto">
            Join thousands of successful sellers and grow your business with our platform
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Grow Your Business</h3>
              <p className="text-gray-600">Reach millions of customers and scale your sales</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Built-in Audience</h3>
              <p className="text-gray-600">Connect with ready-to-buy customers instantly</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Low Commission</h3>
              <p className="text-gray-600">Keep more of what you earn with competitive rates</p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="shadow-2xl border-0 max-w-3xl mx-auto bg-white/90 backdrop-blur">
          <CardHeader className="border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl flex items-center gap-3">
              <Sparkles className="h-8 w-8" />
              Seller Application
            </CardTitle>
            <CardDescription className="text-purple-100 text-lg">
              Fill out the form below to start your journey as a seller
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-gray-700 font-semibold mb-2 block">
                  Shop Name *
                </Label>
                <Input
                  placeholder="Enter your shop name"
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  required
                  className="h-12 text-lg"
                />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold mb-2 block">
                  Shop Description *
                </Label>
                <Textarea
                  placeholder="Tell us about your shop and what you sell"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={5}
                  className="text-lg resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-700 font-semibold mb-2 block">
                    Category *
                  </Label>
                  <Input
                    placeholder="e.g., Electronics, Fashion, Home"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="h-12 text-lg"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 font-semibold mb-2 block">
                    Website (Optional)
                  </Label>
                  <Input
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    type="url"
                    className="h-12 text-lg"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-700 font-semibold mb-2 block">
                  Phone Number *
                </Label>
                <Input
                  placeholder="+1 (555) 123-4567"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                  type="tel"
                  className="h-12 text-lg"
                />
              </div>

              <div>
                <Label className="text-gray-700 font-semibold mb-2 block">
                  Business Address *
                </Label>
                <Textarea
                  placeholder="Enter your business address"
                  value={formData.businessAddress}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, businessAddress: e.target.value })}
                  required
                  rows={3}
                  className="text-lg resize-none"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  What happens next?
                </h4>
                <ul className="text-blue-800 space-y-2 ml-6 list-disc">
                  <li>We'll review your application within 1-2 business days</li>
                  <li>You'll receive an email with next steps</li>
                  <li>Once approved, you can start listing your products</li>
                </ul>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <p className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              10,000+
            </p>
            <p className="text-gray-600 text-lg">Active Sellers</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              1M+
            </p>
            <p className="text-gray-600 text-lg">Products Listed</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              $50M+
            </p>
            <p className="text-gray-600 text-lg">Total Sales</p>
          </div>
        </div>
      </div>
    </div>
  );
}
