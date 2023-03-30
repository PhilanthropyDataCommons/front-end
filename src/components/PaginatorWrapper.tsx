import React from 'react';

interface PaginatorWrapperProps {
  children: React.ReactNode;
}

export const PaginatorWrapper = ({
  children,
}: PaginatorWrapperProps) => (
  <div className="paginator-wrapper">
    {children}
  </div>
);
