import React from 'react';
import { AppNavbar } from './AppNavbar';
import logo from '../images/pdc-logo.png';

const Header = () => (
  <header className="App-header">
    <a href="/">
      <img src={logo} className="App-logo" alt="Philanthropy Data Commons logo" />
    </a>
    <AppNavbar />
  </header>
);

export { Header };
