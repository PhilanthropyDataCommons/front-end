import React from 'react';
import './Panel.css';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  fill?: boolean;
}

export const Panel = ({
  children,
  className = '',
  fill = true,
}: PanelProps) => (
  <div className={`panel ${fill ? 'fill' : ''} ${className}`.trim()}>
    {children}
  </div>
);
