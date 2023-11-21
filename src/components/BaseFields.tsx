import React from 'react';
import './BaseFields.css';
import { ApiBaseField } from '../pdc-api';

interface BaseFieldsProps {
  fields: ApiBaseField[];
  loading?: boolean;
}

/* eslint-disable @typescript-eslint/no-unused-vars, arrow-body-style */
export const BaseFields = ({
  fields,
  loading = false,
}: BaseFieldsProps) => {
  return (
    <p>TODO: base fields list</p>
  );
};
