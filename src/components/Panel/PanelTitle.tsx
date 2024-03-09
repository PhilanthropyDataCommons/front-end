import React from 'react';

const PANEL_TITLE_TRUNCATE_LENGTH = 50;

interface PanelTitleProps {
	children: React.ReactNode;
	className?: string;
}

export const PanelTitle = ({ children, className = '' }: PanelTitleProps) => (
	<h1 className={`panel-title ${className}`.trim()}>{children}</h1>
);

export { PANEL_TITLE_TRUNCATE_LENGTH };
