import React from 'react';
import './NewBulkUploadPanel.css';
import { Panel, PanelBody } from './Panel';

const apiUrl = new URL('/', process.env.REACT_APP_API_URL);
const bulkUploadTemplateUrl = new URL('/static/bulkUpload.csv', apiUrl);

interface NewBulkUploadPanelProps {
  children?: React.ReactNode;
}

export const NewBulkUploadPanel = ({
  children = null,
}: NewBulkUploadPanelProps) => (
  <Panel>
    <PanelBody>
      <article className="bulk-upload-instructions">
        <h3>Add data to the PDC</h3>

        <p>
          <b>Adding data via the bulk uploader</b>
          {' '}
          is drag-and-drop easy:
        </p>

        <ol>
          <li>
            Create a CSV of your data with
            {' '}
            <a href="#base-fields">
              base field keys
            </a>
            {' '}
            as the first row.
            {' '}
            <strong>
              The
              {' '}
              <code>proposal_submitter_email</code>
              {' '}
              field is required.
            </strong>
            {' '}
            If you want, you can start with
            {' '}
            <a href={bulkUploadTemplateUrl.toString()}>
              this template of recommended base fields
            </a>
            .
          </li>
          <li>
            Upload your CSV in the sidebar to the left.
          </li>
        </ol>

        <p>
          <b>Adding data via the API</b>
          {' '}
          allows the most control. You can create new opportunities,
          add applications, register new base fields, and more.
          To use the API, request an API key from
          {' '}
          <a href="mailto:info@philanthropydatacommons.org?Subject=PDC%20API%20key%20request">
            info@philanthropydatacommons.org
          </a>
          {' '}
          and then visit the documentation site at
          {' '}
          <a href={apiUrl.toString()}>{apiUrl.hostname}</a>
          .
        </p>
      </article>

      <article id="base-fields">
        <header className="bulk-upload-instructions">
          <h3>Base Fields</h3>

          <p>
            Base fields are the backbone of the PDC. Your data must write to an
            existing base field, unless you create a new one using the
            {' '}
            <a href={apiUrl.toString()}>API</a>
            .
          </p>
        </header>

        {children}
      </article>
    </PanelBody>
  </Panel>
);
