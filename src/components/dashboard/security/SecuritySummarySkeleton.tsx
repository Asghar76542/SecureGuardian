
import React from 'react';

const SecuritySummarySkeleton = () => {
  return (
    <div className="glass-panel rounded-xl p-6 mb-8 animate-pulse">
      <div className="h-24 bg-secondary/30 rounded-md mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-secondary/30 rounded-lg h-32"></div>
        ))}
      </div>
    </div>
  );
};

export default SecuritySummarySkeleton;
