import React from 'react';
import logo from '../images/react-logo.svg';

const Placeholder = () => (
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
);

export { Placeholder };
