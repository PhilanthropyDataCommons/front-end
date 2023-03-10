import { getConfiguration } from './oidc-config';

test('configuration fails with missing authority', () => {
  expect(() => getConfiguration(undefined, 'client-id')).toThrow(/authority/);
});

test('configuration fails with missing client ID', () => {
  expect(() => getConfiguration('https://auth.example.com', undefined)).toThrow(/client/);
});

test('configuration succeeds with valid arguments', () => {
  const authority = 'https://auth.example.com';
  const clientId = 'client-id';
  const configuration = getConfiguration(authority, clientId);
  expect(configuration).toMatchObject({
    authority,
    client_id: clientId,
  });
});
