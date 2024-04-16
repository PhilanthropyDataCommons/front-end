import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { withOidcSecure } from '@axa-fr/react-oidc';
import { Layout } from './Layout';
import { AddData } from './pages/AddData';
import { NotFound } from './pages/NotFound';
import { ProposalDetail } from './pages/ProposalDetail';
import { ProposalList } from './pages/ProposalList';
import { OrganizationDetail } from './pages/OrganizationDetail';
import { OrganizationList } from './pages/OrganizationList';
import { Landing } from './pages/Landing';
import './App.css';

const router = createBrowserRouter([
	{
		Component: Layout,
		children: [
			{ path: '/', Component: Landing },
			{ path: '/add-data', Component: withOidcSecure(AddData) },
			{
				path: '/organizations/:organizationId',
				Component: withOidcSecure(OrganizationDetail),
			},
			{
				path: '/organizations/:organizationId/provider/:provider',
				Component: withOidcSecure(OrganizationDetail),
			},
			{
				path: '/organizations/:organizationId/proposals/:proposalId',
				Component: withOidcSecure(OrganizationDetail),
			},
			{
				path: '/organizations',
				Component: OrganizationList,
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
