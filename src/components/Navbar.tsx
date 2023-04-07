import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
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
        <a
          href="mailto:info@philanthropydatacommons.org?Subject=Feedback%20on%20the%20Philanthropy%20Data%20Commons%20pilot%20data%20viewer"
          className="App-navbar__item"
        >
          <EnvelopeIcon />
          Feedback
        </a>
      </li>
      <li>
        <User />
      </li>
    </ul>
  </nav>
);

export { Navbar };
