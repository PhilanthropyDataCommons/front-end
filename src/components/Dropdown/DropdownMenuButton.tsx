import React from 'react';

interface DropdownMenuButtonProps {
	children: React.ReactNode;
	/**
	 * Optional Heroicon element, to prepend (left) or append (right) to menu link.
	 */
	icon?: React.ReactElement;
	/**
	 * Align the icon on the left or right side of the menu link.
	 */
	alignIcon?: 'left' | 'right';
	className?: string;
	onClick?(): void;
}

/**
 * A `<Button>` element inside a dropdown menu.
 */
export const DropdownMenuButton = ({
	children,
	icon = undefined,
	alignIcon = 'left',
	className = '',
	onClick = undefined,
}: DropdownMenuButtonProps) => {
	const handleClick = (e: React.SyntheticEvent) => {
		const $target = e.nativeEvent.target as HTMLLinkElement;
		$target.closest('.dropdown')?.removeAttribute('open');

		if (onClick) {
			onClick();
		}
	};

	return (
		<button
			className={`dropdown-menu-item ${icon ? `has-icon align-icon--${alignIcon}` : ''} ${className}`.trim()}
			onClick={handleClick}
			type="button"
		>
			{icon && alignIcon === 'left' && icon}
			<span>{children}</span>
			{icon && alignIcon === 'right' && icon}
		</button>
	);
};
