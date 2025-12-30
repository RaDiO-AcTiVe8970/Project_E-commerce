'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Store, ChevronLeft, ChevronRight, StarHalf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/hooks/useCart';

// Mock product data
const mockProduct = {
  id: 1,
  name: 'Premium Wireless Headphones',
  price: 89.99,
  originalPrice: 129.99,
  rating: 4.5,
  reviews: 128,
  sold: 1234,
  description: 'Experience premium sound quality with our advanced wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design perfect for all-day listening.',
  features: [
    'Active Noise Cancellation',
    '30 Hour Battery Life',
    'Bluetooth 5.0',
    'Quick Charge (10 min = 5 hours)',
    'Premium Leather Ear Cups',
    'Foldable Design',
  ],
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800',
    'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800',
  ],
  shop: {
    id: 1,
    name: 'TechGear Store',
    rating: 4.8,
    products: 156,
    followers: 2340,
  },
  category: 'Electronics',
  inStock: true,
  stock: 23,
};

const mockReviews = [
  {
    id: 1,
    user: 'John Doe',
    rating: 5,
    date: '2024-12-15',
    comment: 'Amazing sound quality! The noise cancellation works perfectly. Highly recommend!',
    helpful: 45,
  },
  {
    id: 2,
    user: 'Sarah Smith',
    rating: 4,
    date: '2024-12-10',
    comment: 'Great headphones, very comfortable for long listening sessions. Battery life is impressive.',
    helpful: 32,
  },
  {
    id: 3,
    user: 'Mike Johnson',
    rating: 5,
    date: '2024-12-05',
    comment: 'Best purchase this year! Worth every penny. The build quality is excellent.',
    helpful: 28,
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({
      productId: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      image: mockProduct.images[0],
      shop: mockProduct.shop.name,
      inStock: mockProduct.inStock,
      maxStock: mockProduct.stock,
      quantity: quantity,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-purple-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-purple-600">Products</Link>
          <span>/</span>
          <Link href={`/categories/${mockProduct.category}`} className="hover:text-purple-600">{mockProduct.category}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{mockProduct.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Images */}
          <div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl mb-4 group">
              <img
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.name}
                className="w-full h-[500px] object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                  -{discount}%
                </div>
              )}
              <button
                onClick={() => setSelectedImage((prev) => (prev - 1 + mockProduct.images.length) % mockProduct.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => setSelectedImage((prev) => (prev + 1) % mockProduct.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-xl overflow-hidden border-4 transition ${
                    selectedImage === index ? 'border-purple-500' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${mockProduct.name} ${index + 1}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{mockProduct.name}</h1>
            
            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(mockProduct.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : i < mockProduct.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 font-semibold text-lg">{mockProduct.rating}</span>
              </div>
              <span className="text-gray-500">|</span>
              <Link href="#reviews" className="text-purple-600 hover:underline font-medium">
                {mockProduct.reviews} Reviews
              </Link>
              <span className="text-gray-500">|</span>
              <span className="text-gray-600">{mockProduct.sold} Sold</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${mockProduct.price}
              </span>
              {mockProduct.originalPrice > mockProduct.price && (
                <span className="text-2xl text-gray-400 line-through">${mockProduct.originalPrice}</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {mockProduct.inStock ? (
                <p className="text-green-600 font-semibold text-lg">✓ In Stock ({mockProduct.stock} available)</p>
              ) : (
                <p className="text-red-600 font-semibold text-lg">✗ Out of Stock</p>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{mockProduct.description}</p>

            {/* Features */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-xl mb-4 text-gray-900">Key Features</h3>
              <ul className="space-y-2">
                {mockProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-full">
                      <div className="bg-white rounded-full w-2 h-2"></div>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold text-gray-900">Quantity:</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(mockProduct.stock, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                >
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="h-14 w-14 border-2"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" className="h-14 w-14 border-2">
                  <Share2 className="h-6 w-6" />
                </Button>
              </div>

              <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Buy Now
              </Button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <Truck className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-500">Orders over $50</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">30 Day Policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Info */}
        <Card className="mb-12 shadow-xl border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl">
                  <Store className="h-12 w-12 text-white" />
                </div>
                <div>
                  <Link href={`/shops/${mockProduct.shop.id}`} className="text-2xl font-bold text-gray-900 hover:text-purple-600">
                    {mockProduct.shop.name}
                  </Link>
                  <div className="flex items-center gap-4 mt-2 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {mockProduct.shop.rating} Rating
                    </span>
                    <span>|</span>
                    <span>{mockProduct.shop.products} Products</span>
                    <span>|</span>
                    <span>{mockProduct.shop.followers} Followers</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="border-2">
                  Visit Shop
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Follow
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <div id="reviews" className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Customer Reviews
          </h2>
          
          <div className="space-y-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{review.user}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-base mb-3">{review.comment}</p>
                <button className="text-sm text-purple-600 hover:underline font-medium">
                  Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-8 h-12 text-base font-semibold">
            Load More Reviews
          </Button>
        </div>
      </div>
    </div>
  );
}
