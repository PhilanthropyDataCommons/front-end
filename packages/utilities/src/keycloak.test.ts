import { expect, test, beforeEach } from 'vitest';
import { getKeycloakOptions } from './keycloak';

beforeEach(() => {
	// Mock window.location
	Object.defineProperty(globalThis, 'window', {
		value: {
			location: {
				origin: 'http://localhost:3000',
				pathname: '/test-path',
				search: '?foo=bar',
			},
		},
		writable: true,
	});
});

test('configuration fails with missing authority', () => {
	expect(() => getKeycloakOptions(undefined, 'client-id', 'realm-id')).toThrow(
		/authority/,
	);
});

test('configuration fails with missing client ID', () => {
	expect(() =>
		getKeycloakOptions('https://auth.example.com', undefined, 'realm-id'),
	).toThrow(/client/);
});

test('configuration fails with missing realm', () => {
	expect(() =>
		getKeycloakOptions('https://auth.example.com', 'client-id', undefined),
	).toThrow(/realm/);
});

test('configuration succeeds with valid arguments', () => {
	const authority = 'https://auth.example.com';
	const clientId = 'client-id';
	const realm = 'realm-id';
	const options = getKeycloakOptions(authority, clientId, realm);
	expect(options).toMatchObject({
		config: {
			url: authority,
			clientId,
			realm,
		},
		init: {
			onLoad: 'check-sso',
			redirectUri: 'http://localhost:3000/test-path?foo=bar',
			scope: 'openid',
			checkLoginIframe: false,
		},
	});
});
