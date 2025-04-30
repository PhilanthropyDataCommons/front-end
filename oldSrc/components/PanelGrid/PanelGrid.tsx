import React from 'react';
import './PanelGrid.css';

interface PanelGridProps {
	/**
	 * Should only be passed `PanelGridItem` components.
	 */
	children: React.ReactNode;
	/**
	 * Makes the first panel sized properly for a sidebar.
	 * Doesn't require any additional markup on the sidebar panel.
	 */
	sidebarred?: boolean;
	className?: string;
}

export const PanelGrid = ({
	children,
	className = '',
	sidebarred = false,
}: PanelGridProps) => (
	<div
		className={`panel-grid ${sidebarred ? 'sidebarred' : ''} ${className}`.trim()}
	>
		{children}
	</div>
);
