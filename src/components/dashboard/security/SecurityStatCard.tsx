
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SecurityStatCardProps {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  subtitle?: string;
  colorClass?: string;
  progressBar?: {
    value: number;
    className?: string;
  };
}

const SecurityStatCard = ({
  title,
  value,
  icon,
  subtitle,
  colorClass,
  progressBar,
}: SecurityStatCardProps) => {
  return (
    <div className="bg-secondary/50 rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground">{title}</span>
        {icon}
      </div>
      <div className="flex items-end">
        <span className={cn("text-3xl font-bold", colorClass)}>
          {value}
        </span>
        {subtitle && (
          <span className="text-muted-foreground ml-2 mb-1">{subtitle}</span>
        )}
      </div>
      {progressBar && (
        <div className="w-full bg-background/50 rounded-full h-2 mt-2">
          <div 
            className={cn("h-2 rounded-full bg-primary", progressBar.className)} 
            style={{ width: `${progressBar.value}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SecurityStatCard;
