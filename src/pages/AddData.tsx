import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import {
	uploadUsingPresignedPost,
	useBaseFields,
	useBulkUploads,
	usePresignedPostCallback,
	useRegisterBulkUploadCallback,
	useSystemSource,
} from '../pdc-api';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { Panel, PanelBody, PanelHeader } from '../components/Panel';
import { NewBulkUploadPanel } from '../components/NewBulkUploadPanel';
import { BaseFields } from '../components/BaseFields';
import { BulkUploaderFilePicker } from '../components/BulkUploaderFilePicker';
import { BulkUploadList } from '../components/BulkUploadList';
import './AddData.css';

const REFRESH_BULK_UPLOADS_INTERVAL = 5000;

const BaseFieldsLoader = () => {
	const [fields] = useBaseFields();
	if (fields === null) {
		return <BaseFields fields={[]} />;
	}

	return <BaseFields fields={fields} />;
};

interface BulkUploaderProps {
	onBulkUpload: () => void;
}
const BulkUploader = ({ onBulkUpload }: BulkUploaderProps) => {
	const [systemSource] = useSystemSource();
	const createPresignedPost = usePresignedPostCallback();
	const registerBulkUpload = useRegisterBulkUploadCallback();
	const handleUpload = async (file: File) => {
		if (systemSource?.id == null) {
			throw new Error('No System Source Available');
		}
		const { presignedPost } = await createPresignedPost({
			fileType: file.type || 'application/octet-stream',
			fileSize: file.size,
		});

		await uploadUsingPresignedPost(file, presignedPost);

		await registerBulkUpload({
			fileName: file.name,
			sourceKey: presignedPost.fields.key,
			sourceId: systemSource.id,
		});

		onBulkUpload();
	};

	return <BulkUploaderFilePicker uploadFile={handleUpload} />;
};

const AddDataLoader = () => {
	const [bulkUploadResponse, refreshBulkUploads] = useBulkUploads();
	const [bulkUploads, setBulkUploads] = useState(
		bulkUploadResponse?.entries ?? [],
	);

	useEffect(() => {
		document.title = 'Add Data - Philanthropy Data Commons';

		if (bulkUploadResponse?.entries) {
			setBulkUploads(bulkUploadResponse.entries);
		}

		const intervalId = setInterval(() => {
			refreshBulkUploads();
		}, REFRESH_BULK_UPLOADS_INTERVAL);

		return () => {
			clearInterval(intervalId);
		};
	}, [bulkUploadResponse, refreshBulkUploads]);

	return (
		<PanelGrid sidebarred>
			<PanelGridItem>
				<Panel>
					<PanelHeader padded={false}>
						<NavLink to="/add-data" className="new-bulk-upload-link">
							<DocumentPlusIcon className="icon" />
							New bulk upload
						</NavLink>
					</PanelHeader>
					<PanelBody padded={false}>
						<BulkUploadList uploads={bulkUploads} />
					</PanelBody>
				</Panel>
			</PanelGridItem>
			<PanelGridItem>
				<NewBulkUploadPanel
					apiUrl={new URL('/', import.meta.env.VITE_API_URL)}
					bulkUploader={<BulkUploader onBulkUpload={refreshBulkUploads} />}
					baseFieldsLoader={<BaseFieldsLoader />}
				/>
			</PanelGridItem>
		</PanelGrid>
	);
};

export { AddDataLoader as AddData };
