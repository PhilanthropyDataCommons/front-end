import React from 'react';
import { Header } from './Header';
import logo from './react-logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <main>
      <img src={logo} className="React-logo" alt="logo" />
      <h1>
        Data Viewer
      </h1>
      <p>
        <a
          className="App-link"
          href="https://github.com/PhilanthropyDataCommons/data-viewer/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Repository
        </a>
      </p>
      <p>
        <a
          className="App-link"
          href="https://philanthropydatacommons.org/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Website
        </a>
      </p>
    </main>
  </div>
);

export { App };
