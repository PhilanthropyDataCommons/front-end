import React from 'react';
import prettyBytes from 'pretty-bytes';
import {
	ArrowPathIcon,
	CheckCircleIcon,
	ClockIcon,
	XCircleIcon,
} from '@heroicons/react/24/outline';
import { localizeDateTime, relativizeDateTime } from '../utils/datetime';
import type { ApiBulkUpload } from '../pdc-api';
import { EmailLink } from './EmailLink';
import './BulkUploadListItem.css';

enum BulkUploadStatuses {
	PENDING = 'pending',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
	CANCELED = 'canceled',
	FAILED = 'failed',
}

interface BulkUploadListItemProps {
	upload: ApiBulkUpload;
}

export const BulkUploadListItem = ({ upload }: BulkUploadListItemProps) => {
	const { id, fileName, fileSize, status, createdAt } = upload;

	const relativeTimestamp = (
		<time dateTime={createdAt} title={localizeDateTime(createdAt)}>
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
		case BulkUploadStatuses.PENDING:
			icon = <ClockIcon className="icon" />;
			metadata.push(
				relativeTimestamp,
				formattedFileSize,
				'Waiting to process…',
			);
			break;
		case BulkUploadStatuses.IN_PROGRESS:
			icon = <ArrowPathIcon className="icon rotating" />;
			metadata.push(relativeTimestamp, formattedFileSize, 'Processing…');
			break;
		case BulkUploadStatuses.COMPLETED:
			icon = <CheckCircleIcon className="icon" />;
			metadata.push(relativeTimestamp, formattedFileSize);
			break;
		case BulkUploadStatuses.CANCELED:
			icon = <XCircleIcon className="icon" />;
			metadata.push(<>Canceled {relativeTimestamp}</>, formattedFileSize);
			break;
		case BulkUploadStatuses.FAILED:
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
