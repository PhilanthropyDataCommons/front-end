import React from 'react';
import { NavLink } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';
import {
	CommandLineIcon as CommandLineIconOutline,
	InformationCircleIcon as InformationCircleIconOutline,
	SquaresPlusIcon as SquaresPlusIconOutline,
	TableCellsIcon as TableCellsIconOutline,
} from '@heroicons/react/24/outline';
import {
	CommandLineIcon as CommandLineIconSolid,
	InformationCircleIcon as InformationCircleIconSolid,
	SquaresPlusIcon as SquaresPlusIconSolid,
	TableCellsIcon as TableCellsIconSolid,
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
						{({ isActive }) => (
							<>
								{isActive ? <TableCellsIconSolid /> : <TableCellsIconOutline />}
								Dashboard
							</>
						)}
					</NavLink>
				</li>
				{isAuthenticated && (
					<li>
						<NavLink to="/add-data" className="App-navbar__item">
							{({ isActive }) => (
								<>
									{isActive ? (
										<SquaresPlusIconSolid />
									) : (
										<SquaresPlusIconOutline />
									)}
									Add Data
								</>
							)}
						</NavLink>
					</li>
				)}
				<li>
					<Dropdown>
						<DropdownTrigger type="navbar-item">
							<CommandLineIconOutline className="closed-only" />
							<CommandLineIconSolid className="open-only" />
							Developers
						</DropdownTrigger>
						<DropdownMenu align="right">
							<DropdownMenuLink to="https://api.philanthropydatacommons.org">
								<div className="title">API Documentation</div>
								<div className="description">
									Read the Swagger spec to interact with the PDC via our API.
								</div>
							</DropdownMenuLink>
							<DropdownMenuLink to="https://www.npmjs.com/package/@pdc/sdk">
								<div className="title">TypeScript SDK</div>
								<div className="description">
									Develop with our TypeScript SDK using <code>@pdc/sdk</code>{' '}
									from NPM.
								</div>
							</DropdownMenuLink>
							{process.env.REACT_APP_SHOW_STORYBOOK === 'true' && (
								<DropdownMenuLink to="/storybook" reloadDocument>
									<div className="title">Storybook</div>
									<div className="description">
										View our UI component library. (Only relevant to PDC front
										end developers.)
									</div>
								</DropdownMenuLink>
							)}
						</DropdownMenu>
					</Dropdown>
				</li>
				<li>
					<Dropdown>
						<DropdownTrigger type="navbar-item">
							<InformationCircleIconOutline className="closed-only" />
							<InformationCircleIconSolid className="open-only" />
							About
						</DropdownTrigger>
						<DropdownMenu align="right">
							<DropdownMenuLink to="https://www.philanthropydatacommons.org">
								<div className="title">About the PDC project</div>
								<div className="description">
									Read about the history, vision, and governance body of the
									PDC.
								</div>
							</DropdownMenuLink>
							{!isAuthenticated && (
								<DropdownMenuLink to="mailto:jimmcgowan@opentechstrategies.com?subject=PDC%20account">
									<div className="title">Need an account?</div>
									<div className="description">
										Full access is restricted. Email Jim McGowan to request an
										account.
									</div>
								</DropdownMenuLink>
							)}
							<DropdownMenuLink to="mailto:info@philanthropydatacommons.org?subject=PDC">
								<div className="title">Questions or feedback</div>
								<div className="description">Send an email to the team.</div>
							</DropdownMenuLink>
							<DropdownMenuLink to="https://github.com/PhilanthropyDataCommons/front-end/blob/main/RECENT_CHANGES.md">
								<div className="title">Recent improvements</div>
								<div className="description">
									Keep up with recent changes and improvements to the PDC.
								</div>
							</DropdownMenuLink>
						</DropdownMenu>
					</Dropdown>
				</li>
				<li>
					<User />
				</li>
			</ul>
		</nav>
	);
};

export { AppNavbar };
