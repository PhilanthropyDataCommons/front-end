import React from 'react';
import { User } from './User';
import logo from '../images/pdc-logo.png';

const Header = () => (
  <header className="App-header">
    <a href="/">
      <img src={logo} className="App-logo" alt="Philanthropy Data Commons logo" />
    </a>
    <User />
  </header>
);

export { Header };
