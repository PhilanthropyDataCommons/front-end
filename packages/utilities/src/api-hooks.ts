import { ref, onMounted, watch } from 'vue';
import { useKeycloak } from '@dsb-norge/vue-keycloak-js';
import { getLogger } from './logger';
import type { Ref } from 'vue';

const logger = getLogger('pdc-api');

/*  eslint-disable-next-line @typescript-eslint/prefer-destructuring --
 * Importing the full path of the enviornment variable seems to be
 * necessary to properly instantiate it. This occurs in applications
 * that import this file, such as the admin interface.
 */
const API_URL = import.meta.env.VITE_API_URL;

export function throwIfNotOk(
	res: Response,
	error?: Ref<Response | null>,
): Response {
	if (!res.ok) {
		if (error !== undefined) {
			const errorRef = error;
			errorRef.value = res.clone();
		}
		throw new Error(`Response status: ${res.status} ${res.statusText}`);
	}
	return res;
}

export function usePdcApi<T>(
	path: string,
	params = new URLSearchParams(),
): { data: Ref<T | null>; fetchData: () => Promise<void> } {
	const data: Ref<T | null> = ref(null);

	const fetchData = async (): Promise<void> => {
		data.value = null;
		try {
			const { token } = useKeycloak();
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

export function usePdcCallbackApi<T>(
	path: string,
	error?: Ref<Response | null>,
): (options: RequestInit) => Promise<T> {
	return async (options: RequestInit): Promise<T> => {
		try {
			const { token } = useKeycloak();
			const url = new URL(path, API_URL);
			const res = await fetch(url.toString(), {
				...options,
				headers: {
					Authorization: `Bearer ${token}`,
					...Object.fromEntries(Object.entries(options.headers ?? {})),
				},
			}).then((res) => throwIfNotOk(res, error));

			// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Assuming valid JSON response from API
			return (await res.json()) as T;
		} catch (error) {
			logger.error({ error, params: options }, `Error calling ${path}`);
			throw error;
		}
	};
}
