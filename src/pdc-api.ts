import { ref, onMounted, watch } from 'vue';
import { useKeycloak } from '@dsb-norge/vue-keycloak-js';
import { getLogger } from '@/logger';
import type { Ref } from 'vue';
import type { BaseField } from '@pdc/sdk';

const logger = getLogger('pdc-api');
const API_URL = import.meta.env.VITE_API_URL;

const { token } = useKeycloak();

function throwIfNotOk(res: Response): Response {
	if (!res.ok) {
		throw new Error(`Response status: ${res.status} ${res.statusText}`);
	}
	return res;
}

export function usePdcApi<T>(
	path: string,
	params = new URLSearchParams(),
): { data: Ref; fetchData: () => Promise<void> } {
	const data = ref<T | null>(null);

	const fetchData = async (): Promise<void> => {
		data.value = null;
		try {
			const url = new URL(path, API_URL);
			url.search = params.toString();

			const res = await fetch(url.toString(), {
				headers: { Authorization: `Bearer ${token}` },
			}).then(throwIfNotOk);
			/*  eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion --
			 * We are assuming here that the pdc-service being communicated with is functioning
			 * correctly, such that if the request is successful, the response is valid JSON of the
			 */
			data.value = (await res.json()) as T;
		} catch (err) {
			logger.error(
				{ error: err, params: params.toString() },
				`Error fetching ${path}`,
			);
		}
	};

	onMounted(fetchData);

	watch(() => params.toString(), fetchData);

	return { data, fetchData };
}

export function useBaseFields(): {
	data: Ref<BaseField[] | null>;
	fetchData: () => Promise<void>;
} {
	return usePdcApi<BaseField[]>('/baseFields');
}
