import React from 'react';
import './BulkUploader.css';
import { Panel, PanelBody } from './Panel';

interface BulkUploaderProps {
  history: object[]; // todo
  loading?: boolean;
}

/* eslint-disable @typescript-eslint/no-unused-vars, arrow-body-style */
export const BulkUploader = ({
  history,
  loading = false,
}: BulkUploaderProps) => {
  return (
    <Panel>
      <PanelBody>
        <p>TODO: bulk uploads list</p>
      </PanelBody>
    </Panel>
  );
};
