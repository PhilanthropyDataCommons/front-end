import React from 'react';
import './Dropdown.css';
// We use several `Button` classes and CSS variables.
import '../Button.css';

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A menu that is only visible when its `Dropdown` parent has an `open` attribute.
 */
const DropdownMenu = ({
  children,
  className = '',
}: DropdownMenuProps) => (
  <div className={`dropdown-menu ${className}`.trim()}>
    {children}
  </div>
);

interface DropdownProps {
  /**
   * Children will be rendered as the contents of the dropdown menu itself.
   * These are expected — but not required — to be `DropdownMenuLink` or
   * `DropdownMenuText` components.
   */
  children: React.ReactNode;
  /**
   * Content for the trigger button that toggles the menu.
   * Can be text, components, HTML, etc.
   */
  trigger: React.ReactNode;
  /**
   * Should the menu be aligned to the left or right edge of its toggle?
   */
  align?: 'left' | 'right';
  className?: string;
}

/**
 * Accessible, JavaScript-free dropdowns using the `<details>` element.
 */
export const Dropdown = ({
  children,
  trigger,
  align = 'left',
  className = '',
}: DropdownProps) => (
  <details className={`dropdown dropdown--${align} ${className}`.trim()}>
    <summary className="dropdown-trigger button button--bordered">
      {trigger}
    </summary>
    <DropdownMenu>
      {children}
    </DropdownMenu>
  </details>
);
