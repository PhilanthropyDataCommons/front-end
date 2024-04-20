import React from 'react';
import './Button.css';

interface ButtonProps {
	/**
	 * Contents of a `<Button>` can be a mix of strings and JSX elements,
	 * and will be flex-aligned.
	 */
	children: React.ReactNode;
	color?: 'gray' | 'blue' | 'red';
	/**
	 * Makes the button dark with light text.
	 */
	inverted?: boolean;
	/**
	 * Adds a visible border to the button.
	 */
	bordered?: boolean;
	/**
	 * Adds a notification disc to the button.
	 */
	notification?: boolean;
	/**
	 * Make the button occupy maximum available horizontal space.
	 */
	block?: boolean;
	disabled?: boolean;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
	/**
	 * Sets the <button> type to "submit"
	 */
	submit?: boolean;
	/**
	 * Style the button like a text link
	 */
	linkStyle?: boolean;
	title?: string;
}

/**
 * Primary UI component for user interaction.
 */
export const Button = ({
	children,
	color = 'gray',
	inverted = false,
	bordered = true,
	notification = false,
	block = false,
	disabled = false,
	onClick = () => true,
	submit = false,
	linkStyle = false,
	title = undefined,
}: ButtonProps) => {
	const buttonClassNames = ['button', `button--color-${color}`];

	if (inverted) {
		buttonClassNames.push('button--inverted');
	}

	if (bordered) {
		buttonClassNames.push('button--bordered');
	}

	if (notification) {
		buttonClassNames.push('button--notification');
	}

	if (block) {
		buttonClassNames.push('button--block');
	}

	if (linkStyle) {
		buttonClassNames.push('button--link-style');
	}

	return (
		<button
			type={submit ? 'submit' : 'button'}
			className={buttonClassNames.join(' ')}
			disabled={disabled}
			onClick={onClick}
			title={title}
		>
			{children}
		</button>
	);
};
