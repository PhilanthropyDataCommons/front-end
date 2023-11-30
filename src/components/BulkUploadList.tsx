import React from 'react';
import { BulkUpload } from '../interfaces/BulkUpload';
import { BulkUploadListItem } from './BulkUploadListItem';
import './BulkUploadList.css';

interface BulkUploadListProps {
  uploads: BulkUpload[];
}

export const BulkUploadList = ({
  uploads,
}: BulkUploadListProps) => (
  <div className="bulk-upload-list">
    {uploads.map((upload, index) => (
      <BulkUploadListItem
        key={index} // eslint-disable-line react/no-array-index-key
        upload={upload}
      />
    ))}
  </div>
);
