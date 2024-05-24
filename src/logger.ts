import pino from 'pino';
import type { Logger } from 'pino';

const level =
	import.meta.env.VITE_REACT_APP_LOG_LEVEL ??
	(import.meta.env.PROD ? 'error' : 'info');

const logger = pino({
	name: 'front-end',
	level,
	browser: {
		asObject: true,
	},
});

const getLogger = (source: string): Logger => logger.child({ source });
export { getLogger };
export type { Logger };
