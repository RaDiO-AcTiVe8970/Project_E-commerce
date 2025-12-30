'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Store, CheckCircle, XCircle, Users, Package, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { shopsApi } from '@/lib/api/shops';
import apiClient from '@/lib/api/client';

interface Shop {
  id: string;
  name: string;
  description?: string;
  isVerified: boolean;
  createdAt: string;
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
}

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalShops: 0,
    verifiedShops: 0,
    pendingShops: 0,
  });

  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== 'ADMIN') {
      toast({
        title: 'Access Denied',
        description: 'You must be an admin to access this page',
        variant: 'destructive',
      });
      router.push('/');
      return;
    }

    if (user) {
      fetchShops();
    }
  }, [user]);

  const fetchShops = async () => {
    try {
      setLoading(true);
      // Get all shops (this endpoint should be admin-only)
      const response = await apiClient.get<Shop[]>('/shops');
      const shopsData = response.data;
      
      setShops(shopsData);
      setStats({
        totalShops: shopsData.length,
        verifiedShops: shopsData.filter(s => s.isVerified).length,
        pendingShops: shopsData.filter(s => !s.isVerified).length,
      });
    } catch (error) {
      console.error('Error fetching shops:', error);
      toast({
        title: 'Error',
        description: 'Failed to load shops',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyShop = async (shopId: string) => {
    try {
      await shopsApi.verify(shopId);
      
      toast({
        title: 'Shop Verified',
        description: 'The shop has been successfully verified',
      });
      
      // Refresh shops list
      fetchShops();
    } catch (error) {
      console.error('Error verifying shop:', error);
      toast({
        title: 'Error',
        description: 'Failed to verify shop',
        variant: 'destructive',
      });
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-2xl border-0">
          <CardContent className="p-12 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You must be an admin to access this page</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="h-12 w-12" />
            <div>
              <h1 className="text-5xl font-extrabold">Admin Panel</h1>
              <p className="text-xl text-purple-100 mt-2">Manage seller applications and shops</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Store className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalShops}</p>
              <p className="text-gray-600">Total Shops</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.verifiedShops}</p>
              <p className="text-gray-600">Verified Shops</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <XCircle className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingShops}</p>
              <p className="text-gray-600">Pending Verification</p>
            </CardContent>
          </Card>
        </div>

        {/* Shops List */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">Seller Applications</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading shops...</p>
              </div>
            ) : shops.length === 0 ? (
              <div className="text-center py-12">
                <Store className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">No shops found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {shops.map((shop) => (
                  <div
                    key={shop.id}
                    className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{shop.name}</h3>
                          {shop.isVerified ? (
                            <Badge className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge className="bg-orange-500">
                              <XCircle className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                        
                        {shop.description && (
                          <p className="text-gray-600 mb-3">{shop.description}</p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {shop.user.firstName} {shop.user.lastName} ({shop.user.email})
                            </span>
                          </div>
                          <div>
                            Created: {new Date(shop.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      {!shop.isVerified && (
                        <Button
                          onClick={() => handleVerifyShop(shop.id)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 ml-4"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verify Shop
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
