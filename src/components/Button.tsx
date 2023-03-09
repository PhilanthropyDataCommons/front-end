import React from 'react';
import './button.css';

interface ButtonProps {
  /**
   * Contents of a `<Button>` can be a mix of strings and JSX elements,
   * and will be flex-aligned.
   */
  children: JSX.Element | JSX.Element[] | string;
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
  disabled?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;
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
  disabled = false,
  onClick = (() => true),
}: ButtonProps) => {
  const buttonClassNames = [
    'button',
    `button--color-${color}`,
  ];

  if (inverted) {
    buttonClassNames.push('button--inverted');
  }

  if (bordered) {
    buttonClassNames.push('button--bordered');
  }

  if (notification) {
    buttonClassNames.push('button--notification');
  }

  return (
    <button
      type="button"
      className={buttonClassNames.join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
