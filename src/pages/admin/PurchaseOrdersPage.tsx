
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, AlertCircle, Clock, ShoppingCart } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

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

const PurchaseOrdersPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  // Fetch purchase orders
  const { data: orders, isLoading, error, refetch } = useQuery({
    queryKey: ['purchase-orders', activeTab],
    queryFn: async () => {
      const { data, error } = await supabase
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
        .eq('status', activeTab)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as unknown as PurchaseOrder[];
    }
  });

  const handleApprove = async () => {
    if (!selectedOrder || !profile?.id) return;
    
    setIsApproving(true);
    
    try {
      const { data, error } = await supabase.rpc(
        'approve_purchase_order',
        { 
          order_id: selectedOrder.id,
          admin_id: profile.id
        }
      );
      
      if (error) throw error;
      
      toast({
        title: "Order Approved",
        description: "The purchase order has been approved successfully.",
      });
      
      setShowApproveDialog(false);
      refetch();
      
    } catch (error) {
      console.error('Error approving order:', error);
      toast({
        title: "Error",
        description: "There was an error approving the order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    if (!selectedOrder || !profile?.id || !rejectionReason) return;
    
    setIsRejecting(true);
    
    try {
      const { data, error } = await supabase.rpc(
        'reject_purchase_order',
        { 
          order_id: selectedOrder.id,
          admin_id: profile.id,
          reason: rejectionReason
        }
      );
      
      if (error) throw error;
      
      toast({
        title: "Order Rejected",
        description: "The purchase order has been rejected.",
      });
      
      setShowRejectDialog(false);
      setRejectionReason('');
      refetch();
      
    } catch (error) {
      console.error('Error rejecting order:', error);
      toast({
        title: "Error",
        description: "There was an error rejecting the order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRejecting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full py-16">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">
            You do not have permission to access this page.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h1 className="text-3xl font-display font-semibold">Purchase Orders</h1>
        </div>
        <p className="text-muted-foreground">
          Review and manage product purchase requests from users
        </p>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Pending</span>
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Approved</span>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span>Rejected</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-2">
          {renderOrdersTable(orders, 'pending')}
        </TabsContent>

        <TabsContent value="approved" className="mt-2">
          {renderOrdersTable(orders, 'approved')}
        </TabsContent>

        <TabsContent value="rejected" className="mt-2">
          {renderOrdersTable(orders, 'rejected')}
        </TabsContent>
      </Tabs>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Purchase Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this purchase order?
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="py-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Customer:</span>
                <span>{selectedOrder.user.full_name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Product:</span>
                <span>{selectedOrder.product_plan.product.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Plan:</span>
                <span>{selectedOrder.product_plan.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Amount:</span>
                <span>{formatCurrency(selectedOrder.amount)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Billing Cycle:</span>
                <span>{selectedOrder.billing_cycle}</span>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)} disabled={isApproving}>
              Cancel
            </Button>
            <Button onClick={handleApprove} disabled={isApproving}>
              {isApproving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Purchase Order</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this purchase order.
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="py-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Customer:</span>
                <span>{selectedOrder.user.full_name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Product:</span>
                <span>{selectedOrder.product_plan.product.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Plan:</span>
                <span>{selectedOrder.product_plan.name}</span>
              </div>
              
              <div className="mt-4">
                <label htmlFor="rejection-reason" className="block text-sm font-medium mb-2">
                  Rejection Reason
                </label>
                <textarea
                  id="rejection-reason"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter reason for rejection..."
                  required
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)} disabled={isRejecting}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject} 
              disabled={isRejecting || !rejectionReason.trim()}
            >
              {isRejecting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );

  function renderOrdersTable(orders: PurchaseOrder[] | undefined, status: string) {
    if (isLoading) {
      return (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="p-4 text-center text-destructive">
          An error occurred while loading purchase orders. Please try again.
        </div>
      );
    }
    
    if (!orders || orders.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          No {status} purchase orders at the moment.
        </div>
      );
    }
    
    return (
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              {status === 'rejected' && <TableHead>Reason</TableHead>}
              {status === 'pending' && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{formatDate(order.created_at)}</TableCell>
                <TableCell>
                  <div>{order.user.full_name}</div>
                  <div className="text-xs text-muted-foreground">{order.user.email}</div>
                </TableCell>
                <TableCell>{order.organization?.name || 'N/A'}</TableCell>
                <TableCell>{order.product_plan.product.name}</TableCell>
                <TableCell>{order.product_plan.name}</TableCell>
                <TableCell>
                  <div>{formatCurrency(order.amount)}</div>
                  <div className="text-xs text-muted-foreground">{order.billing_cycle}</div>
                </TableCell>
                {status === 'rejected' && (
                  <TableCell className="max-w-[200px]">
                    <div className="truncate">{order.rejection_reason}</div>
                  </TableCell>
                )}
                {status === 'pending' && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowApproveDialog(true);
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-destructive text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowRejectDialog(true);
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default PurchaseOrdersPage;
