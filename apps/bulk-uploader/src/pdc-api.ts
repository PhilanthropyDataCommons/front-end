import { usePdcApi } from '@pdc/utilities';
import type { BulkUploadTaskBundle } from '@pdc/sdk';

const BULK_UPLOADS_DEFAULT_PAGE = '1';
const BULK_UPLOADS_DEFAULT_COUNT = '100';

export function useBulkUploads(
	page: string = BULK_UPLOADS_DEFAULT_PAGE,
	count: string = BULK_UPLOADS_DEFAULT_COUNT,
): ReturnType<typeof usePdcApi<BulkUploadTaskBundle>> {
	return usePdcApi<BulkUploadTaskBundle>(
		'/tasks/bulkUploads',
		new URLSearchParams({
			_page: page,
			_count: count,
		}),
	);
}
