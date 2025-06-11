/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_KEYCLOAK_AUTHORITY: string;
	readonly VITE_KEYCLOAK_CLIENT_ID: string;
	readonly VITE_KEYCLOAK_REALM: string;
	readonly VITE_API_URL: string;
	readonly VITE_LOG_LEVEL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

