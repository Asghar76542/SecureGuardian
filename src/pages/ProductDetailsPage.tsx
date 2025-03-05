
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import PlanCard from '@/components/products/PlanCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Shield, Database, Lock, Package, Key, Tag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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

interface Plan {
  id: string;
  product_id: string;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  features: string[];
  is_popular: boolean;
}

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();

  const { 
    data: product, 
    isLoading: productLoading,
    error: productError 
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
        
      if (error) throw error;
      
      return {
        ...data,
        features: data.features as unknown as ProductFeature[]
      } as Product;
    },
    enabled: !!productId
  });

  const { 
    data: plans, 
    isLoading: plansLoading,
    error: plansError 
  } = useQuery({
    queryKey: ['product-plans', productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");
      
      const { data, error } = await supabase
        .from('product_plans')
        .select('*')
        .eq('product_id', productId)
        .eq('is_active', true)
        .order('price', { ascending: true });
        
      if (error) throw error;
      return data as Plan[];
    },
    enabled: !!productId
  });

  const getIcon = () => {
    if (!product) return null;
    
    switch (product.type) {
      case 'security':
        return <Shield className="h-6 w-6 text-primary" />;
      case 'infrastructure':
        return <Database className="h-6 w-6 text-primary" />;
      case 'hardware':
        if (product.name.toLowerCase().includes('yubi')) {
          return <Key className="h-6 w-6 text-primary" />;
        } else if (product.name.toLowerCase().includes('faraday')) {
          return <Package className="h-6 w-6 text-primary" />;
        } else if (product.name.toLowerCase().includes('tag')) {
          return <Tag className="h-6 w-6 text-primary" />;
        } else {
          return <Lock className="h-6 w-6 text-primary" />;
        }
      default:
        return null;
    }
  };

  const isLoading = productLoading || plansLoading;
  const error = productError || plansError;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !product) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center py-16">
          <p className="text-destructive mb-4">Error loading product details</p>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate('/products')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2 mb-2">
          {getIcon()}
          <h1 className="text-3xl font-display font-semibold">{product.name}</h1>
        </div>
        <p className="text-muted-foreground">
          {product.description}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.features.map((feature, index) => (
            <div key={index} className="bg-card p-4 rounded-lg border">
              <h3 className="font-medium mb-2">{feature.name}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-medium mb-2">Available Plans</h2>
        <p className="text-muted-foreground mb-6">
          {product.type === 'hardware' 
            ? 'Enterprise-grade security hardware with simple procurement options' 
            : 'Enterprise-grade security with simple annual billing'}
        </p>
        
        {plans && plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                productName={product.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No plans available for this product at the moment.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductDetailsPage;
