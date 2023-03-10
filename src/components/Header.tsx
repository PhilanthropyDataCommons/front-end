import React from 'react';
import { User } from './User';
import logo from '../images/pdc-logo.png';

const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <User />
  </header>
);

export { Header };
