import React from 'react';
import { NavLink } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';
import {
	BuildingOffice2Icon as BuildingOffice2IconOutline,
	CommandLineIcon as CommandLineIconOutline,
	DocumentTextIcon as DocumentTextIconOutline,
	InformationCircleIcon as InformationCircleIconOutline,
	SquaresPlusIcon as SquaresPlusIconOutline,
} from '@heroicons/react/24/outline';
import {
	BuildingOffice2Icon as BuildingOffice2IconSolid,
	CommandLineIcon as CommandLineIconSolid,
	DocumentTextIcon as DocumentTextIconSolid,
	InformationCircleIcon as InformationCircleIconSolid,
	SquaresPlusIcon as SquaresPlusIconSolid,
} from '@heroicons/react/24/solid';
import { User } from './User';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownMenuLink,
	DropdownMenuLinkDescription,
} from './Dropdown';

const AppNavbar = () => {
	const { isAuthenticated } = useOidc();

	return (
		<nav className="App-navbar">
			<ul>
				<li>
					<NavLink to="/organizations" className="App-navbar__item">
						{({ isActive }) => (
							<>
								{isActive ? (
									<BuildingOffice2IconSolid />
								) : (
									<BuildingOffice2IconOutline />
								)}
								Organizations
							</>
						)}
					</NavLink>
				</li>
				{isAuthenticated && (
					<>
						<li>
							<NavLink to="/proposals" className="App-navbar__item">
								{({ isActive }) => (
									<>
										{isActive ? (
											<DocumentTextIconSolid />
										) : (
											<DocumentTextIconOutline />
										)}
										Proposals
									</>
								)}
							</NavLink>
						</li>
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
					</>
				)}
				<li>
					<Dropdown name="navbar-dropdown">
						<DropdownTrigger type="navbar-item">
							<InformationCircleIconOutline className="closed-only" />
							<InformationCircleIconSolid className="open-only" />
							About
						</DropdownTrigger>
						<DropdownMenu align="right">
							<DropdownMenuLink to="https://www.philanthropydatacommons.org">
								About the PDC project
								<DropdownMenuLinkDescription>
									Read about the history, vision, and governance body of the
									PDC.
								</DropdownMenuLinkDescription>
							</DropdownMenuLink>
							{!isAuthenticated && (
								<DropdownMenuLink to="mailto:jimmcgowan@opentechstrategies.com?subject=PDC%20account">
									Need an account?
									<DropdownMenuLinkDescription>
										Full access is restricted. Email Jim McGowan to request an
										account.
									</DropdownMenuLinkDescription>
								</DropdownMenuLink>
							)}
							<DropdownMenuLink to="mailto:info@philanthropydatacommons.org?subject=PDC">
								Questions or feedback
								<DropdownMenuLinkDescription>
									Send an email to the team.
								</DropdownMenuLinkDescription>
							</DropdownMenuLink>
							<DropdownMenuLink to="https://github.com/PhilanthropyDataCommons/front-end/blob/main/RECENT_CHANGES.md">
								Recent improvements
								<DropdownMenuLinkDescription>
									Keep up with recent changes and improvements to the PDC.
								</DropdownMenuLinkDescription>
							</DropdownMenuLink>
						</DropdownMenu>
					</Dropdown>
				</li>
				<li>
					<Dropdown name="navbar-dropdown">
						<DropdownTrigger type="navbar-item">
							<CommandLineIconOutline className="closed-only" />
							<CommandLineIconSolid className="open-only" />
							Developers
						</DropdownTrigger>
						<DropdownMenu align="right">
							<DropdownMenuLink to="https://api.philanthropydatacommons.org">
								API Documentation
								<DropdownMenuLinkDescription>
									Read the Swagger spec to interact with the PDC via our API.
								</DropdownMenuLinkDescription>
							</DropdownMenuLink>
							<DropdownMenuLink to="https://www.npmjs.com/package/@pdc/sdk">
								TypeScript SDK
								<DropdownMenuLinkDescription>
									Develop with our TypeScript SDK using <code>@pdc/sdk</code>{' '}
									from NPM.
								</DropdownMenuLinkDescription>
							</DropdownMenuLink>
							{process.env.REACT_APP_SHOW_STORYBOOK === 'true' && (
								<DropdownMenuLink to="/storybook" reloadDocument>
									Storybook
									<DropdownMenuLinkDescription>
										View our UI component library. (Only relevant to PDC front
										end developers.)
									</DropdownMenuLinkDescription>
								</DropdownMenuLink>
							)}
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
