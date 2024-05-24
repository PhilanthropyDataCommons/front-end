/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_REACT_APP_OIDC_AUTHORITY: string;
	readonly VITE_REACT_APP_OIDC_CLIENT_ID: string;
	readonly VITE_REACT_APP_API_URL: string;
	readonly VITE_REACT_APP_LOG_LEVEL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
