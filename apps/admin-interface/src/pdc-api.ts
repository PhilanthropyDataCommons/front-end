import { usePdcApi } from '@pdc/utilities';
import type { BaseField } from '@pdc/sdk';

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
