
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ProductSetupChecklists from '@/components/dashboard/admin/product-setup/ProductSetupChecklists';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductSetupPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-semibold">Product Setup Instructions</h1>
            <p className="text-muted-foreground">
              Detailed checklists and guides for setting up each product to meet specifications.
            </p>
          </div>
          <button 
            onClick={() => navigate('/admin')}
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            <Shield className="h-4 w-4" />
            Back to Admin Dashboard
          </button>
        </div>
      </div>
      
      <ProductSetupChecklists />
    </DashboardLayout>
  );
};

export default ProductSetupPage;
