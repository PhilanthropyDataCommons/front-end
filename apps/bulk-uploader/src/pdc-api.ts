import { usePdcApi } from '@pdc/utilities';
import type { BulkUploadTaskBundle } from '@pdc/sdk';

const BULK_UPLOADS_DEFAULT_PAGE = 1;
const BULK_UPLOADS_DEFAULT_COUNT = 200;

export function useBulkUploads(
	page: number = BULK_UPLOADS_DEFAULT_PAGE,
	count: number = BULK_UPLOADS_DEFAULT_COUNT,
): ReturnType<typeof usePdcApi<BulkUploadTaskBundle>> {
	return usePdcApi<BulkUploadTaskBundle>(
		'/tasks/bulkUploads',
		new URLSearchParams({
			_page: page.toString(),
			_count: count.toString(),
		}),
	);
}
