import type { BulkUploadTask } from '@pdc/sdk';

/**
 * Generates a URL for a file in an S3 bucket.
 * @param bulkUpload - The bulk upload task containing the file.
 * @returns The URL for the file.
 */
function generateS3Url(bulkUpload: BulkUploadTask): string {
	const { endpoint, name } = bulkUpload.proposalsDataFile.s3Bucket;
	const storageKey = bulkUpload.proposalsDataFile.storageKey;
	const cleanEndpoint = endpoint.replace(/^https?:\/\//, '');
	return `https://${name}.${cleanEndpoint}/${storageKey}`;
}

export { generateS3Url };
