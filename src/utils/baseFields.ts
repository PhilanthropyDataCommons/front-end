import { ApiBaseField } from '../pdc-api';

/**
 * Iterates through a list of basefields, pairing labels with shortcodes
 * Returns a Record<String,String> map of shortcodes to labels
 * @param  {ApiBaseField[]} fields an array of ApiBaseFields
 * @return {Record<string,string>} a map between basefield shortcodes and labels
 */
const mapFieldNames = (fields: ApiBaseField[]) =>
	Object.fromEntries(fields.map(({ label, shortCode }) => [shortCode, label]));

export { mapFieldNames };
