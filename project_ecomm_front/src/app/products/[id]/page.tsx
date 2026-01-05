'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Store, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/hooks/useCart';
import { productsApi, Product } from '@/lib/api/products';
import { toast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getById(productId);
      setProduct(data);
    } catch (err: any) {
      console.error('Failed to fetch product:', err);
      setError(err.response?.data?.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    await addToCart({
      productId: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0] || 'https://via.placeholder.com/400',
      shop: product.shop.name,
      inStock: product.inventory > 0,
      maxStock: product.inventory,
      quantity: quantity,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-purple-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-purple-600">Products</Link>
          <span>/</span>
          <Link href={`/category/${product.category.slug}`} className="hover:text-purple-600">{product.category.name}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Images */}
          <div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl mb-4 group">
              <img
                src={product.images[selectedImage] || 'https://via.placeholder.com/500'}
                alt={product.title}
                className="w-full h-[500px] object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-xl overflow-hidden border-4 transition ${
                      selectedImage === index ? 'border-purple-500' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-24 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.title}</h1>
            
            {/* Shop Info */}
            <div className="flex items-center gap-4 mb-6">
              <Link href={`/shops/${product.shop.id}`} className="flex items-center gap-2 text-purple-600 hover:underline">
                <Store className="h-5 w-5" />
                <span className="font-medium">{product.shop.name}</span>
              </Link>
              {product.shop.isVerified && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Verified Seller
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inventory > 0 ? (
                <span className="text-green-600 font-semibold flex items-center gap-2">
                  <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
                  In Stock ({product.inventory} available)
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            {product.inventory > 0 && (
              <div className="flex items-center gap-6 mb-8">
                <span className="font-semibold text-gray-900">Quantity:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-6 w-6 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => setIsWishlisted(!isWishlisted)}
                variant="outline"
                className={`px-6 py-6 rounded-xl border-2 ${
                  isWishlisted ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>

            {/* Features */}
            <Card className="border-2 border-purple-100">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Truck className="h-6 w-6 text-purple-600" />
                    <span>Free Shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Shield className="h-6 w-6 text-purple-600" />
                    <span>Secure Payment & Buyer Protection</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <RotateCcw className="h-6 w-6 text-purple-600" />
                    <span>30-Day Easy Returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Shop Info Card */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Store className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{product.shop.name}</h3>
                  {product.shop.isVerified && (
                    <span className="text-green-600 font-medium">✓ Verified Seller</span>
                  )}
                </div>
              </div>
              <Button
                onClick={() => router.push(`/shops/${product.shop.id}`)}
                variant="outline"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Visit Shop
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
