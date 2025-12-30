'use client';

import { useState, useEffect } from 'react';
import { User, Package, Heart, Settings, MapPin, Mail, Phone, Edit2, Save, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { UpdateUserDto } from '@/lib/api/users';

// Mock user data
const mockUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=7c3aed&color=fff',
  joinDate: '2023-06-15',
  address: {
    street: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    country: 'United States',
  },
  stats: {
    orders: 24,
    reviews: 18,
    wishlist: 12,
    spent: 2456.78,
  },
};

// Mock orders
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-12-20',
    status: 'Delivered',
    total: 299.99,
    items: 3,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
  },
  {
    id: 'ORD-002',
    date: '2024-12-15',
    status: 'Shipped',
    total: 89.99,
    items: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100',
  },
  {
    id: 'ORD-003',
    date: '2024-12-10',
    status: 'Processing',
    total: 149.99,
    items: 2,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=100',
  },
];

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
  });

  // Initialize form data with user data when user is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: (user as any).phone || '',
        address: (user as any).address || {
          street: '',
          city: '',
          state: '',
          zip: '',
          country: '',
        },
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const updateData: UpdateUserDto = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
      };
      await updateProfile(updateData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent((user.firstName || '') + ' ' + (user.lastName || ''))}&size=200&background=7c3aed&color=fff`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <img
              src={avatar}
              alt={`${formData.firstName} ${formData.lastName}`}
              className="w-24 h-24 rounded-full border-4 border-white shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-extrabold mb-2">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="text-xl text-purple-100">Member since {new Date((user as any).createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{(user as any).stats?.orders || 0}</p>
              <p className="text-gray-600">Total Orders</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{(user as any).stats?.reviews || 0}</p>
              <p className="text-gray-600">Reviews Written</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{(user as any).stats?.wishlist || 0}</p>
              <p className="text-gray-600">Wishlist Items</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Package className="h-8 w-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">${((user as any).stats?.spent || 0).toFixed(0)}</p>
              <p className="text-gray-600">Total Spent</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <User className="inline h-5 w-5 mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Package className="inline h-5 w-5 mr-2" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Heart className="inline h-5 w-5 mr-2" />
            Wishlist
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings className="inline h-5 w-5 mr-2" />
            Settings
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Personal Information
                </CardTitle>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline" className="border-2">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">First Name</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">Last Name</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email
                  </Label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone
                  </Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="mt-8">
                <Label className="text-gray-700 font-medium mb-4 block flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </Label>
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    placeholder="Street Address"
                    value={formData.address.street}
                    disabled={!isEditing}
                    className="h-12"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      value={formData.address.city}
                      disabled={!isEditing}
                      className="h-12"
                    />
                    <Input
                      placeholder="State"
                      value={formData.address.state}
                      disabled={!isEditing}
                      className="h-12"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="ZIP Code"
                      value={formData.address.zip}
                      disabled={!isEditing}
                      className="h-12"
                    />
                    <Input
                      placeholder="Country"
                      value={formData.address.country}
                      disabled={!isEditing}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <Link key={order.id} href={`/orders/${order.id}`}>
                    <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                      <img src={order.image} alt="Order" className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">{order.items} items</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ${order.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Wishlist
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center py-16">
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-6">Start adding items you love!</p>
                <Link href="/products">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Security</h3>
                  <Button variant="outline" className="w-full h-12 text-base font-semibold border-2">
                    Change Password
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                      <span className="text-gray-700">Email notifications</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                      <span className="text-gray-700">Order updates</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                      <span className="text-gray-700">Promotional emails</span>
                      <input type="checkbox" className="w-5 h-5" />
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h3>
                  <Button variant="outline" className="w-full h-12 text-base font-semibold border-2 border-red-600 text-red-600 hover:bg-red-50">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
