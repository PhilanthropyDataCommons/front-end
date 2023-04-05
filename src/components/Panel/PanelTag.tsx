import React from 'react';

interface PanelTagProps {
  children: React.ReactNode;
  icon?: React.ReactElement | null;
  badge?: string | null;
  className?: string;
}

export const PanelTag = ({
  children,
  icon = undefined,
  badge = undefined,
  className = '',
}: PanelTagProps) => (
  <div className={`panel-tag ${className}`.trim()}>
    {icon ? React.cloneElement(icon, { className: 'icon' }) : null}
    {badge ? <span className="badge">{badge}</span> : null}
    {children}
  </div>
);
