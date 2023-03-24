import React from 'react';

interface PanelHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const PanelHeader = ({
  children,
  className = '',
}: PanelHeaderProps) => (
  <div className={`panel-header ${className}`.trim()}>
    {children}
  </div>
);
