import { usePdcApi } from '@pdc/utilities';
import type { BaseField } from '@pdc/sdk';

export function useBaseFields(): ReturnType<typeof usePdcApi<BaseField[]>> {
	return usePdcApi<BaseField[]>('/baseFields');
}
