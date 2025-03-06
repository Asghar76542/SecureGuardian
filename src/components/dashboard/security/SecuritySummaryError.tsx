
import React from 'react';
import { XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SecuritySummaryErrorProps {
  refetch?: () => void; // Optional refetch function to retry loading data
}

const SecuritySummaryError = ({ refetch }: SecuritySummaryErrorProps) => {
  return (
    <div className="glass-panel rounded-xl p-6 mb-8 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900">
      <div className="flex items-center justify-center h-40">
        <div className="text-center">
          <XCircle className="mx-auto mb-2 h-10 w-10 text-red-500" />
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">Failed to load security data</h3>
          <p className="text-sm text-red-600 dark:text-red-300 mb-4">Please refresh the page or contact support</p>
          
          {refetch && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetch()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecuritySummaryError;
