import React from 'react';

interface ColumnHeadProps {
  children?: React.ReactNode;
  className?: string;
  actions?: boolean;
}

export const ColumnHead = ({
  children = null,
  className = '',
  actions = false,
}: ColumnHeadProps) => (
  <th className={className}>
    {actions ? (
      <div className="column-actions-wrapper">{children}</div>
    ) : children}
  </th>
);
