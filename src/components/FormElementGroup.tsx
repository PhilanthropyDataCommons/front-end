import React from 'react';
import './FormElementGroup.css';

interface FormElementGroupProps {
  children: React.ReactNode;
  /**
   * Do the elements stack beside each other or on top of each other?
   */
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * Component for making groups of form elements that appear side by side.
 */
export const FormElementGroup = ({
  children,
  direction = 'horizontal',
  className = '',
}: FormElementGroupProps) => (
  <div className={`form-element-group ${direction} ${className}`.trim()}>
    {children}
  </div>
);
