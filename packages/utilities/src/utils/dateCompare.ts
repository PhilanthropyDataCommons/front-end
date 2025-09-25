import { DateTime } from 'luxon';

/**
 * Compares two ISO date strings using Luxon's DateTime.
 *
 * @param a - First ISO date string
 * @param b - Second ISO date string
 * @returns Comparison result (b - a in milliseconds)
 */
export function dateCompare(a: string, b: string): number {
	return DateTime.fromISO(b).toMillis() - DateTime.fromISO(a).toMillis();
}
