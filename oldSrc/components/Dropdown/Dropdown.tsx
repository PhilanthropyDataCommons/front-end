import React from 'react';
import './Dropdown.css';

interface DropdownProps {
	/**
	 * Should contain one `DropdownTrigger` and one `DropdownMenu`,
	 * in that order.
	 */
	children: React.ReactNode;
	/**
	 * When multiple dropdowns have the same `name`,
	 * only one of them can be open at a time (like an accordion).
	 */
	name?: string;
}

/**
 * Accessible, JavaScript-free dropdowns using the `<details>` element.
 */
export const Dropdown = ({ children, name = undefined }: DropdownProps) => (
	<details className="dropdown" name={name}>
		{children}
	</details>
);
