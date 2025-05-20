import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

/**
 * Provided a Date object or datetime string that DayJS
 * can parse, returns a relative time string such as
 * "1 day ago" or "3 months ago".
 *
 * @param  {Date | string} timestamp Date object or string
 * @return {string} Input datetime, expressed relative to now
 */
const relativizeDateTime = (timestamp: Date | string) =>
	dayjs().to(dayjs(timestamp));

/**
 * Provided a Date object or string of a datetime,
 * returns it formatted in the user's local time zone.
 *
 * Defaults to "LLL" format (e.g., "August 16, 2018 8:02 PM"),
 * but accepts an optional second parameter to override. See:
 * https://day.js.org/docs/en/display/format#localized-formats
 *
 * @param  {Date | string} timestamp Date object or string
 * @param  {string} format DayJS format code (see docs)
 * @return {string} Liocal version of datetime in our preferred format
 */
const localizeDateTime = (timestamp: Date | string, format = 'LLL') =>
	dayjs(timestamp).format(format);

export { localizeDateTime, relativizeDateTime };
