'use client';

import { useProducts } from '@/modules/products/hooks/useProducts';
import { MasonryGrid } from '@/components/ui/MasonryGrid';
import { ProductCard } from '@/components/modules/storefront/ProductCard';
import Link from 'next/link';

export default function StorefrontPage() {
  const { data, isLoading, error } = useProducts({ limit: 12 });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-foreground">Unable to load products</h2>
        <p className="mt-2 text-muted-foreground">
          Please check your connection and try again.
        </p>
      </div>
    );
  }

  const products = data?.docs || [];

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-foreground">No products found</h2>
        <p className="mt-2 text-muted-foreground">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-foreground tracking-tight sm:text-4xl">
          Discover Products
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore our curated selection of premium products from top vendors.
        </p>
      </header>

      <MasonryGrid>
        {products.map((product) => (
          <Link key={product._id} href={`/product/${product._id}`}>
            <ProductCard 
              product={{
                id: product._id,
                name: product.name,
                price: product.price,
                mainImage: product.mainImage,
                vendor: product.vendor
              }} 
            />
          </Link>
        ))}
      </MasonryGrid>
    </div>
  );
}
