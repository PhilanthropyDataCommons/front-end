import pino from 'pino';
import type { Logger } from 'pino';

const level =
	process.env.REACT_APP_LOG_LEVEL ??
	(process.env.NODE_ENV === 'production' ? 'error' : 'info');

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
