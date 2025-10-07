import { usePdcApi, usePdcCallbackApi } from '@pdc/utilities';
import type { BaseField, WritableBaseField } from '@pdc/sdk';

const DEFAULT_ENTITY_PAGE = 1;
const DEFAULT_ENTITY_COUNT = 200;

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

export const usePutBaseFieldsCallback = (shortCode: string) => {
	const api = usePdcCallbackApi<BaseField>(`/baseFields/${shortCode}`);
	return async (params: WritableBaseField) =>
		await api({
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});
};
