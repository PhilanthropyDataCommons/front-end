import React from 'react';
import { Header } from './Header';
import logo from './react-logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <main>
      <img src={logo} className="React-logo" alt="logo" />
      <p>
        Edit
        {' '}
        <code>src/App.tsx</code>
        {' '}
        and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </main>
  </div>
);

export { App };
