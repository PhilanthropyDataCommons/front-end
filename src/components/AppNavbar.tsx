import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpenIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { TableCellsIcon } from '@heroicons/react/24/solid';
import { User } from './User';

const AppNavbar = () => (
  <nav className="App-navbar">
    <ul>
      <li>
        <NavLink to="/proposals" className="App-navbar__item">
          <TableCellsIcon />
          Dashboard
        </NavLink>
      </li>
      {process.env.REACT_APP_SHOW_STORYBOOK === 'true' && (
        <li>
          <a href="/storybook" className="App-navbar__item">
            <BookOpenIcon />
            Storybook
          </a>
        </li>
      )}
      <li>
        <a
          href="mailto:info@philanthropydatacommons.org?Subject=Feedback%20on%20the%20Philanthropy%20Data%20Commons"
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

export { AppNavbar };
