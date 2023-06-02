import React from 'react';

interface PanelBodyProps {
  children: React.ReactNode;
  /**
   * Controls whether the panel body has internal padding.
   */
  padded?: boolean;
  className?: string;
}

export const PanelBody = ({
  children,
  className = '',
  padded = true,
}: PanelBodyProps) => (
  <div className={`panel-body ${padded ? 'panel-body--padded' : ''} ${className}`.trim()}>
    {children}
  </div>
);
