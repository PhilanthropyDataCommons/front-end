import React from 'react';
import '../Button.css';

interface DropdownTriggerProps {
  children: React.ReactNode;
  type?: 'button' | 'navbar-item';
}

export const DropdownTrigger = ({
  children,
  type = 'button',
}: DropdownTriggerProps) => {
  let typeClassName = '';

  switch (type) {
    case 'navbar-item':
      typeClassName = 'App-navbar__item';
      break;
    case 'button':
      typeClassName = 'button button--bordered';
      break;
    default:
  }

  return (
    <summary className={`dropdown-trigger ${typeClassName}`.trim()}>
      {children}
    </summary>
  );
};
