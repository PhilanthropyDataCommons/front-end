import React from 'react';
import { NavLink } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import {
  CommandLineIcon,
  SquaresPlusIcon,
  TableCellsIcon,
} from '@heroicons/react/24/solid';
import { User } from './User';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownMenuLink,
} from './Dropdown';

const AppNavbar = () => {
  const { isAuthenticated } = useOidc();

  return (
    <nav className="App-navbar">
      <ul>
        <li>
          <NavLink to="/proposals" className="App-navbar__item">
            <TableCellsIcon />
            Dashboard
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink to="/add-data" className="App-navbar__item">
              <SquaresPlusIcon />
              Add Data
            </NavLink>
          </li>
        )}
        <li>
          <Dropdown>
            <DropdownTrigger type="navbar-item">
              <CommandLineIcon />
              Developers
            </DropdownTrigger>
            <DropdownMenu align="right">
              <DropdownMenuLink to="https://api.philanthropydatacommons.org">
                <div className="title">API Documentation</div>
                <div className="description">Read the Swagger spec to interact with the PDC via our API.</div>
              </DropdownMenuLink>
              <DropdownMenuLink to="https://www.npmjs.com/package/@pdc/sdk">
                <div className="title">TypeScript SDK</div>
                <div className="description">
                  Develop with our TypeScript SDK using
                  {' '}
                  <code>@pdc/sdk</code>
                  {' '}
                  from NPM.
                </div>
              </DropdownMenuLink>
              {process.env.REACT_APP_SHOW_STORYBOOK === 'true' && (
                <DropdownMenuLink to="/storybook" reloadDocument>
                  <div className="title">Storybook</div>
                  <div className="description">View our UI component library. (Only relevant to PDC front end developers.)</div>
                </DropdownMenuLink>
              )}
            </DropdownMenu>
          </Dropdown>
        </li>
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
};

export { AppNavbar };
