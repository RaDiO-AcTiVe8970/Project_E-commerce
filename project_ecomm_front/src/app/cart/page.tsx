'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/lib/hooks/useCart';

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeFromCart, getCartTotal, proceedToCheckout } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoCode.toUpperCase() === 'SAVE10') {
      setAppliedPromo({ code: promoCode, discount: 10 });
    } else if (promoCode.toUpperCase() === 'SAVE20') {
      setAppliedPromo({ code: promoCode, discount: 20 });
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = getCartTotal();
  const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal - discount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-32 w-32 text-gray-400 mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 text-xl mb-8">Start shopping and add items to your cart!</p>
          <Link href="/products">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 h-14">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold mb-2">Shopping Cart</h1>
          <p className="text-xl text-purple-100">{cartItems.length} items in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="shadow-lg border-0 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link href={`/products/${item.productId}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-xl hover:scale-105 transition-transform cursor-pointer"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link href={`/products/${item.productId}`}>
                            <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600 transition">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-gray-600 text-sm">Sold by {item.shop}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition p-2 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border-2 border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-4 py-2 hover:bg-gray-100 transition"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-6 py-2 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-4 py-2 hover:bg-gray-100 transition"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>

                      {/* Stock Status */}
                      {item.inStock ? (
                        <p className="text-green-600 text-sm mt-2">✓ In Stock</p>
                      ) : (
                        <p className="text-red-600 text-sm mt-2">✗ Out of Stock</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Continue Shopping */}
            <Link href="/products">
              <Button variant="outline" className="w-full h-12 text-base font-semibold border-2">
                ← Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-2xl border-0 sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={applyPromoCode}
                      variant="outline"
                      className="border-2"
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {appliedPromo.code} applied! {appliedPromo.discount}% off
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedPromo.discount}%)</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button 
                  onClick={proceedToCheckout}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg mb-4"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                {/* Benefits */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Truck className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Free Shipping</p>
                      <p>On orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Secure Payment</p>
                      <p>Your data is protected</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Tag className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Best Price</p>
                      <p>We offer competitive prices</p>
                    </div>
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
