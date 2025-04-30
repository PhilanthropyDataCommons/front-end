import React from 'react';
import './Table.css';

interface TableProps {
	children: React.ReactNode;
	className?: string;
	/**
	 * Table body cells won't wrap and will have a max-width,
	 * above which the text will be hidden.
	 */
	truncate?: boolean;
}

export const Table = ({
	children,
	className = '',
	truncate = false,
}: TableProps) => (
	<table
		border={0}
		cellPadding={0}
		cellSpacing={0}
		className={`table ${truncate ? 'truncate' : ''} ${className}`.trim()}
	>
		{children}
	</table>
);
