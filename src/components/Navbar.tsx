import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';
import { User } from './User';

const Navbar = () => (
  <nav className="App-navbar">
    <ul>
      <li>
        <NavLink to="/" className="App-navbar__item">
          <HomeIcon />
          Home
        </NavLink>
      </li>
      <li>
        <User />
      </li>
    </ul>
  </nav>
);

export { Navbar };
