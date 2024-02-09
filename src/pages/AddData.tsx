import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { withOidcSecure } from '@axa-fr/react-oidc';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import {
  uploadUsingPresignedPost,
  useBaseFields,
  useBulkUploads,
  usePresignedPostCallback,
  useRegisterBulkUploadCallback,
} from '../pdc-api';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { Panel, PanelBody, PanelHeader } from '../components/Panel';
import { NewBulkUploadPanel } from '../components/NewBulkUploadPanel';
import { BaseFields } from '../components/BaseFields';
import { BulkUploaderFilePicker } from '../components/BulkUploaderFilePicker';
import { BulkUploadList } from '../components/BulkUploadList';
import './AddData.css';

const BulkUploaderLoader = () => {
  const createPresignedPost = usePresignedPostCallback();
  const registerBulkUpload = useRegisterBulkUploadCallback();
  const handleUpload = async (file: File) => {
    const { presignedPost } = await createPresignedPost({
      fileType: file.type || 'application/octet-stream',
      fileSize: file.size,
    });

    await uploadUsingPresignedPost(file, presignedPost);

    await registerBulkUpload({
      fileName: file.name,
      sourceKey: presignedPost.fields.key,
    });
  };

  return (
    <BulkUploaderFilePicker uploadFile={handleUpload} />
  );
};

const BulkUploadHistoryLoader = () => {
  const [history] = useBulkUploads();

  if (history === null) {
    return <BulkUploadList uploads={[]} />;
  }
  return <BulkUploadList uploads={history.entries} />;
};

const BaseFieldsLoader = () => {
  const [fields] = useBaseFields();
  if (fields === null) {
    return (
      <BaseFields fields={[]} />
    );
  }

  return (
    <BaseFields fields={fields} />
  );
};

const AddDataLoader = () => {
  useEffect(() => {
    document.title = 'Add Data - Philanthropy Data Commons';
  }, []);

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
            <BulkUploadHistoryLoader />
          </PanelBody>
        </Panel>
      </PanelGridItem>
      <PanelGridItem>
        <NewBulkUploadPanel
          apiUrl={new URL('/', process.env.REACT_APP_API_URL)}
          bulkUploaderLoader={<BulkUploaderLoader />}
          baseFieldsLoader={<BaseFieldsLoader />}
        />
      </PanelGridItem>
    </PanelGrid>
  );
};

const AddData = withOidcSecure(AddDataLoader);
export { AddData };
