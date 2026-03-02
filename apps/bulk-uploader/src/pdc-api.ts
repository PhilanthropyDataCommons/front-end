import { usePdcApi, usePdcCallbackApi, throwIfNotOk } from '@pdc/utilities';
import { useKeycloak } from '@dsb-norge/vue-keycloak-js';
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
	ApplicationFormBundle,
	OpportunityBundle,
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
	return async (params: Omit<WritableModelFile, 'downloadUrl'>) =>
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

const REVOKE_URL_TIMEOUT = 100;

export async function downloadApplicationFormCsv(id: number): Promise<void> {
	const { token } = useKeycloak();
	const url = new URL(
		`/applicationForms/${id}/proposalDataCsv`,
		import.meta.env.VITE_API_URL,
	);
	const res = await fetch(url.toString(), {
		headers: { Authorization: `Bearer ${token}` },
	}).then(throwIfNotOk);

	const blob = await res.blob();
	const objectUrl = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = objectUrl;
	link.download = `application-form-${id}-proposal-data.csv`;

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	setTimeout(() => {
		URL.revokeObjectURL(objectUrl);
	}, REVOKE_URL_TIMEOUT);
}

export function useApplicationForms(
	page: number = DEFAULT_ENTITY_PAGE,
	count: number = DEFAULT_ENTITY_COUNT,
): ReturnType<typeof usePdcApi<ApplicationFormBundle>> {
	return usePdcApi<ApplicationFormBundle>(
		'/applicationForms',
		new URLSearchParams({
			_page: page.toString(),
			_count: count.toString(),
		}),
	);
}

export function useOpportunities(
	page: number = DEFAULT_ENTITY_PAGE,
	count: number = DEFAULT_ENTITY_COUNT,
): ReturnType<typeof usePdcApi<OpportunityBundle>> {
	return usePdcApi<OpportunityBundle>(
		'/opportunities',
		new URLSearchParams({
			_page: page.toString(),
			_count: count.toString(),
		}),
	);
}
