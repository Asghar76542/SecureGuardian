
import React from 'react';
import { XCircle } from 'lucide-react';

const SecuritySummaryError = () => {
  return (
    <div className="glass-panel rounded-xl p-6 mb-8 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900">
      <div className="flex items-center justify-center h-40">
        <div className="text-center">
          <XCircle className="mx-auto mb-2 h-10 w-10 text-red-500" />
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">Failed to load security data</h3>
          <p className="text-sm text-red-600 dark:text-red-300">Please refresh the page or contact support</p>
        </div>
      </div>
    </div>
  );
};

export default SecuritySummaryError;
