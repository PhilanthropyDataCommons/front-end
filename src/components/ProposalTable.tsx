import React from 'react';
import {
  Table,
  TableHead,
  ColumnHead,
  TableBody,
  TableRow,
  RowHead,
  RowCell,
} from './Table';

interface ProposalTableProps {
  version: number;
  values: {
    shortCode: string,
    fieldName: string,
    position: number,
    value: string,
  }[],
}

export const ProposalTable = ({
  values,
  version,
}: ProposalTableProps) => (
  <Table>
    <TableHead fixed>
      <TableRow>
        <ColumnHead>
          Canonical Field
        </ColumnHead>
        <ColumnHead>
          {`Version ${version}`}
        </ColumnHead>
      </TableRow>
    </TableHead>
    <TableBody>
      {values.map(({ fieldName, position, value }) => (
        <TableRow key={position}>
          <RowHead>
            {fieldName}
          </RowHead>
          <RowCell>
            {value}
          </RowCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
