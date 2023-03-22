import React from 'react';

interface PanelBodyProps {
  children: React.ReactNode;
  className?: string;
  fill?: boolean;
}

export const PanelBody = ({
  children,
  className = '',
  fill = true,
}: PanelBodyProps) => (
  <div className={`panel-body ${fill ? 'panel-body--fill' : ''} ${className}`.trim()}>
    {children}
  </div>
);
