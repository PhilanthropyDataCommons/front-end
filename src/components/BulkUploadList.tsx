import React from 'react';
import { BulkUploadListItem } from './BulkUploadListItem';
import './BulkUploadList.css';
import type { ApiBulkUpload } from '../pdc-api';

interface BulkUploadListProps {
  uploads: ApiBulkUpload[];
}

export const BulkUploadList = ({
  uploads,
}: BulkUploadListProps) => (
  <div className="bulk-upload-list">
    <div className="bulk-upload-list-header">
      Bulk Upload History
    </div>
    {uploads.map((upload) => (
      <BulkUploadListItem
        key={upload.id}
        upload={upload}
      />
    ))}
  </div>
);
