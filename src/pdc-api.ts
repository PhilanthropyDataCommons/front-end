import { useCallback, useEffect, useState } from 'react';
import { useOidcFetch } from '@axa-fr/react-oidc';
import type {
	BaseField,
	BulkUpload,
	WritableBulkUpload,
	BulkUploadBundle,
	Organization,
	OrganizationBundle,
	PlatformProviderResponse,
	PresignedPost,
	PresignedPostRequest,
	WritablePresignedPostRequest,
	Proposal,
	ProposalBundle,
} from '@pdc/sdk';
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
		[path],
	);
};

const usePresignedPostCallback = () => {
	const api = usePdcCallbackApi<PresignedPostRequest>('/presignedPostRequests');
	return (params: WritablePresignedPostRequest) =>
		api({
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});
};
const isStringOrBlob = (value: unknown): value is string | Blob =>
	typeof value === 'string' || value instanceof Blob;

const uploadUsingPresignedPost = async (
	file: File,
	presignedPost: PresignedPost,
) => {
	const formData = new FormData();
	Object.entries(presignedPost.fields).forEach(([key, value]) => {
		if (isStringOrBlob(value)) {
			formData.append(key, value);
		}
	});
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

const useBulkUploads = () =>
	usePdcApi<BulkUploadBundle>(
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
