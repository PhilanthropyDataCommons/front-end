import React from 'react';
import './ToggleSwitch.css';

interface ToggleSwitchProps {
	children: React.ReactNode;
	checked?: boolean;
	onChange?(): void;
}

/**
 * Toggle checkbox that looks like a little slider button.
 */
export const ToggleSwitch = ({
	children,
	checked = false,
	onChange = undefined,
}: ToggleSwitchProps) => (
	<label className="toggle-switch">
		<input
			type="checkbox"
			onChange={onChange}
			// Without an onChange handler, this can't be a controlled component,
			// so we use `defaultChecked` instead.
			checked={onChange ? checked : undefined}
			defaultChecked={onChange ? undefined : checked}
		/>
		<span>{children}</span>
	</label>
);
