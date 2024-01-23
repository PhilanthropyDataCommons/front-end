import React, { useEffect } from 'react';
import { withOidcSecure } from '@axa-fr/react-oidc';
import {
  useBaseFields,
  useBulkUploads,
} from '../pdc-api';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { Panel, PanelBody } from '../components/Panel';
import { AddDataInstructions } from '../components/AddDataInstructions';
import { BaseFields } from '../components/BaseFields';
import { BulkUploadList } from '../components/BulkUploadList';

const BulkUploaderLoader = () => <p>TODO: bulk uploader</p>;

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
          <PanelBody>
            <BulkUploaderLoader />
            <BulkUploadHistoryLoader />
          </PanelBody>
        </Panel>
      </PanelGridItem>
      <PanelGridItem>
        <AddDataInstructions>
          <BaseFieldsLoader />
        </AddDataInstructions>
      </PanelGridItem>
    </PanelGrid>
  );
};

const AddData = withOidcSecure(AddDataLoader);
export { AddData };
