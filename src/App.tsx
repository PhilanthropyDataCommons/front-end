import React from 'react';
import {
  createBrowserRouter, Route, Routes, RouterProvider,
} from 'react-router-dom';
import { Layout } from './Layout';
import { NotFound } from './pages/NotFound';
import { ProposalDetail } from './pages/ProposalDetail';
import { ProposalList } from './pages/ProposalList';
import { Landing } from './pages/Landing';
import './App.css';

const Root = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Landing />} />
      <Route path="/proposals/:proposalId/provider?/:provider?" element={<ProposalDetail />} />
      <Route path="/proposals" element={<ProposalList />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

const router = createBrowserRouter([
  { path: '*', Component: Root },
]);

const App = () => (
  <RouterProvider router={router} />
);

export { App };
