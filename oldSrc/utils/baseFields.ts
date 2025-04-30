import type { BaseField } from '@pdc/sdk';
/**
 * Iterates through a list of basefields, pairing labels with shortcodes
 * Returns a Record<String,String> map of shortcodes to labels
 * @param  {BaseField[]} fields an array of BaseFields
 * @return {Record<string,string>} a map between basefield shortcodes and labels
 */
const mapFieldNames = (fields: BaseField[]) =>
	Object.fromEntries(fields.map(({ label, shortCode }) => [shortCode, label]));

export { mapFieldNames };
