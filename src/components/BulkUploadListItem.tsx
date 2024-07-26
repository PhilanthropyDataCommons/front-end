import prettyBytes from 'pretty-bytes';
import {
	ArrowPathIcon,
	CheckCircleIcon,
	ClockIcon,
	XCircleIcon,
} from '@heroicons/react/24/outline';
import { BulkUpload } from '@pdc/sdk';
import { localizeDateTime, relativizeDateTime } from '../utils/datetime';
import { EmailLink } from './EmailLink';
import './BulkUploadListItem.css';

interface BulkUploadListItemProps {
	upload: BulkUpload;
}

export const BulkUploadListItem = ({ upload }: BulkUploadListItemProps) => {
	const { id, fileName, fileSize, status, createdAt } = upload;

	const relativeTimestamp = (
		<time dateTime={createdAt.toString()} title={localizeDateTime(createdAt)}>
			{relativizeDateTime(createdAt)}
		</time>
	);

	const formattedFileSize = fileSize ? (
		<span
			title={`${fileSize.toLocaleString()} byte${fileSize !== 1 ? 's' : ''}`}
		>
			{prettyBytes(fileSize, { space: false })}
		</span>
	) : null;

	let icon = null;
	const metadata = [];

	switch (status) {
		case BulkUpload.StatusEnum.Pending:
			icon = <ClockIcon className="icon" />;
			metadata.push(
				relativeTimestamp,
				formattedFileSize,
				'Waiting to process…',
			);
			break;
		case BulkUpload.StatusEnum.InProgress:
			icon = <ArrowPathIcon className="icon rotating" />;
			metadata.push(relativeTimestamp, formattedFileSize, 'Processing…');
			break;
		case BulkUpload.StatusEnum.Completed:
			icon = <CheckCircleIcon className="icon" />;
			metadata.push(relativeTimestamp, formattedFileSize);
			break;
		case BulkUpload.StatusEnum.Canceled:
			icon = <XCircleIcon className="icon" />;
			metadata.push(<>Canceled {relativeTimestamp}</>, formattedFileSize);
			break;
		case BulkUpload.StatusEnum.Failed:
			icon = <XCircleIcon className="icon" />;
			metadata.push(
				<>Failed {relativeTimestamp}</>,
				formattedFileSize,
				<EmailLink
					to="info@philanthropydatacommons.org"
					subject={`Bulk upload error (ID: ${id})`}
				>
					Email the dev team for help
				</EmailLink>,
			);
			break;
		default:
	}

	// We delimit metadata elements with a bullet padded by two spaces.
	// The first space is non-breaking, so that the bullet never wraps
	// to a new line by itself. (That looks ugly.)
	const METADATA_DELIMITER = <>&nbsp;• </>;

	const metadataElements = metadata
		.filter((datum) => datum !== null)
		.reduce(
			(accumulator, datum) =>
				accumulator === null ? (
					datum
				) : (
					<>
						{accumulator}
						{METADATA_DELIMITER}
						{datum}
					</>
				),
			null,
		);

	return (
		<div className={`bulk-upload-list-item ${status}`}>
			<div className="status-icon">{icon}</div>
			<div className="file-name">{fileName}</div>
			<div className="metadata">{metadataElements}</div>
		</div>
	);
};
