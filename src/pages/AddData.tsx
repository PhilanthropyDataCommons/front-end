import React, { useEffect } from 'react';
import { withOidcSecure } from '@axa-fr/react-oidc';
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
  const history = useBulkUploads();

  if (history === null) {
    return <BulkUploadList uploads={[]} />;
  }
  return <BulkUploadList uploads={history.entries} />;
};

const BaseFieldsLoader = () => {
  const fields = useBaseFields();
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
          <PanelHeader>
            <BulkUploaderLoader />
          </PanelHeader>
          <PanelBody padded={false}>
            <BulkUploadHistoryLoader />
          </PanelBody>
        </Panel>
      </PanelGridItem>
      <PanelGridItem>
        <NewBulkUploadPanel>
          <BaseFieldsLoader />
        </NewBulkUploadPanel>
      </PanelGridItem>
    </PanelGrid>
  );
};

const AddData = withOidcSecure(AddDataLoader);
export { AddData };
