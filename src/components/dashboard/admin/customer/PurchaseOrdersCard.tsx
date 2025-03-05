
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, AlertCircle } from 'lucide-react';

interface PurchaseOrdersCardProps {
  customerId: string;
  orgId?: string;
  onViewAllOrders: () => void;
}

const PurchaseOrdersCard: React.FC<PurchaseOrdersCardProps> = ({ 
  customerId, 
  orgId,
  onViewAllOrders 
}) => {
  // Fetch recent purchase orders for this customer
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['customer-purchase-orders-summary', customerId, orgId],
    queryFn: async () => {
      let query = supabase
        .from('purchase_orders')
        .select(`
          id,
          created_at,
          status,
          payment_status,
          amount,
          product_plan:product_plan_id(
            name,
            product:product_id(name)
          )
        `)
        .order('created_at', { ascending: false })
        .limit(3);
      
      // Filter by user or organization
      if (customerId) {
        query = query.eq('user_id', customerId);
      } else if (orgId) {
        query = query.eq('org_id', orgId);
      }
        
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  // Get count of pending orders
  const pendingCount = orders?.filter(order => order.status === 'pending').length || 0;

  // Format amounts
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>Loading recent orders...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-destructive gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>Error loading orders</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Purchase Orders
        </CardTitle>
        <CardDescription>
          Recent product purchase orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {pendingCount > 0 && (
              <div className="p-3 rounded-md bg-amber-50 border border-amber-200 text-amber-800">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">
                    {pendingCount} {pendingCount === 1 ? 'order requires' : 'orders require'} approval
                  </span>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <div className="font-medium">{order.product_plan.product.name}</div>
                    <div className="text-sm text-muted-foreground">{order.product_plan.name}</div>
                  </div>
                  <div className="text-right">
                    <div>{formatCurrency(order.amount)}</div>
                    <div>{getStatusBadge(order.status)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <h3 className="mt-2 font-medium">No Orders</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This customer hasn't placed any orders yet.
            </p>
          </div>
        )}
      </CardContent>
      {orders && orders.length > 0 && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onViewAllOrders}
          >
            View All Orders
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PurchaseOrdersCard;
