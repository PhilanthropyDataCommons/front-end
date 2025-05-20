import React from 'react';

interface RowCellProps {
	children?: React.ReactNode;
	className?: string;
	wrap?: boolean;
}

export const RowCell = ({
	children = null,
	className = '',
	wrap = false,
}: RowCellProps) => (
	<td className={`${wrap ? 'wrap' : ''} ${className}`.trim()}>{children}</td>
);
