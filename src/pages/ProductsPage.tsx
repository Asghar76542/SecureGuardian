
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/DashboardLayout';
import ProductCard from '@/components/products/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Database, Loader2 } from 'lucide-react';

interface ProductFeature {
  name: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  features: ProductFeature[];
}

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);
        
      if (error) throw error;
      
      // Transform the data to match our Product interface
      return data.map(product => ({
        ...product,
        features: product.features as unknown as ProductFeature[]
      })) as Product[];
    }
  });

  // Filter products based on active tab
  const filteredProducts = products?.filter(product => {
    if (activeTab === 'all') return true;
    return product.type === activeTab;
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-semibold">Products & Plans</h1>
        <p className="text-muted-foreground">
          Explore our suite of security and infrastructure solutions designed to protect your digital assets
        </p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-6 mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security Solutions</span>
          </TabsTrigger>
          <TabsTrigger value="infrastructure" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Infrastructure Solutions</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="p-4 text-center text-destructive">
              An error occurred while loading products. Please try again.
            </div>
          ) : filteredProducts?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No products available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts?.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="p-4 text-center text-destructive">
              An error occurred while loading products. Please try again.
            </div>
          ) : filteredProducts?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No security products available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts?.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="infrastructure" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="p-4 text-center text-destructive">
              An error occurred while loading products. Please try again.
            </div>
          ) : filteredProducts?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No infrastructure products available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts?.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProductsPage;
