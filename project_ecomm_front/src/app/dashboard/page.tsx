'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Store,
  Package,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
  Star,
  Plus,
  Edit,
  Trash2,
  X,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { productsApi, Product, CreateProductDto, SellerAnalytics } from '@/lib/api/products';
import { categoriesApi, Category } from '@/lib/api/categories';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'products'>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [analytics, setAnalytics] = useState<SellerAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState<CreateProductDto>({
    title: '',
    description: '',
    price: 0,
    inventory: 0,
    categoryId: '',
    images: [''],
    isActive: true,
  });

  useEffect(() => {
    if (user && user.role !== 'SELLER' && user.role !== 'ADMIN') {
      toast({
        title: 'Access Denied',
        description: 'You must be a seller to access this page',
        variant: 'destructive',
      });
      router.push('/');
      return;
    }

    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, analyticsData, categoriesData] = await Promise.all([
        productsApi.getMyProducts(),
        productsApi.getAnalytics(),
        categoriesApi.getAll(),
      ]);
      
      setProducts(productsData);
      setAnalytics(analyticsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        await productsApi.update(editingProduct.id, formData);
        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
      } else {
        await productsApi.create(formData);
        toast({
          title: 'Success',
          description: 'Product created successfully',
        });
      }
      
      setShowAddProduct(false);
      setEditingProduct(null);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to save product',
        variant: 'destructive',
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      inventory: product.inventory,
      categoryId: product.categoryId,
      images: product.images.length > 0 ? product.images : [''],
      isActive: product.isActive,
    });
    setShowAddProduct(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productsApi.delete(id);
      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete product',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      inventory: 0,
      categoryId: '',
      images: [''],
      isActive: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Store className="h-12 w-12" />
              <div>
                <h1 className="text-4xl font-extrabold">{analytics?.shop.name}</h1>
                <p className="text-purple-100 mt-1">
                  {analytics?.shop.isVerified ? '✓ Verified Seller' : '⏳ Pending Verification'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            My Products
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && analytics && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">
                        ${analytics.stats.totalRevenue.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center">
                      <DollarSign className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                      <p className="text-3xl font-bold text-gray-900">{analytics.stats.totalOrders}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-14 h-14 rounded-2xl flex items-center justify-center">
                      <ShoppingBag className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Products</p>
                      <p className="text-3xl font-bold text-gray-900">{analytics.stats.totalProducts}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {analytics.stats.activeProducts} active
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-14 h-14 rounded-2xl flex items-center justify-center">
                      <Package className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
                      <p className="text-3xl font-bold text-gray-900">{analytics.stats.totalReviews}</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center">
                      <Star className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Low Stock Items</p>
                      <p className="text-3xl font-bold text-gray-900">{analytics.stats.lowStockCount}</p>
                      <p className="text-xs text-orange-600 mt-1">Restock needed</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 w-14 h-14 rounded-2xl flex items-center justify-center">
                      <AlertTriangle className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Avg. Order Value</p>
                      <p className="text-3xl font-bold text-gray-900">
                        ${analytics.stats.totalOrders > 0 
                          ? (analytics.stats.totalRevenue / analytics.stats.totalOrders).toFixed(2)
                          : '0.00'
                        }
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-14 h-14 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
              <Button
                onClick={() => {
                  setShowAddProduct(true);
                  setEditingProduct(null);
                  resetForm();
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Add/Edit Product Modal */}
            {showAddProduct && (
              <Card className="mb-6 shadow-2xl border-0">
                <CardHeader className="border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setShowAddProduct(false);
                        setEditingProduct(null);
                        resetForm();
                      }}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmitProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Product Title *</Label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label>Category *</Label>
                        <select
                          value={formData.categoryId}
                          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                          required
                          className="w-full mt-1 px-3 py-2 border rounded-md"
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label>Price ($) *</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label>Inventory *</Label>
                        <Input
                          type="number"
                          value={formData.inventory}
                          onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) })}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Description *</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                          setFormData({ ...formData, description: e.target.value })
                        }
                        required
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={formData.images?.[0] || ''}
                        onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="isActive">Product is active</Label>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAddProduct(false);
                          setEditingProduct(null);
                          resetForm();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-600"
                      >
                        {editingProduct ? 'Update Product' : 'Create Product'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="shadow-lg border-0 overflow-hidden">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.images[0] || 'https://via.placeholder.com/400'}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {!product.isActive && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Inactive
                      </div>
                    )}
                    {product.inventory < 10 && product.inventory > 0 && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Low Stock
                      </div>
                    )}
                    {product.inventory === 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-2xl font-bold text-purple-600">${product.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Stock: {product.inventory}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProduct(product)}
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600 mb-4">No products yet</p>
                <Button
                  onClick={() => {
                    setShowAddProduct(true);
                    resetForm();
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Product
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
