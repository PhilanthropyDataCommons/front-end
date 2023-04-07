import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';
import { ProposalDetail } from './pages/ProposalDetail';
import { ProposalList } from './pages/ProposalList';
import { Placeholder } from './pages/Placeholder';
import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <main className="App-main">
      <Routes>
        <Route path="/" element={<Placeholder />} />
        <Route path="/proposals/:proposalId" element={<ProposalDetail />} />
        <Route path="/proposals" element={<ProposalList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </div>
);

export { App };
