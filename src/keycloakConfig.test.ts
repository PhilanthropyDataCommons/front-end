import { expect, test } from 'vitest';
import { getOptions } from './keycloakConfig';

test('configuration fails with missing authority', () => {
	expect(() => getOptions(undefined, 'client-id', 'realm-id')).toThrow(
		/authority/,
	);
});

test('configuration fails with missing client ID', () => {
	expect(() =>
		getOptions('https://auth.example.com', undefined, 'realm-id'),
	).toThrow(/client/);
});

test('configuration fails with missing realm', () => {
	expect(() =>
		getOptions('https://auth.example.com', 'client-id', undefined),
	).toThrow(/realm/);
});

test('configuration succeeds with valid arguments', () => {
	const authority = 'https://auth.example.com';
	const clientId = 'client-id';
	const realm = 'realm-id';
	const options = getOptions(authority, clientId, realm);
	expect(options).toMatchObject({
		config: {
			url: authority,
			clientId,
			realm,
		},
		init: {
			onLoad: 'check-sso',
			redirectUri: `${window.location.origin}/`,
			scope: 'openid',
			checkLoginIframe: false,
		},
	});
});
