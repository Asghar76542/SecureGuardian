
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Clock, CheckCircle, XCircle, FileText, Download, Filter, SearchIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PurchaseOrderDetails from './PurchaseOrderDetails';

interface PurchaseOrder {
  id: string;
  user_id: string;
  org_id: string;
  product_plan_id: string;
  status: string;
  payment_status: string;
  amount: number;
  billing_cycle: string;
  approval_date: string | null;
  approved_by: string | null;
  rejection_reason: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  user: {
    full_name: string;
    email: string;
  };
  organization: {
    name: string;
  } | null;
  product_plan: {
    name: string;
    product: {
      name: string;
    };
  };
}

interface PurchaseOrdersListProps {
  customerId: string;
  orgId?: string;
}

const PurchaseOrdersList: React.FC<PurchaseOrdersListProps> = ({ customerId, orgId }) => {
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Fetch purchase orders for the specific customer
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['customer-purchase-orders', customerId, orgId],
    queryFn: async () => {
      let query = supabase
        .from('purchase_orders')
        .select(`
          *,
          user:user_id(full_name, email),
          organization:org_id(name),
          product_plan:product_plan_id(
            name,
            product:product_id(name)
          )
        `)
        .order('created_at', { ascending: false });
      
      // Filter by user or organization
      if (customerId) {
        query = query.eq('user_id', customerId);
      } else if (orgId) {
        query = query.eq('org_id', orgId);
      }
        
      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as PurchaseOrder[];
    }
  });

  // Filter orders based on search query and status filter
  const filteredOrders = orders?.filter(order => {
    // Status filter
    if (statusFilter && order.status !== statusFilter) {
      return false;
    }
    
    // Search query
    const searchLower = searchQuery.toLowerCase();
    return (
      !searchQuery || 
      order.product_plan.product.name.toLowerCase().includes(searchLower) ||
      order.product_plan.name.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

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

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'refunded':
        return <Badge variant="secondary">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewDetails = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleExportOrders = () => {
    // Implementation for exporting orders
    if (!orders) return;
    
    // Create CSV content
    const headers = ['ID', 'Date', 'Product', 'Plan', 'Amount', 'Status', 'Payment Status'];
    const csvContent = [
      headers.join(','),
      ...orders.map(order => [
        order.id,
        new Date(order.created_at).toISOString().split('T')[0],
        order.product_plan.product.name,
        order.product_plan.name,
        order.amount,
        order.status,
        order.payment_status
      ].join(','))
    ].join('\n');
    
    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `purchase-orders-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <div className="text-center py-6">Loading purchase orders...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-destructive bg-destructive/10 rounded-md">
        Error loading purchase orders: {(error as Error).message}
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>View and manage customer purchase orders</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportOrders}
                disabled={!orders || orders.length === 0}
              >
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={statusFilter === null ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter(null)}
              >
                All
              </Button>
              <Button 
                variant={statusFilter === "pending" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter("pending")}
                className="flex items-center gap-1"
              >
                <Clock className="h-3 w-3" /> Pending
              </Button>
              <Button 
                variant={statusFilter === "approved" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter("approved")}
                className="flex items-center gap-1"
              >
                <CheckCircle className="h-3 w-3" /> Approved
              </Button>
              <Button 
                variant={statusFilter === "rejected" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter("rejected")}
                className="flex items-center gap-1"
              >
                <XCircle className="h-3 w-3" /> Rejected
              </Button>
            </div>
          </div>
          
          {filteredOrders && filteredOrders.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow 
                      key={order.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleViewDetails(order)}
                    >
                      <TableCell className="font-medium">{formatDate(order.created_at)}</TableCell>
                      <TableCell>{order.product_plan.product.name}</TableCell>
                      <TableCell>{order.product_plan.name}</TableCell>
                      <TableCell>{formatCurrency(order.amount)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{getPaymentStatusBadge(order.payment_status)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(order);
                          }}
                        >
                          <FileText className="h-4 w-4 mr-1" /> Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery || statusFilter 
                ? 'No purchase orders match your search criteria.' 
                : 'No purchase orders found for this customer.'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Drawer */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="sm:max-w-xl">
          {selectedOrder && (
            <PurchaseOrderDetails 
              order={selectedOrder} 
              onClose={() => setIsDetailsOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PurchaseOrdersList;
