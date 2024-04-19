import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
	/**
	 * Sets the <button> type to "submit"
	 */
	submit?: boolean;
	/**
	 * Style the button like a text link
	 */
	linkStyle?: boolean;
	className?: string;
}

/**
 * Primary UI component for user interaction.
 *
 * Extends the native `<button>` element, so all its props are available here.
 */
export const Button = ({
	children = null,
	color = 'gray',
	inverted = false,
	bordered = true,
	notification = false,
	block = false,
	submit = false,
	linkStyle = false,
	className = undefined,
	...props
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

	if (className !== undefined) {
		buttonClassNames.push(className);
	}

	return (
		<button
			type={submit ? 'submit' : 'button'}
			className={buttonClassNames.join(' ').trim()}
			// We're extending a native element.
			// This is precisely where prop-spreading is kosher.
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		>
			{children}
		</button>
	);
};
