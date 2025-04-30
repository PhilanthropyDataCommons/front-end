import React from 'react';

interface DropdownMenuTextProps {
	children: React.ReactNode;
}

/**
 * Dropdown menu text introduce menu items,
 * but can also be used as intermediate or footnote elements
 * based on where in the markup they appear.
 */
export const DropdownMenuText = ({ children }: DropdownMenuTextProps) => (
	<div className="dropdown-menu-text">{children}</div>
);
