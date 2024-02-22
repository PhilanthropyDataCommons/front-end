import React from 'react';

interface DropdownMenuProps {
  children: React.ReactNode;
  /**
   * Align the menu to the left or right edge of its toggle.
   */
  align?: 'left' | 'right';
}

export const DropdownMenu = ({
  children,
  align = 'left',
}: DropdownMenuProps) => (
  <div className={`dropdown-menu ${align}`}>
    {children}
  </div>
);
