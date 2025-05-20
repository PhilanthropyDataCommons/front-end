import { useCallback, useEffect, useState } from 'react';
import { useOidcFetch } from '@axa-fr/react-oidc';
import type { BaseField } from '@pdc/sdk';
import { getLogger } from './logger';

const logger = getLogger('pdc-api');

const API_URL = import.meta.env.VITE_API_URL;

const throwIfResponseIsNotOk = (res: Response): Response => {
	if (!res.ok) {
		throw new Error(`Response status: ${res.status} ${res.statusText}`);
	}
	return res;
};

const logError = (error: unknown, path: string, params: object) => {
	logger.error({ error, params }, `Error fetching ${path}`);
};

// Custom React hook to make authenticated requests to the configured API
const usePdcApi = <T>(
	path: string,
	params: URLSearchParams = new URLSearchParams(),
): [T | null, () => void] => {
	const { fetch } = useOidcFetch();
	const [response, setResponse] = useState(null);

	const fetchData = useCallback(() => {
		setResponse(null);
		const url = new URL(path, API_URL);
		url.search = params.toString();
		fetch(url)
			.then(throwIfResponseIsNotOk)
			.then((res) => res.json())
			.then(setResponse)
			.catch((e) => logError(e, path, params));

		/* eslint-disable-next-line react-hooks/exhaustive-deps --
		 *
		 * fetch should not be a dependency, because although it or its internal
		 * state may change from render to render, such changes are not relevant:
		 * a change in the way we make a request should not trigger an API request
		 *
		 * params is a dependency, but as an object - and often a newly-created
		 * object - depending on it directly causes spurious renders; instead, use
		 * its string value, which should be stable
		 */
	}, [path, params.toString()]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return [response, fetchData];
};

const useBaseFields = () => usePdcApi<BaseField[]>('/baseFields');

export { useBaseFields };
