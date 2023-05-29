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
}: DropdownMenuLinkProps) => (
  <Link to={to} className={`dropdown-menu-link ${className}`.trim()}>
    {children}
  </Link>
);
