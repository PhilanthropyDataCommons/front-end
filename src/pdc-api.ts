import { ref, onMounted, watch } from 'vue';
import { useKeycloak } from '@dsb-norge/vue-keycloak-js';
import type { BaseField } from '@pdc/sdk';
import { getLogger } from '@/logger';

const logger = getLogger('pdc-api');
const API_URL = import.meta.env.VITE_API_URL;

const { token } = useKeycloak();

function throwIfNotOk(res: Response) {
	if (!res.ok) {
		throw new Error(`Response status: ${res.status} ${res.statusText}`);
	}
	return res;
}

export function usePdcApi<T>(path: string, params = new URLSearchParams()) {
	const data = ref<T | null>(null);

	const fetchData = async () => {
		data.value = null;
		try {
			const url = new URL(path, API_URL);
			url.search = params.toString();

			const res = await fetch(url.toString(), {
				headers: { Authorization: `Bearer ${token}` },
			}).then(throwIfNotOk);

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

export function useBaseFields() {
	return usePdcApi<BaseField[]>('/baseFields');
}
