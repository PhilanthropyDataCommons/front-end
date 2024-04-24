import React, { useState, useEffect } from 'react';
import { useOidcUser } from '@axa-fr/react-oidc';
import { useUser } from './pdc-api';
import { UserContext } from './UserContext';

interface UserProviderProps {
	children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const { oidcUser } = useOidcUser();
	const emptyUser = {
		id: 0,
		authenticationId: '',
		createdAt: new Date(0),
	};
	const [currentUserState, setCurrentUserState] = useState(emptyUser);
	const [user] = useUser(oidcUser.sub ?? '');
	useEffect(() => {
		if (user !== null) {
			setCurrentUserState(user);
		}
	}, [user]);
	return (
		<UserContext.Provider value={currentUserState}>
			{children}
		</UserContext.Provider>
	);
};


