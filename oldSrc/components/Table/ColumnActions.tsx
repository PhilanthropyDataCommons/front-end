import React from 'react';

interface ColumnActionsProps {
	children: React.ReactNode;
	className?: string;
}

export const ColumnActions = ({
	children,
	className = '',
}: ColumnActionsProps) => (
	<div className={`column-actions ${className}`.trim()}>{children}</div>
);
