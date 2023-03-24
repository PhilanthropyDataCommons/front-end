import React from 'react';

interface PanelTagProps {
  children: React.ReactNode;
  className?: string;
}

export const PanelTag = ({
  children,
  className = '',
}: PanelTagProps) => (
  <div className={`panel-tag ${className}`.trim()}>
    {children}
  </div>
);
