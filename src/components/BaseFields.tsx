import React from 'react';
import './BaseFields.css';
import { ApiBaseField } from '../pdc-api';
import {
  Table,
  TableHead,
  ColumnHead,
  TableBody,
  TableRow,
  RowCell,
} from './Table';

interface BaseFieldListTableRowProps {
  field: ApiBaseField;
}

const BaseFieldListTableRow = ({
  field,
}: BaseFieldListTableRowProps) => (
  <TableRow>
    <RowCell>
      <code className="base-field-short-code">
        {field.shortCode}
      </code>
    </RowCell>
    <RowCell>
      {field.label}
    </RowCell>
    <RowCell>
      {field.description}
    </RowCell>
  </TableRow>
);

interface BaseFieldsProps {
  fields: ApiBaseField[];
}

export const BaseFields = ({
  fields,
}: BaseFieldsProps) => (
  <Table>
    <TableHead fixed>
      <TableRow>
        <ColumnHead>Key</ColumnHead>
        <ColumnHead>Label</ColumnHead>
        <ColumnHead>Description</ColumnHead>
      </TableRow>
    </TableHead>
    <TableBody>
      {fields.map((field) => (
        <BaseFieldListTableRow
          key={field.id}
          field={field}
        />
      ))}
    </TableBody>
  </Table>
);
