import React from 'react';
import { cn } from '../lib/utils';

export interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  [key: string]: any;
}

export const BentoCard = ({ children, className, ...props }: BentoCardProps) => {
  return (
    <div
      {...props}
      className={cn(
        "bento-card glass rounded-3xl p-6 overflow-hidden relative group transition-all duration-500",
        className
      )}
    >
      {children}
    </div>
  );
};
