import { createContext } from 'react';
import type { User } from '@pdc/sdk';

const emptyUser = {
	id: 0,
	authenticationId: '',
	createdAt: new Date(0),
};

export const UserContext = createContext<User>(emptyUser);
