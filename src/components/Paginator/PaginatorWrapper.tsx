import React from 'react';

interface PaginatorWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PaginatorWrapper = ({
  children,
  className = '',
}: PaginatorWrapperProps) => (
  <div className={`paginator-wrapper ${className}`.trim()}>
    {children}
  </div>
);
