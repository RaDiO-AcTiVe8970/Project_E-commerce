'use client';

import { useState } from 'react';
import { Store, Package, DollarSign, TrendingUp, ShoppingBag, Eye, Heart, Plus, Edit, Trash2, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// Mock dashboard data
const mockStats = {
  totalSales: 12456.78,
  totalOrders: 234,
  totalProducts: 45,
  totalViews: 8932,
  pendingOrders: 12,
  salesGrowth: 23.5,
};

const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 89.99,
    stock: 23,
    sold: 156,
    views: 2341,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100',
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    stock: 12,
    sold: 89,
    views: 1678,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 149.99,
    stock: 0,
    sold: 234,
    views: 3456,
    status: 'out_of_stock',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=100',
  },
];

const mockOrders = [
  {
    id: 'ORD-1001',
    customer: 'John Doe',
    product: 'Wireless Headphones',
    amount: 89.99,
    status: 'pending',
    date: '2024-12-28',
  },
  {
    id: 'ORD-1002',
    customer: 'Jane Smith',
    product: 'Smart Watch Pro',
    amount: 299.99,
    status: 'shipped',
    date: '2024-12-27',
  },
  {
    id: 'ORD-1003',
    customer: 'Mike Johnson',
    product: 'Mechanical Keyboard',
    amount: 149.99,
    status: 'delivered',
    date: '2024-12-26',
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'analytics'>('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-extrabold mb-2">Seller Dashboard</h1>
              <p className="text-xl text-purple-100">Manage your shop and track your performance</p>
            </div>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 font-bold">
              <Plus className="mr-2 h-5 w-5" />
              Add Product
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 opacity-10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  +{mockStats.salesGrowth}%
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Total Sales</p>
              <p className="text-3xl font-extrabold text-gray-900">${mockStats.totalSales.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-600 opacity-10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {mockStats.pendingOrders} pending
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">Total Orders</p>
              <p className="text-3xl font-extrabold text-gray-900">{mockStats.totalOrders}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-600 opacity-10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Total Products</p>
              <p className="text-3xl font-extrabold text-gray-900">{mockStats.totalProducts}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-600 opacity-10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">Total Views</p>
              <p className="text-3xl font-extrabold text-gray-900">{mockStats.totalViews.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Store className="inline h-5 w-5 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Package className="inline h-5 w-5 mr-2" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="inline h-5 w-5 mr-2" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="inline h-5 w-5 mr-2" />
            Analytics
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <Card className="shadow-2xl border-0">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-bold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ${order.amount}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-2">
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="shadow-2xl border-0">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Top Products
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockProducts.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sold} sold • {product.views} views</p>
                      </div>
                      <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${product.price}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-2">
                  View All Products
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Manage Products
                </CardTitle>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mockProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl">
                    <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(product.status)}`}>
                          {product.status === 'active' ? 'Active' : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Price</p>
                          <p className="font-bold text-gray-900">${product.price}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Stock</p>
                          <p className="font-bold text-gray-900">{product.stock}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Sold</p>
                          <p className="font-bold text-gray-900">{product.sold}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Views</p>
                          <p className="font-bold text-gray-900">{product.views}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-2 text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                All Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold">{order.id}</td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4">{order.product}</td>
                        <td className="px-6 py-4 font-bold text-purple-600">${order.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{order.date}</td>
                        <td className="px-6 py-4">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sales Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center py-16">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-600">Detailed sales analytics and charts will be available here</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
