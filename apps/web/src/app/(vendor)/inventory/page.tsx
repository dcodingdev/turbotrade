'use client';

import { useVendorProducts } from '@/modules/products/hooks/useVendorProducts';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, MoreHorizontal, Package } from "lucide-react";
import Image from 'next/image';

export default function InventoryPage() {
  // Hardcoded vendor ID for current phase (Mocking session)
  const vendorId = "v_123"; 
  const { data, isLoading, error } = useVendorProducts(vendorId);

  const products = data?.docs || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">Manage your product catalog and stock levels.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-center w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell><div className="h-10 w-10 bg-muted rounded" /></TableCell>
                  <TableCell><div className="h-4 w-32 bg-muted rounded" /></TableCell>
                  <TableCell><div className="h-4 w-20 bg-muted rounded" /></TableCell>
                  <TableCell><div className="h-4 w-12 bg-muted rounded ml-auto" /></TableCell>
                  <TableCell><div className="h-4 w-12 bg-muted rounded ml-auto" /></TableCell>
                  <TableCell><div className="h-8 w-8 bg-muted rounded mx-auto" /></TableCell>
                </TableRow>
              ))
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Package className="h-12 w-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm">Start by adding your first product to the catalog.</p>
                    <Button variant="outline" className="mt-4 gap-2">
                      <Plus className="h-4 w-4" />
                      Add First Product
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded border border-border bg-muted">
                      <Image 
                        src={product.mainImage.url || '/placeholder.jpg'} 
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-xs uppercase text-muted-foreground font-semibold">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      In Stock
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon-sm" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" className="text-destructive hover:bg-destructive/10" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
