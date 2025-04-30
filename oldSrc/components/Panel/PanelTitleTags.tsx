import React from 'react';

interface PanelTitleTagsProps {
	children: React.ReactNode;
	className?: string;
}

export const PanelTitleTags = ({
	children,
	className = '',
}: PanelTitleTagsProps) => (
	<div className={`panel-title-tags ${className}`.trim()}>{children}</div>
);
