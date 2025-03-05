
import React from 'react';
import { SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Clock, XCircle, DollarSign, CreditCard, FileText, User, Building } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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

interface PurchaseOrderDetailsProps {
  order: PurchaseOrder;
  onClose: () => void;
}

const PurchaseOrderDetails: React.FC<PurchaseOrderDetailsProps> = ({ order, onClose }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
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

  const StatusIcon = () => {
    switch (order.status) {
      case 'approved':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'pending':
        return <Clock className="h-8 w-8 text-amber-500" />;
      case 'rejected':
        return <XCircle className="h-8 w-8 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <>
      <SheetHeader className="mb-6">
        <div className="flex justify-between items-center">
          <SheetTitle className="text-xl">Purchase Order Details</SheetTitle>
          <StatusIcon />
        </div>
        <SheetDescription>
          Order #{order.id.substring(0, 8)} • {formatDate(order.created_at)}
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-6">
        {/* Status Section */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="font-medium flex items-center mt-1">
                {getStatusBadge(order.status)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Payment</div>
              <div className="font-medium flex items-center mt-1">
                {getPaymentStatusBadge(order.payment_status)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Amount</div>
              <div className="font-medium mt-1">
                {formatCurrency(order.amount)}
              </div>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div>
          <h3 className="font-medium flex items-center mb-2">
            <FileText className="h-4 w-4 mr-2 text-primary" />
            Order Information
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Product</span>
              <span className="font-medium">{order.product_plan.product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan</span>
              <span>{order.product_plan.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Billing Cycle</span>
              <span className="capitalize">{order.billing_cycle}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Customer Information */}
        <div>
          <h3 className="font-medium flex items-center mb-2">
            <User className="h-4 w-4 mr-2 text-primary" />
            Customer Information
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer</span>
              <span className="font-medium">{order.user.full_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{order.user.email}</span>
            </div>
          </div>
          
          {order.organization && (
            <div className="mt-4">
              <h4 className="text-sm font-medium flex items-center mb-2">
                <Building className="h-4 w-4 mr-2 text-primary" />
                Organization
              </h4>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Organization</span>
                <span>{order.organization.name}</span>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Approval Information */}
        <div>
          <h3 className="font-medium flex items-center mb-2">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            Approval Information
          </h3>
          <div className="space-y-2">
            {order.status === 'approved' ? (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Approved On</span>
                  <span>{formatDate(order.approval_date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Approved By</span>
                  <span>{order.approved_by || 'N/A'}</span>
                </div>
              </>
            ) : order.status === 'rejected' ? (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rejected On</span>
                  <span>{formatDate(order.updated_at)}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-muted-foreground">Rejection Reason</span>
                  <span className="p-2 bg-muted rounded text-sm">
                    {order.rejection_reason || 'No reason provided'}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-amber-500" />
                  Awaiting approval
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <>
            <Separator />
            <div>
              <h3 className="font-medium flex items-center mb-2">
                <FileText className="h-4 w-4 mr-2 text-primary" />
                Notes
              </h3>
              <div className="p-3 bg-muted rounded-md text-sm">
                {order.notes}
              </div>
            </div>
          </>
        )}
      </div>

      <SheetFooter className="mt-8">
        <div className="flex gap-2 w-full">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          
          {order.status === 'pending' && (
            <>
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button variant="destructive" className="flex-1">
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
        </div>
      </SheetFooter>
    </>
  );
};

export default PurchaseOrderDetails;
