import React from 'react';

interface PanelTitleWrapperProps {
	children: React.ReactNode;
	className?: string;
}

export const PanelTitleWrapper = ({
	children,
	className = '',
}: PanelTitleWrapperProps) => (
	<div className={`panel-title-wrapper ${className}`.trim()}>{children}</div>
);
