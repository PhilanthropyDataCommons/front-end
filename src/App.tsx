import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
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
      { path: '/proposals/:proposalId/provider?/:provider?', Component: ProposalDetail },
      { path: '/proposals', Component: ProposalList },
      { path: '*', Component: NotFound },
    ],
  },
]);

const App = () => (
  <RouterProvider router={router} />
);

export { App };
