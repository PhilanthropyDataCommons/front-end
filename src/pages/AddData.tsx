import React, { useEffect } from 'react';
import { withOidcSecure } from '@axa-fr/react-oidc';
import { useBaseFields } from '../pdc-api';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { AddDataInstructions } from '../components/AddDataInstructions';
import { BaseFields } from '../components/BaseFields';
import { BulkUploader } from '../components/BulkUploader';

const BulkUploaderLoader = () => {
  const history: object[] = []; // todo
  return (
    <PanelGridItem>
      <BulkUploader history={history} loading />
    </PanelGridItem>
  );
};

const BaseFieldsLoader = () => {
  const fields = useBaseFields();
  if (fields === null) {
    return (
      <BaseFields fields={[]} loading />
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
      <BulkUploaderLoader />
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
