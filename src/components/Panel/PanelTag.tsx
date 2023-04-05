import React from 'react';

interface PanelTagProps {
  children: React.ReactNode;
  icon?: React.ReactElement | null;
  className?: string;
}

export const PanelTag = ({
  children,
  icon = undefined,
  className = '',
}: PanelTagProps) => (
  <div className={`panel-tag ${className}`.trim()}>
    {icon ? React.cloneElement(icon, { className: 'icon' }) : null}
    {children}
  </div>
);
