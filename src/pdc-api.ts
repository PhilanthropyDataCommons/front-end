import { useCallback, useEffect, useState } from 'react';
import { useOidcFetch } from '@axa-fr/react-oidc';
import type {
	BaseField,
	BulkUploadTask,
	WritableBulkUploadTask,
	BulkUploadTaskBundle,
	Changemaker,
	ChangemakerBundle,
	PlatformProviderResponse,
	PresignedPost,
	PresignedPostRequest,
	WritablePresignedPostRequest,
	Proposal,
	ProposalBundle,
	Source,
	SourceBundle,
	ProposalVersion,
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
	const api = usePdcCallbackApi<BulkUploadTask>('/tasks/bulkUploads');
	return (params: WritableBulkUploadTask) =>
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
	usePdcApi<BulkUploadTaskBundle>(
		'/tasks/bulkUploads',
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

const useProposalsByChangemakerId = (
	page: string,
	count: string,
	changemakerId: string,
) =>
	usePdcApi<ProposalBundle>(
		'/proposals',
		new URLSearchParams({
			_page: page,
			_count: count,
			changemaker: changemakerId,
		}),
	);

const useProviderData = (externalId: string) =>
	usePdcApi<PlatformProviderResponse[]>(
		'/platformProviderResponses',
		new URLSearchParams({
			externalId,
		}),
	);

const useChangemaker = (changemakerId: string) =>
	usePdcApi<Changemaker>(
		`/changemakers/${changemakerId}`,
		new URLSearchParams({
			includeFieldsAndValues: 'true',
		}),
	);

const CHANGEMAKERS_DEFAULT_PAGE = '1';
const CHANGEMAKERS_DEFAULT_COUNT = '100';

const useChangemakers = (page: string, count: string) =>
	usePdcApi<ChangemakerBundle>(
		'/changemakers',
		new URLSearchParams({
			_page: page,
			_count: count,
		}),
	);

const useSystemSource = () => usePdcApi<Source>('/sources/1');

const SOURCES_DEFAULT_PAGE = '1';
const SOURCES_DEFAULT_COUNT = '100';

const useSources = (page: string, count: string) =>
	usePdcApi<SourceBundle>(
		'/sources',
		new URLSearchParams({
			_page: page,
			_count: count,
		}),
	);

const useProposalVersion = (proposalVersionId: number) =>
	usePdcApi<ProposalVersion>(`/proposalVersions/${proposalVersionId}`);

export {
	PROPOSALS_DEFAULT_COUNT,
	PROPOSALS_DEFAULT_PAGE,
	PROPOSALS_DEFAULT_QUERY,
	CHANGEMAKERS_DEFAULT_COUNT,
	CHANGEMAKERS_DEFAULT_PAGE,
	SOURCES_DEFAULT_PAGE,
	SOURCES_DEFAULT_COUNT,
	uploadUsingPresignedPost,
	useBaseFields,
	useBulkUploads,
	usePresignedPostCallback,
	useProposal,
	useProposals,
	useProposalsByChangemakerId,
	useChangemaker,
	useChangemakers,
	useProviderData,
	useRegisterBulkUploadCallback,
	useSystemSource,
	useSources,
	useProposalVersion,
};
