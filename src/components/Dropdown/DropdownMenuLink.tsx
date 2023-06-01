import React from 'react';
import { Link } from 'react-router-dom';

interface DropdownMenuLinkProps {
  /**
   * Destination path or URL.
   */
  to: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A `<Link>` element inside a dropdown menu.
 */
export const DropdownMenuLink = ({
  to,
  children,
  className = '',
}: DropdownMenuLinkProps) => {
  const handleClick = (e: React.SyntheticEvent) => {
    const $target = e.nativeEvent.target as HTMLLinkElement;
    $target.closest('.dropdown')?.removeAttribute('open');
  };

  return (
    <Link
      to={to}
      className={`dropdown-menu-link ${className}`.trim()}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};
