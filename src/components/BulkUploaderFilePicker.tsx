import React, {
	ChangeEventHandler,
	DragEventHandler,
	MouseEventHandler,
	useRef,
	useState,
} from 'react';
import {
	CheckCircleIcon,
	DocumentPlusIcon,
	XCircleIcon,
} from '@heroicons/react/24/outline';
import { DocumentArrowUpIcon } from '@heroicons/react/24/solid';
import './BulkUploaderFilePicker.css';
import { Spinner } from './Spinner';

interface FilePickerMessageProps {
	text?: React.ReactNode;
	icon?: React.ReactNode | null;
	additionalText?: React.ReactNode | null;
	resetLink?: boolean;
}

const FilePickerMessage = ({
	text = '',
	icon = null,
	additionalText = null,
	resetLink = false,
}: FilePickerMessageProps) => (
	<div className="file-picker-message">
		{icon && <span className="file-picker-message__icon">{icon}</span>}
		<span className="file-picker-message__text">{text}</span>
		{additionalText && (
			<span className="file-picker-message__additional-text">
				{additionalText}
			</span>
		)}
		{resetLink && (
			<span className="file-picker-message__reset-link">Reset uploader</span>
		)}
	</div>
);

interface BulkUploaderFilePickerProps {
	uploadFile: (file: File) => Promise<void>;
}

export const BulkUploaderFilePicker = ({
	uploadFile,
}: BulkUploaderFilePickerProps) => {
	const ACCEPTED_MIME_TYPES = ['text/csv'];
	const ACCEPTED_FILE_EXTENSIONS = ['csv'];
	const MAXIMUM_FILE_SIZE_BYTES = 1e9; // 1GB

	const DEFAULT_STATUS = 'idle';

	const formRef = useRef<HTMLFormElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [status, setStatus] = useState(DEFAULT_STATUS);

	const statusClass = status.split('.').at(0) ?? DEFAULT_STATUS;
	const isDragging = statusClass === 'dragging';
	const isUploading = statusClass === 'uploading';
	const isComplete = statusClass === 'complete';
	const hasError = statusClass === 'error';

	/**
	 * Provided a list of files,
	 * performs pre-upload validations.
	 *
	 * @param  {FileList | null} files
	 */
	const validateFiles = (
		files: FileList | null,
	): files is FileList & { 0: File } => {
		if (!files?.[0]) {
			setStatus('error.noFile');
			return false;
		}

		if (files.length > 1) {
			setStatus('error.maxFileCount');
			return false;
		}

		const file = files[0];

		const fileExtension = file.name.split('.').at(-1) ?? '';
		if (
			!ACCEPTED_MIME_TYPES.includes(file.type) ||
			!ACCEPTED_FILE_EXTENSIONS.includes(fileExtension)
		) {
			setStatus('error.unsupportedType');
			return false;
		}

		if (file.size > MAXIMUM_FILE_SIZE_BYTES) {
			setStatus('error.maxFileSize');
			return false;
		}

		return true;
	};

	/**
	 * Provided a list of files from either a native file picker
	 * or the Drag and Drop API, validates and uploads the files.
	 *
	 * @param  {FileList | null} files
	 */
	const handleFiles = (files: FileList | null) => {
		if (!validateFiles(files)) {
			return;
		}

		// Remove focus from the button.
		// We wait until after validation so focus is not wrenched away.
		buttonRef.current?.blur();

		setStatus('uploading');

		uploadFile(files[0])
			.then(() => {
				setStatus('complete');
			})
			.catch(() => {
				setStatus('error.uploadFailure');
			});
	};

	/**
	 * Handler for when a dragged file enters the component.
	 *
	 * @param  {DragEventHandler} e
	 */
	const handleDragEnter: DragEventHandler = (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (isUploading) return;

		setStatus('dragging');
	};

	/**
	 * Handler for when a dragged file leaves the component.
	 *
	 * @param  {DragEventHandler} e
	 */
	const handleDragLeave: DragEventHandler = (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (isUploading) return;

		setStatus('idle');
	};

	/**
	 * Handler for the event that is fired constantly
	 * while the user is holding the file over the component.
	 *
	 * We have to make this a no-op
	 * so that dropping works consistently.
	 *
	 * @param  {DragEventHandler} e
	 */
	const handleDragOver: DragEventHandler = (e) => {
		e.stopPropagation();
		e.preventDefault();
	};

	const handleDrop: DragEventHandler = (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (isUploading) return;

		const { files } = e.dataTransfer;
		handleFiles(files);
	};

	/**
	 * Proxy clicks on the button element
	 * to the input file element
	 * so that clicking the button
	 * opens the native file-picker.
	 *
	 * @param  {MouseEventHandler} e
	 */
	const handleProxyClick: MouseEventHandler = () => {
		if (isUploading) return;

		// Reset the component when users click on it
		// in an error state. This is an "escape hatch"
		// for users who don't realize they can just
		// drag and drop a new file.
		if (hasError) {
			setStatus(DEFAULT_STATUS);
			return;
		}

		fileInputRef.current?.click();
	};

	/**
	 * Handler for when a file is selected
	 * using the native OS file picker.
	 *
	 * This is a backup for users
	 * having trouble with drag and drop
	 *
	 * @param  {ChangeEventHandler} e
	 */
	const handleFileInputChange: ChangeEventHandler = (e) => {
		e.preventDefault();

		const fileInput = e.target as HTMLInputElement;
		handleFiles(fileInput.files);
	};

	/**
	 * Generate a comma-delimited list of valid file types
	 * for the native file picker. This list conforms to the
	 * spec for the `accept` HTML attribute.
	 *
	 * @return {string} Contents for the file input's `accept` attribute
	 */
	const makeAcceptableFileAttr = () => {
		// It's more sensible and flexible to list our file extensions without the
		// dot. Since the `accept` attribute requires it, we add it here.
		const prefixedFileExtensions = ACCEPTED_FILE_EXTENSIONS.map(
			(ext) => `.${ext}`,
		);

		return prefixedFileExtensions.concat(ACCEPTED_MIME_TYPES).join(',');
	};

	/**
	 * Render the appropriate FilePickerMessage
	 * based on the current status.
	 *
	 * @return {FilePickerMessage}
	 */
	const renderFilePickerMessage = () => {
		if (isDragging) {
			return (
				<FilePickerMessage
					icon={<DocumentArrowUpIcon className="icon" />}
					text="Drop your file to begin uploading."
				/>
			);
		}

		if (isUploading) {
			return (
				<FilePickerMessage icon={<Spinner />} text="Uploading your file…" />
			);
		}

		if (isComplete) {
			return (
				<FilePickerMessage
					icon={<CheckCircleIcon className="icon" />}
					text="Upload complete!"
					additionalText="We are now processing your file."
				/>
			);
		}

		if (hasError) {
			const error = status.split('.').at(1);
			switch (error) {
				case 'maxFileCount':
					return (
						<FilePickerMessage
							icon={<XCircleIcon className="icon" />}
							text="You can only upload one file at a time."
							resetLink
						/>
					);
				case 'maxFileSize':
					return (
						<FilePickerMessage
							icon={<XCircleIcon className="icon" />}
							text="Your file is too large"
							// TODO: Use a formatting utility to generate "1GB".
							additionalText="You can only upload 1GB at a time."
							resetLink
						/>
					);
				case 'unsupportedType':
					return (
						<FilePickerMessage
							icon={<XCircleIcon className="icon" />}
							text="Unsupported file type"
							additionalText="Your file must be a CSV."
							resetLink
						/>
					);
				case 'uploadFailure':
				default:
					return (
						<FilePickerMessage
							icon={<XCircleIcon className="icon" />}
							text="Error uploading your file. Please try again."
							resetLink
						/>
					);
			}
		}

		return (
			<FilePickerMessage
				icon={<DocumentPlusIcon className="icon" />}
				text="Drag and drop your CSV file here."
			/>
		);
	};

	return (
		<form ref={formRef} className={`file-picker ${statusClass}`}>
			{/* This is a button so it can receive keyboard focus. */}
			<button
				type="button"
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onClick={handleProxyClick}
				disabled={isUploading}
			>
				{renderFilePickerMessage()}
			</button>
			{/* This is a native file input so the native file picker can be used as a fallback. */}
			<input
				ref={fileInputRef}
				type="file"
				accept={makeAcceptableFileAttr()}
				onChange={handleFileInputChange}
				disabled={isUploading}
			/>
		</form>
	);
};
