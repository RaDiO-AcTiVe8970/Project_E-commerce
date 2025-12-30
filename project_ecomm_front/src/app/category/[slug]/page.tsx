'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { productsApi, Product } from '@/lib/api/products';
import { categoriesApi, Category } from '@/lib/api/categories';
import { useCart } from '@/lib/hooks/useCart';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  const { addToCart } = useCart();
  
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [categorySlug, page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoryData, productsData] = await Promise.all([
        categoriesApi.getBySlug(categorySlug),
        productsApi.getAll({ categorySlug, page, limit: 12 }),
      ]);
      
      setCategory(categoryData);
      setProducts(productsData.data);
      setTotalPages(productsData.meta.totalPages);
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0] || 'https://via.placeholder.com/400',
      shop: product.shop.name,
      inStock: product.inventory > 0,
      maxStock: product.inventory,
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-8 w-8" />
            <h1 className="text-5xl font-extrabold">{category.name}</h1>
          </div>
          <p className="text-xl text-purple-100">
            {products.length} products available
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
            <p className="text-gray-600 mb-8">Check back later for new products in this category</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                Browse All Products
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden bg-white"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={product.images[0] || 'https://via.placeholder.com/400'}
                        alt={product.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.inventory < 10 && product.inventory > 0 && (
                        <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Only {product.inventory} left!
                        </div>
                      )}
                      {product.inventory === 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Out of Stock
                        </div>
                      )}
                      {product.shop.isVerified && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          Verified
                        </div>
                      )}
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{product.shop.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${product.price.toFixed(2)}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.inventory === 0}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      variant={page === pageNum ? 'default' : 'outline'}
                      className={
                        page === pageNum
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                          : ''
                      }
                    >
                      {pageNum}
                    </Button>
                  ))}
                </div>
                <Button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
