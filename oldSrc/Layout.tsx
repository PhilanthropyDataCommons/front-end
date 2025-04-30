import { Outlet } from 'react-router-dom';
import { AppBanner } from './components/AppBanner';
import { AppHeader } from './components/AppHeader';
import { AppMain } from './components/AppMain';

const Layout = () => (
	<div className="App">
		<AppBanner />
		<AppHeader />
		<AppMain>
			<Outlet />
		</AppMain>
	</div>
);

export { Layout };
