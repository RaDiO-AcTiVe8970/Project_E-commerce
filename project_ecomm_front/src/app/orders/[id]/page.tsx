'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ordersApi, Order, OrderStatus } from '@/lib/api/orders';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  CreditCard,
  ArrowLeft,
  Clock,
  XCircle
} from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchOrder();
    }
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await ordersApi.getById(params.id as string);
      setOrder(data);
    } catch (error: any) {
      console.error('Error fetching order:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to load order',
        variant: 'destructive',
      });
      router.push('/profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case OrderStatus.SHIPPED:
        return <Truck className="h-8 w-8 text-blue-500" />;
      case OrderStatus.PROCESSING:
        return <Package className="h-8 w-8 text-yellow-500" />;
      case OrderStatus.PAID:
        return <CreditCard className="h-8 w-8 text-purple-500" />;
      case OrderStatus.PENDING:
        return <Clock className="h-8 w-8 text-orange-500" />;
      case OrderStatus.CANCELLED:
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Package className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return 'bg-green-100 text-green-800';
      case OrderStatus.SHIPPED:
        return 'bg-blue-100 text-blue-800';
      case OrderStatus.PROCESSING:
        return 'bg-yellow-100 text-yellow-800';
      case OrderStatus.PAID:
        return 'bg-purple-100 text-purple-800';
      case OrderStatus.PENDING:
        return 'bg-orange-100 text-orange-800';
      case OrderStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const orderSteps = [
    { status: OrderStatus.PENDING, label: 'Order Placed', icon: Calendar },
    { status: OrderStatus.PAID, label: 'Payment Confirmed', icon: CreditCard },
    { status: OrderStatus.PROCESSING, label: 'Processing', icon: Package },
    { status: OrderStatus.SHIPPED, label: 'Shipped', icon: Truck },
    { status: OrderStatus.DELIVERED, label: 'Delivered', icon: CheckCircle },
  ];

  const currentStepIndex = orderSteps.findIndex(step => step.status === order.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/profile">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Profile
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-extrabold mb-2">Order Details</h1>
              <p className="text-xl text-purple-100">Order #{order.id.slice(0, 8).toUpperCase()}</p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusIcon(order.status)}
              <span className={`px-4 py-2 rounded-full text-lg font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Progress */}
        {order.status !== OrderStatus.CANCELLED && (
          <Card className="shadow-2xl border-0 mb-8">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl">Order Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                {orderSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={step.status} className="flex flex-col items-center flex-1">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                        isCompleted ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gray-200'
                      }`}>
                        <Icon className={`h-8 w-8 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <p className={`text-sm font-medium text-center ${
                        isCurrent ? 'text-purple-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                      {index < orderSteps.length - 1 && (
                        <div className={`absolute h-1 w-full top-8 -z-10 ${
                          index < currentStepIndex ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
                        }`} style={{ left: '50%', width: `${100 / (orderSteps.length - 1)}%` }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl">Order Items ({order.items.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <img
                        src={item.product.images[0] || 'https://via.placeholder.com/100'}
                        alt={item.product.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <Link href={`/products/${item.productId}`}>
                          <h3 className="text-lg font-bold text-gray-900 hover:text-purple-600 mb-1">
                            {item.product.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.product.shop.name} • {item.product.category.name}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                          <span className="text-lg font-bold text-purple-600">
                            ${item.price.toFixed(2)} each
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Shipping */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="shadow-2xl border-0">
              <CardHeader className="border-b">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Commission</span>
                    <span>${order.commission.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="shadow-2xl border-0">
              <CardHeader className="border-b">
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-1 text-gray-700">
                  <p className="font-medium">{order.user?.firstName} {order.user?.lastName}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Info */}
            <Card className="shadow-2xl border-0">
              <CardHeader className="border-b">
                <CardTitle className="text-xl">Order Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium">
                      {new Date(order.updatedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-mono font-medium">{order.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
