import React from 'react';

interface RowHeadProps {
	children: React.ReactNode;
	className?: string;
}

export const RowHead = ({ children, className = '' }: RowHeadProps) => (
	<th className={className}>{children}</th>
);
