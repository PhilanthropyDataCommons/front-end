import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { NotFound } from './pages/NotFound';
import { ProposalDetail } from './pages/ProposalDetail';
import { ProposalList } from './pages/ProposalList';
import { Landing } from './pages/Landing';
import './App.css';

const App = () => (
  <div className="App">
    <main className="App-main">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/proposals/:proposalId" element={<ProposalDetail />} />
        <Route path="/proposals" element={<ProposalList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <AppHeader />
  </div>
);

export { App };
