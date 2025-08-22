import { usePdcApi, usePdcCallbackApi, throwIfNotOk } from '@pdc/utilities';
import type {
	BulkUploadTaskBundle,
	Source,
	PresignedPostRequest,
	WritablePresignedPostRequest,
	PresignedPost,
	WritableBulkUploadTask,
	BulkUploadTask,
	SourceBundle,
	FunderBundle,
	BaseField,
} from '@pdc/sdk';

const BULK_UPLOADS_DEFAULT_PAGE = '1';
const BULK_UPLOADS_DEFAULT_COUNT = '100';

export function useBulkUploads(
	page: string = BULK_UPLOADS_DEFAULT_PAGE,
	count: string = BULK_UPLOADS_DEFAULT_COUNT,
): ReturnType<typeof usePdcApi<BulkUploadTaskBundle>> {
	return usePdcApi<BulkUploadTaskBundle>(
		'/tasks/bulkUploads',
		new URLSearchParams({
			_page: page,
			_count: count,
		}),
	);
}

export function useSystemSource(): ReturnType<typeof usePdcApi<Source>> {
	return usePdcApi<Source>('/sources/1');
}

export const usePresignedPostCallback = () => {
	const api = usePdcCallbackApi<PresignedPostRequest>('/presignedPostRequests');
	return async (params: WritablePresignedPostRequest) =>
		await api({
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});
};

const isStringOrBlob = (value: unknown): value is string | Blob =>
	typeof value === 'string' || value instanceof Blob;

export const uploadUsingPresignedPost = async (
	file: File,
	presignedPost: PresignedPost,
): Promise<Response> => {
	const formData = new FormData();
	Object.entries(presignedPost.fields).forEach(([key, value]) => {
		if (isStringOrBlob(value)) {
			formData.append(key, value);
		}
	});
	formData.append(
		'Content-Type',
		file.type !== '' ? file.type : 'application/octet-stream',
	);
	formData.append('file', file);

	return await fetch(presignedPost.url, {
		method: 'POST',
		body: formData,
	}).then(throwIfNotOk);
};

export const useRegisterBulkUploadCallback = () => {
	const api = usePdcCallbackApi<BulkUploadTask>('/tasks/bulkUploads');
	return async (params: WritableBulkUploadTask) =>
		await api({
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});
};

const SOURCES_DEFAULT_PAGE = '1';
const SOURCES_DEFAULT_COUNT = '100';

export function useSources(
	page: string = SOURCES_DEFAULT_PAGE,
	count: string = SOURCES_DEFAULT_COUNT,
): ReturnType<typeof usePdcApi<SourceBundle>> {
	return usePdcApi<SourceBundle>(
		'/sources',
		new URLSearchParams({
			_page: page,
			_count: count,
		}),
	);
}
const FUNDERS_DEFAULT_PAGE = '1';
const FUNDERS_DEFAULT_COUNT = '100';

export function useFunders(
	page: string = FUNDERS_DEFAULT_PAGE,
	count: string = FUNDERS_DEFAULT_COUNT,
): ReturnType<typeof usePdcApi<FunderBundle>> {
	return usePdcApi<FunderBundle>(
		'/funders',
		new URLSearchParams({
			_page: page,
			_count: count,
		}),
	);
}
const BASE_FIELDS_DEFAULT_PAGE = '1';
const BASE_FIELDS_DEFAULT_COUNT = '100';

export function useBaseFields(
	page: string = BASE_FIELDS_DEFAULT_PAGE,
	count: string = BASE_FIELDS_DEFAULT_COUNT,
): ReturnType<typeof usePdcApi<BaseField[]>> {
	return usePdcApi<BaseField[]>(
		'/baseFields',
		new URLSearchParams({
			_page: page,
			_count: count,
		}),
	);
}
