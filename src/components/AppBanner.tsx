import { useLocation } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';
import { Button } from './Button';
import { getLogger } from '../logger';

const logger = getLogger('<AppBanner>');

const AppBanner = () => {
	const location = useLocation();
	const { isAuthenticated, login } = useOidc();

	const isHomePage = location.pathname === '/';
	const showBanner = !isAuthenticated && !isHomePage;

	return showBanner ? (
		<div className="App-banner">
			You are viewing limited public data.{' '}
			<Button
				linkStyle
				onClick={() => {
					login(location.pathname).catch(logger.error);
				}}
			>
				Log in to view more.
			</Button>
		</div>
	) : null;
};

export { AppBanner };
