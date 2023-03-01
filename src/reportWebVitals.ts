import {
  getCLS, getFID, getFCP, getLCP, getTTFB,
} from 'web-vitals';
import type { Metric, ReportHandler } from 'web-vitals';

import { getLogger } from './logger';

const reportWebVitals = () => {
  const logger = getLogger('web-vitals');
  const reportHandler: ReportHandler = (metric: Metric) => logger.info(metric);
  getCLS(reportHandler);
  getFID(reportHandler);
  getFCP(reportHandler);
  getLCP(reportHandler);
  getTTFB(reportHandler);
};

export default reportWebVitals;
