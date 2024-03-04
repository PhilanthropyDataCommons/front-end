import React from 'react';

interface TableRowProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

export const TableRow = ({
	children,
	className = '',
	onClick = undefined,
}: TableRowProps) => (
	<tr
		className={`${className} ${onClick ? 'clickable' : ''}`.trim()}
		onClick={onClick}
	>
		{children}
	</tr>
);
