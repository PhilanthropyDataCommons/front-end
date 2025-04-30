import React from 'react';

interface DropdownMenuLinkDescriptionProps {
	children: React.ReactNode;
}

/**
 * A `<Link>` element inside a dropdown menu.
 */
export const DropdownMenuLinkDescription = ({
	children,
}: DropdownMenuLinkDescriptionProps) => (
	<small className="description">{children}</small>
);
