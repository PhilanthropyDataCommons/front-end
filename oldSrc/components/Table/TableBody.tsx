import React from 'react';

interface TableBodyProps {
	children: React.ReactNode;
	className?: string;
}

export const TableBody = ({ children, className = '' }: TableBodyProps) => (
	<tbody className={className}>{children}</tbody>
);
