import React from 'react';

interface TableHeadProps {
	children: React.ReactNode;
	className?: string;
	fixed?: boolean;
}

export const TableHead = ({
	children,
	className = '',
	fixed = false,
}: TableHeadProps) => (
	<thead className={`${fixed ? 'fixed' : ''} ${className}`.trim()}>
		{children}
	</thead>
);
