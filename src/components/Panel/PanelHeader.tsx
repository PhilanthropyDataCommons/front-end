import React from 'react';

interface PanelHeaderProps {
  children: React.ReactNode;
  /**
   * Controls whether the panel body has internal padding.
   */
  padded?: boolean;
  className?: string;
}

export const PanelHeader = ({
  children,
  className = '',
  padded = true,
}: PanelHeaderProps) => (
  <div className={`panel-header ${padded ? 'panel-header--padded' : ''} ${className}`.trim()}>
    {children}
  </div>
);
