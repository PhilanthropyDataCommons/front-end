import { usePdcApi, usePdcCallbackApi, throwIfNotOk } from '@pdc/utilities';
import type {
	ApplicationFormBundle,
	BaseField,
	ChangemakerBundle,
	DataProviderBundle,
	FunderBundle,
	Source,
	SourceBundle,
} from '@pdc/sdk';
import type {
	PresignedPostRequest,
	WritablePresignedPostRequest,
	PresignedPost,
	BulkUploadTask,
	WritableBulkUploadTask,
	BulkUploadTaskBundle,
} from '@pdc/sdk';

export function useBaseFields(): ReturnType<typeof usePdcApi<BaseField[]>> {
	return usePdcApi<BaseField[]>('/baseFields');
}

export function useSystemSource(): ReturnType<typeof usePdcApi<Source>> {
	return usePdcApi<Source>('/sources/1');
}

export const usePresignedPostCallback = () => {
	const api = usePdcCallbackApi<PresignedPostRequest>('/presignedPostRequests');
	return (params: WritablePresignedPostRequest) =>
		api({
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
	formData.append('Content-Type', file.type || 'application/octet-stream');
	formData.append('file', file);

	return fetch(presignedPost.url, {
		method: 'POST',
		body: formData,
	}).then(throwIfNotOk);
};

export const useRegisterBulkUploadCallback = () => {
	const api = usePdcCallbackApi<BulkUploadTask>('/tasks/bulkUploads');
	return (params: WritableBulkUploadTask) =>
		api({
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});
};

export function useBulkUploads(): ReturnType<
	typeof usePdcApi<BulkUploadTaskBundle>
> {
	return usePdcApi<BulkUploadTaskBundle>(
		'/tasks/bulkUploads',
		new URLSearchParams({
			_page: '1',
			_count: '100',
		}),
	);
}

export function useSources(): ReturnType<typeof usePdcApi<SourceBundle>> {
	return usePdcApi<SourceBundle>(
		'/sources',
		new URLSearchParams({
			_page: '1',
			_count: '100',
		}),
	);
}

export function useFunders(): ReturnType<typeof usePdcApi<FunderBundle>> {
	return usePdcApi<FunderBundle>(
		'/funders',
		new URLSearchParams({
			_page: '1',
			_count: '100',
		}),
	);
}

export function useDataProviders(): ReturnType<
	typeof usePdcApi<DataProviderBundle>
> {
	return usePdcApi<DataProviderBundle>(
		'/dataProviders',
		new URLSearchParams({
			_page: '1',
			_count: '100',
		}),
	);
}

export function useChangemakers(): ReturnType<
	typeof usePdcApi<ChangemakerBundle>
> {
	return usePdcApi<ChangemakerBundle>(
		'/changemakers',
		new URLSearchParams({
			_page: '1',
			_count: '100',
		}),
	);
}

export function useApplicationForms(): ReturnType<
	typeof usePdcApi<ApplicationFormBundle>
> {
	return usePdcApi<ApplicationFormBundle>(
		'/applicationForms',
		new URLSearchParams({
			_page: '1',
			_count: '100',
		}),
	);
}
