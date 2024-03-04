import React from 'react';
import './Dropdown.css';

interface DropdownProps {
	/**
	 * Should contain one `DropdownTrigger` and one `DropdownMenu`,
	 * in that order.
	 */
	children: React.ReactNode;
}

/**
 * Accessible, JavaScript-free dropdowns using the `<details>` element.
 */
export const Dropdown = ({ children }: DropdownProps) => (
	<details className="dropdown">{children}</details>
);
