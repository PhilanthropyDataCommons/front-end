import React from 'react';

interface AppMainProps {
	children: React.ReactNode;
}

const AppMain = ({ children }: AppMainProps) => (
	<main className="App-main">{children}</main>
);

export { AppMain };
