import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { withOidcSecure } from '@axa-fr/react-oidc';
import { Layout } from './Layout';
import { AddData } from './pages/AddData';
import { NotFound } from './pages/NotFound';
import { ProposalDetail } from './pages/ProposalDetail';
import { ProposalList } from './pages/ProposalList';
import { Landing } from './pages/Landing';
import './App.css';

const router = createBrowserRouter([
	{
		Component: Layout,
		children: [
			{ path: '/', Component: Landing },
			{ path: '/add-data', Component: withOidcSecure(AddData) },
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
