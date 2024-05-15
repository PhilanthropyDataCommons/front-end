import { useCallback, useEffect, useState } from 'react';
import { useOidcFetch } from '@axa-fr/react-oidc';
import type {
	BaseField,
	BulkUpload,
	WritableBulkUpload,
	Organization,
	OrganizationBundle,
	PresignedPostRequest,
	WritablePresignedPostRequest,
	PresignedPostRequestPresignedPost,
	Proposal,
	ProposalBundle,
} from '@pdc/sdk';
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

/* The SDK generator isn't correctly omitting `presignedPost` from the writeable type.
 * Until that's fixed, we need to generate our own stand-in that omits it.
 * https://github.com/PhilanthropyDataCommons/service/issues/1012
 */
type FixedWritablePresignedPostRequest = Omit<
	WritablePresignedPostRequest,
	'presignedPost'
>;

const usePresignedPostCallback = () => {
	const api = usePdcCallbackApi<PresignedPostRequest>('/presignedPostRequests');
	return (params: FixedWritablePresignedPostRequest) =>
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
	presignedPost: PresignedPostRequestPresignedPost,
) => {
	const formData = new FormData();
	Object.entries(presignedPost.fields).forEach(([key, value]) =>
		/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument --
		 *
		 * SDK incorrectly defines this type.
		 * https://github.com/PhilanthropyDataCommons/service/issues/1011
		 */
		formData.append(key, value),
	);
	formData.append('Content-Type', file.type || 'application/octet-stream');
	formData.append('file', file);
	return fetch(presignedPost.url, {
		method: 'post',
		body: formData,
	}).then(throwIfResponseIsNotOk);
};

const useRegisterBulkUploadCallback = () => {
	const api = usePdcCallbackApi<BulkUpload>('/bulkUploads');
	return (params: WritableBulkUpload) =>
		api({
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});
};

const useBaseFields = () => usePdcApi<BaseField[]>('/baseFields');

interface ApiBulkUploads {
	entries: BulkUpload[];
	total: number;
}

const useBulkUploads = () =>
	usePdcApi<ApiBulkUploads>(
		'/bulkUploads',
		new URLSearchParams({ createdBy: 'me' }),
	);

const useProposal = (proposalId: string) =>
	usePdcApi<Proposal>(
		`/proposals/${proposalId}`,
		new URLSearchParams({
			includeFieldsAndValues: 'true',
		}),
	);

const PROPOSALS_DEFAULT_PAGE = '1';
const PROPOSALS_DEFAULT_COUNT = '1000';
const PROPOSALS_DEFAULT_QUERY = '';

const useProposals = (page: string, count: string, query: string) =>
	usePdcApi<ProposalBundle>(
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
	usePdcApi<ProposalBundle>(
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
};
