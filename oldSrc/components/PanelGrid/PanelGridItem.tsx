import React from 'react';

interface PanelGridItemProps {
	/**
	 * Should only be passed `Panel` components.
	 */
	children: React.ReactNode;
	className?: string;
}

export const PanelGridItem = ({
	children,
	className = '',
}: PanelGridItemProps) => (
	<div className={`panel-grid-item ${className}`.trim()}>{children}</div>
);
