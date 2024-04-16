import React from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { Panel, PanelBody } from './Panel';
import './NewBulkUploadPanel.css';

interface NewBulkUploadPanelProps {
	apiUrl: URL;
	bulkUploader: React.ReactNode;
	baseFieldsLoader: React.ReactNode;
}

export const NewBulkUploadPanel = ({
	apiUrl,
	bulkUploader,
	baseFieldsLoader,
}: NewBulkUploadPanelProps) => {
	const bulkUploadTemplateUrl = new URL('/static/bulkUpload.csv', apiUrl);

	return (
		<Panel>
			<PanelBody>
				<section id="bulk-upload-instructions">
					<div className="instructions">
						<h1>New bulk upload</h1>

						<p>
							Quickly add your data to the PDC by mapping it to the PDC base
							fields (<a href="#base-fields">see table below</a>) and uploading
							as a CSV.
						</p>

						<h2 className="label">Requirements</h2>
						<ul>
							<li>
								<strong>Your data must be mapped to valid base fields.</strong>{' '}
								Other fields will be ignored.
							</li>
							<li>
								<strong>The first row must contain base field keys.</strong>{' '}
								Each subsequent row will be imported as a new proposal.
							</li>
						</ul>

						<h2 className="label">Optional</h2>
						<a
							href={bulkUploadTemplateUrl.toString()}
							className="has-icon no-visited"
						>
							<DocumentDuplicateIcon className="icon" />
							Download CSV template of recommended base field keys
						</a>
					</div>

					<div id="bulk-uploader-wrapper">{bulkUploader}</div>
				</section>

				<section id="base-fields">
					<h1>Base fields</h1>

					<div className="instructions">
						<p>
							Base fields are the backbone of the PDC. Your data must write to
							an existing base field, unless you create a new one using the{' '}
							<a href={apiUrl.toString()}>API</a>.
						</p>
					</div>

					{baseFieldsLoader}
				</section>
			</PanelBody>
		</Panel>
	);
};
