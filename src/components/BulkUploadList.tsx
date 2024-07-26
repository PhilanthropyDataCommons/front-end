import type { BulkUpload } from '@pdc/sdk';
import { BulkUploadListItem } from './BulkUploadListItem';
import './BulkUploadList.css';

interface BulkUploadListProps {
	uploads: BulkUpload[];
}

export const BulkUploadList = ({ uploads }: BulkUploadListProps) => (
	<div className="bulk-upload-list">
		<div className="bulk-upload-list-header">Bulk Upload History</div>
		{uploads.map((upload) => (
			<BulkUploadListItem key={upload.id} upload={upload} />
		))}
	</div>
);
