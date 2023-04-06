import React from 'react';

interface ColumnHeadProps {
  children?: React.ReactNode;
  className?: string;
  actions?: boolean;
  actionAlignment?: 'left' | 'right';
}

export const ColumnHead = ({
  children = null,
  className = '',
  actions = false,
  actionAlignment = 'right',
}: ColumnHeadProps) => (
  <th className={`
    ${className}
    ${actions ? `has-actions action-alignment--${actionAlignment}` : ''}
  `.trim()}
  >
    <div className="column-head-wrapper">
      {children}
    </div>
  </th>
);
