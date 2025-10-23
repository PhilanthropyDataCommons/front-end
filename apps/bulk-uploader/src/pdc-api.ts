import { usePdcApi, usePdcCallbackApi, throwIfNotOk } from '@pdc/utilities';
import type {
	BulkUploadTaskBundle,
	Source,
	ModelFile,
	WritableModelFile,
	PresignedPost,
	WritableBulkUploadTask,
	BulkUploadTask,
	SourceBundle,
	FunderBundle,
	BaseField,
	UserBundle,
} from '@pdc/sdk';

export type FileUploadResponse = ModelFile & {
	presignedPost: PresignedPost;
};

const DEFAULT_ENTITY_PAGE = 1;
const DEFAULT_ENTITY_COUNT = 200;

export function useBulkUploads(
	page: number = DEFAULT_ENTITY_PAGE,
	count: number = DEFAULT_ENTITY_COUNT,
): ReturnType<typeof usePdcApi<BulkUploadTaskBundle>> {
	return usePdcApi<BulkUploadTaskBundle>(
		'/tasks/bulkUploads',
		new URLSearchParams({
			_page: page.toString(),
			_count: count.toString(),
		}),
	);
}

export function useSystemSource(): ReturnType<typeof usePdcApi<Source>> {
	return usePdcApi<Source>('/sources/1');
}

export const useFileUploadCallback = () => {
	const api = usePdcCallbackApi<FileUploadResponse>('/files');
	return async (params: WritableModelFile) =>
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
		file.type === '' ? 'application/octet-stream' : file.type,
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

export function useSources(
	page: number = DEFAULT_ENTITY_PAGE,
	count: number = DEFAULT_ENTITY_COUNT,
): ReturnType<typeof usePdcApi<SourceBundle>> {
	return usePdcApi<SourceBundle>(
		'/sources',
		new URLSearchParams({
			_page: page.toString(),
			_count: count.toString(),
		}),
	);
}

export function useFunders(
	page: number = DEFAULT_ENTITY_PAGE,
	count: number = DEFAULT_ENTITY_COUNT,
): ReturnType<typeof usePdcApi<FunderBundle>> {
	return usePdcApi<FunderBundle>(
		'/funders',
		new URLSearchParams({
			_page: page.toString(),
			_count: count.toString(),
		}),
	);
}

export function useBaseFields(
	page: number = DEFAULT_ENTITY_PAGE,
	count: number = DEFAULT_ENTITY_COUNT,
): ReturnType<typeof usePdcApi<BaseField[]>> {
	return usePdcApi<BaseField[]>(
		'/baseFields',
		new URLSearchParams({
			_page: page.toString(),
			_count: count.toString(),
		}),
	);
}

export function useUsers(
	page: number = DEFAULT_ENTITY_PAGE,
	count: number = DEFAULT_ENTITY_COUNT,
): ReturnType<typeof usePdcApi<UserBundle>> {
	return usePdcApi<UserBundle>(
		'/users',
		new URLSearchParams({
			_page: page.toString(),
			_count: count.toString(),
		}),
	);
}
