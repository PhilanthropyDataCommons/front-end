import React from 'react';

interface DliProps {
	children: React.ReactNode;
	className?: string;
}

/**
 * Component used in `<dl>` to wrap `<dt>` and `<dd>` elements, e.g.:
 * ```html
 * <dl>
 *   <Dli>
 *     <dt />
 *     <dd />
 *   </Dli>
 * </dl>
 * ```
 * Since this isn't a native element in HTML, this virtually creates it as a DIV.
 */
export const Dli = ({ children, className = '' }: DliProps) => (
	<div className={`dli ${className}`.trim()}>{children}</div>
);
