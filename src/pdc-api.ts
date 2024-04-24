import { useCallback, useEffect, useState } from 'react';
import { useOidcFetch } from '@axa-fr/react-oidc';
import { User, Organization, OrganizationBundle } from '@pdc/sdk';
import { getLogger } from './logger';

const logger = getLogger('pdc-api');

const API_URL = process.env.REACT_APP_API_URL;

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

const usePdcCallbackApi = <T>(
	path: string,
): ((options: RequestInit) => Promise<T>) => {
	const { fetch } = useOidcFetch();

	return useCallback(
		(options: RequestInit) => {
			const url = new URL(path, API_URL);
			return fetch(url, options)
				.then(throwIfResponseIsNotOk)
				.then((res) => res.json())
				.catch((e) => logError(e, path, options));
		},
		/* eslint-disable-next-line react-hooks/exhaustive-deps --
		 *
		 * fetch should not be a dependency, because although it or its internal
		 * state may change from render to render, such changes are not relevant:
		 * a change in the way we make a request should not trigger an API request
		 */
		[path],
	);
};

interface ApiPresignedPostRequest {
	fileType: string;
	fileSize: number;
}

interface PresignedPost {
	url: string;
	fields: Record<string, string> & {
		key: string;
	};
}

interface ApiPresignedPostResponse {
	fileType: string;
	fileSize: number;
	presignedPost: PresignedPost;
}

const usePresignedPostCallback = () => {
	const api = usePdcCallbackApi<ApiPresignedPostResponse>(
		'/presignedPostRequests',
	);
	return (params: ApiPresignedPostRequest) =>
		api({
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});
};

const uploadUsingPresignedPost = async (
	file: File,
	presignedPost: PresignedPost,
) => {
	const formData = new FormData();
	Object.entries(presignedPost.fields).forEach(([key, value]) =>
		formData.append(key, value),
	);
	formData.append('Content-Type', file.type || 'application/octet-stream');
	formData.append('file', file);
	return fetch(presignedPost.url, {
		method: 'post',
		body: formData,
	}).then(throwIfResponseIsNotOk);
};

interface ApiBulkUploadsPostRequest {
	fileName: string;
	sourceKey: string;
}

interface ApiBulkUploadsPostResponse {
	id: number;
	fileName: string;
	fileSize: number;
	sourceKey: string;
	status: string;
	createdAt: string;
}

const useRegisterBulkUploadCallback = () => {
	const api = usePdcCallbackApi<ApiBulkUploadsPostResponse>('/bulkUploads');
	return (params: ApiBulkUploadsPostRequest) =>
		api({
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});
};

interface ApiBaseField {
	description: string;
	id: number;
	label: string;
	shortCode: string;
}

const useBaseFields = () => usePdcApi<ApiBaseField[]>('/baseFields');

interface ApiBulkUpload {
	id: number;
	fileName: string;
	fileSize: number;
	status: string;
	createdAt: string;
}

interface ApiBulkUploads {
	entries: ApiBulkUpload[];
	total: number;
}

const useBulkUploads = () => usePdcApi<ApiBulkUploads>('/bulkUploads');

interface ApiProposal {
	id: number;
	versions: {
		version: number;
		fieldValues: {
			applicationFormField: {
				baseFieldId: number;
				position: number;
			};
			value: string;
		}[];
	}[];
}

const useProposal = (proposalId: string) =>
	usePdcApi<ApiProposal>(
		`/proposals/${proposalId}`,
		new URLSearchParams({
			includeFieldsAndValues: 'true',
		}),
	);

interface ApiProposals {
	entries: ApiProposal[];
	total: number;
}

const PROPOSALS_DEFAULT_PAGE = '1';
const PROPOSALS_DEFAULT_COUNT = '1000';
const PROPOSALS_DEFAULT_QUERY = '';

const useProposals = (page: string, count: string, query: string) =>
	usePdcApi<ApiProposals>(
		'/proposals',
		new URLSearchParams({
			_page: page,
			_count: count,
			_content: query,
		}),
	);

const useProposalsByOrganizationId = (
	page: string,
	count: string,
	organizationId: string,
) =>
	usePdcApi<ApiProposals>(
		'/proposals',
		new URLSearchParams({
			_page: page,
			_count: count,
			organization: organizationId,
		}),
	);

interface PlatformProviderResponse {
	createdAt: string;
	externalId: string;
	platformProvider: string;
	data: object;
}

const useProviderData = (externalId: string) =>
	usePdcApi<PlatformProviderResponse[]>(
		'/platformProviderResponses',
		new URLSearchParams({
			externalId,
		}),
	);

const useOrganization = (organizationId: string) =>
	usePdcApi<Organization>(
		`/organizations/${organizationId}`,
		new URLSearchParams({
			includeFieldsAndValues: 'true',
		}),
	);

const ORGANIZATIONS_DEFAULT_PAGE = '1';
const ORGANIZATIONS_DEFAULT_COUNT = '100';

const useOrganizations = (page: string, count: string) =>
	usePdcApi<OrganizationBundle>(
		'/organizations',
		new URLSearchParams({
			_page: page,
			_count: count,
		}),
	);

const useUser = (authenticationId: string) =>
	usePdcApi<User>(
		'/users',
		new URLSearchParams({
			_authenticationId: authenticationId,
		}),
	);

export {
	PROPOSALS_DEFAULT_COUNT,
	PROPOSALS_DEFAULT_PAGE,
	PROPOSALS_DEFAULT_QUERY,
	ORGANIZATIONS_DEFAULT_COUNT,
	ORGANIZATIONS_DEFAULT_PAGE,
	uploadUsingPresignedPost,
	useBaseFields,
	useBulkUploads,
	usePresignedPostCallback,
	useProposal,
	useProposals,
	useProposalsByOrganizationId,
	useOrganization,
	useOrganizations,
	useProviderData,
	useRegisterBulkUploadCallback,
	useUser,
};

export type { ApiBaseField, ApiBulkUpload, ApiProposal };
