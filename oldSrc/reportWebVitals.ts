import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import type { Metric } from 'web-vitals';

import { getLogger } from './logger';

const reportWebVitals = () => {
	const logger = getLogger('web-vitals');
	const reportHandler: (metric: Metric) => void = (metric: Metric) =>
		logger.info(metric);
	onCLS(reportHandler);
	onFCP(reportHandler);
	onINP(reportHandler);
	onLCP(reportHandler);
	onTTFB(reportHandler);
};

export { reportWebVitals };
