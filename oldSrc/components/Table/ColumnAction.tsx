import React from 'react';

interface ColumnActionProps {
	children: React.ReactNode;
	className?: string;
	title?: string;
	onClick?: () => void;
}

export const ColumnAction = ({
	children,
	className = '',
	title = '',
	onClick = () => null,
}: ColumnActionProps) => (
	<button
		type="button"
		onClick={onClick}
		className={`column-action ${className}`.trim()}
		title={title}
	>
		{children}
	</button>
);
