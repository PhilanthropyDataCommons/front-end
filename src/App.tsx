import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { withOidcSecure } from '@axa-fr/react-oidc';
import { Layout } from './Layout';
import { AddData } from './pages/AddData';
import { NotFound } from './pages/NotFound';
import { ProposalDetail } from './pages/ProposalDetail';
import { ProposalList } from './pages/ProposalList';
import { ChangemakerDetail } from './pages/ChangemakerDetail';
import { ChangemakerList } from './pages/ChangemakerList';
import { Landing } from './pages/Landing';
import './App.css';

const router = createBrowserRouter([
	{
		Component: Layout,
		children: [
			{ path: '/', Component: Landing },
			{ path: '/add-data', Component: withOidcSecure(AddData) },
			{
				path: '/changemakers/:changemakerId',
				Component: ChangemakerDetail,
			},
			{
				path: '/changemakers/:changemakerId/provider/:provider',
				Component: withOidcSecure(ChangemakerDetail),
			},
			{
				path: '/changemakers/:changemakerId/proposals/:proposalId',
				Component: withOidcSecure(ChangemakerDetail),
			},
			{
				path: '/changemakers',
				Component: ChangemakerList,
			},
			{
				path: '/proposals/:proposalId',
				Component: withOidcSecure(ProposalDetail),
			},
			{ path: '/proposals', Component: withOidcSecure(ProposalList) },
			{ path: '*', Component: NotFound },
		],
	},
]);

const App = () => <RouterProvider router={router} />;

export { App };
