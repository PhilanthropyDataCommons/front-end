import React from 'react';
import { useOidc, useOidcUser, OidcUserStatus } from '@axa-fr/react-oidc';
import {
	PowerIcon,
	UserIcon as UserIconOutline,
} from '@heroicons/react/24/outline';
import { UserIcon as UserIconSolid } from '@heroicons/react/24/solid';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownMenuButton,
} from './Dropdown';
import { getLogger } from '../logger';

const logger = getLogger('<User>');

const User = () => {
	const { oidcUser, oidcUserLoadingState } = useOidcUser();
	const { login, logout } = useOidc();

	switch (oidcUserLoadingState) {
		case OidcUserStatus.Loading:
			return (
				<div className="App-navbar__item App-navbar__item--loading">
					<UserIconOutline />
					Loading…
				</div>
			);
		case OidcUserStatus.Unauthenticated:
			return (
				<button
					className="App-navbar__item"
					onClick={() => {
						login('/').catch(logger.error);
					}}
					type="button"
				>
					<UserIconOutline />
					Log in
				</button>
			);
		case OidcUserStatus.LoadingError:
			return (
				<div className="App-navbar__item App-navbar__item--error">
					<UserIconOutline />
					User loading failed
				</div>
			);
		default:
			return (
				<Dropdown name="navbar-dropdown">
					<DropdownTrigger type="navbar-item">
						<UserIconSolid />
						{oidcUser.name}
					</DropdownTrigger>
					<DropdownMenu align="right">
						<DropdownMenuButton
							icon={<PowerIcon />}
							className="logout"
							onClick={() => {
								logout('/').catch(logger.error);
							}}
							key="logout"
						>
							Log out
						</DropdownMenuButton>
					</DropdownMenu>
				</Dropdown>
			);
	}
};

export { User };
