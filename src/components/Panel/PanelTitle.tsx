import React from 'react';

interface PanelTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const PanelTitle = ({
  children,
  className = '',
}: PanelTitleProps) => (
  <h1 className={`panel-title ${className}`.trim()}>
    {children}
  </h1>
);
