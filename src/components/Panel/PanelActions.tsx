import React from 'react';

interface PanelActionsProps {
	children: React.ReactNode;
	className?: string;
}

export const PanelActions = ({
	children,
	className = '',
}: PanelActionsProps) => (
	<div className={`panel-actions ${className}`.trim()}>{children}</div>
);
