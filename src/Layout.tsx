import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { AppMain } from './components/AppMain';

const Layout = () => (
	<div className="App">
		<AppHeader />
		<AppMain>
			<Outlet />
		</AppMain>
	</div>
);

export { Layout };
