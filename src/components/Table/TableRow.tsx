import React from 'react';

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export const TableRow = ({
  children,
  className = '',
}: TableRowProps) => (
  <tr className={className}>
    {children}
  </tr>
);
