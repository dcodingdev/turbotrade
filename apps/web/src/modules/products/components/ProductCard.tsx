'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    mainImage: {
      url: string;
    };
    vendor: {
      name: string;
    };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-1 mb-8">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={product.mainImage.url || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Button 
            variant="default"
            size="sm"
            className="flex items-center gap-2 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Add to cart', product.id);
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {product.vendor.name}
            </p>
            <h3 className="mt-1 text-sm font-semibold text-foreground line-clamp-1">
              {product.name}
            </h3>
          </div>
          <p className="text-sm font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
