import React from 'react';
import './Table.css';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table = ({
  children,
  className = '',
}: TableProps) => (
  <table border={0} cellPadding={0} cellSpacing={0} className={`table ${className}`.trim()}>
    {children}
  </table>
);
