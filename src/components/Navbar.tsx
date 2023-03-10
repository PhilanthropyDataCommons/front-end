import React from 'react';
import { User } from './User';

const Navbar = () => (
  <nav className="App-navbar">
    <ul>
      <li>
        <User />
      </li>
    </ul>
  </nav>
);

export { Navbar };
