import React from 'react';
import './Panel.css';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export const Panel = ({
  children,
  className = '',
}: PanelProps) => (
  <div className={`panel ${className}`.trim()}>
    {children}
  </div>
);
