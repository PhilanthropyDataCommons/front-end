import React from 'react';

interface ColumnActionProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ColumnAction = ({
  children,
  className = '',
  onClick = () => null,
}: ColumnActionProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`column-action ${className}`.trim()}
  >
    {children}
  </button>
);
