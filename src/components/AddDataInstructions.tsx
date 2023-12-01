import React from 'react';
import './AddDataInstructions.css';
import { Panel, PanelBody } from './Panel';

const apiUrl = new URL('/', process.env.REACT_APP_API_URL);
const bulkUploadTemplateUrl = new URL('/static/bulkUpload.csv', apiUrl);

interface AddDataInstructionsProps {
  children?: React.ReactNode;
}

export const AddDataInstructions = ({
  children = null,
}: AddDataInstructionsProps) => (
  <Panel>
    <PanelBody>
      <article className="add-data-instructions">
        <h3>Add data to the PDC</h3>

        <p>
          <b>Adding data via the bulk uploader</b>
          {' '}
          is drag-and-drop easy:
        </p>

        <ol>
          <li>
            Create a CSV of your data with base field keys as the first row
            (see table below). If you want, you can start with
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
          Note that you cannot create new base fields via the bulk uploader.
          Any columns in your file that don’t match an existing base field will
          cause an error.
        </p>

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

      {children}
    </PanelBody>
  </Panel>
);
