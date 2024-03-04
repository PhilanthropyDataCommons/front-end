import React from 'react';
import { Link } from 'react-router-dom';

interface DropdownMenuLinkProps {
	/**
	 * Destination path or URL.
	 */
	to: string;
	children: React.ReactNode;
	/**
	 * Skip client-side routing and let the browser load the URL like a normal `<a href>`.
	 */
	reloadDocument?: boolean;
	/**
	 * Optional Heroicon element, to prepend (left) or append (right) to menu link.
	 */
	icon?: React.ReactElement;
	/**
	 * Align the icon on the left or right side of the menu link.
	 */
	alignIcon?: 'left' | 'right';
}

/**
 * A `<Link>` element inside a dropdown menu.
 */
export const DropdownMenuLink = ({
	to,
	children,
	reloadDocument = false,
	icon = undefined,
	alignIcon = 'left',
}: DropdownMenuLinkProps) => {
	const handleClick = (e: React.SyntheticEvent) => {
		const $target = e.nativeEvent.target as HTMLLinkElement;
		$target.closest('.dropdown')?.removeAttribute('open');
	};

	return (
		<Link
			to={to}
			className={`dropdown-menu-link ${icon ? `has-icon align-icon--${alignIcon}` : ''}`.trim()}
			onClick={handleClick}
			reloadDocument={reloadDocument}
		>
			{icon && alignIcon === 'left' && icon}
			{children}
			{icon && alignIcon === 'right' && icon}
		</Link>
	);
};
