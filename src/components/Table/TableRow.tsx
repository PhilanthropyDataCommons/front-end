import React from 'react';

interface TableRowProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	active?: boolean;
}

export const TableRow = ({
	children,
	className = '',
	onClick = undefined,
	active = false,
}: TableRowProps) => (
	<tr
		className={`${className} ${onClick ? 'clickable' : ''} ${active ? 'active' : ''}`.trim()}
		onClick={onClick}
	>
		{children}
	</tr>
);
