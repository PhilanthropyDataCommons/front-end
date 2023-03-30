import React from 'react';
import {
  Table,
  TableHead,
  ColumnHead,
  TableBody,
  TableRow,
  RowCell,
} from './Table';

interface ProposalListTableRowProps {
  proposal: Record<string, string[]>,
  proposalId: string,
  columns: string[],
}

const ProposalListTableRow = ({
  proposal,
  proposalId,
  columns,
}: ProposalListTableRowProps) => {
  const handleRowClick = () => {
    // TODO: Replace this with a navigation to the proposal detail page.
    // eslint-disable-next-line no-console
    console.log(`Navigate to proposal detail page for ${proposalId}`);
  };

  return (
    <TableRow onClick={handleRowClick}>
      {/* Iterate over columns to ensure order. */}
      {columns.map((shortCode) => (
        <RowCell key={shortCode}>
          {proposal[shortCode]}
        </RowCell>
      ))}
    </TableRow>
  );
};

interface ProposalListTableProps {
  proposals: Record<string, string[]>[],
  fieldNames: Record<string, string>,
  columns: string[],
}

export const ProposalListTable = ({
  fieldNames,
  proposals,
  columns,
}: ProposalListTableProps) => (
  <Table>
    <TableHead fixed>
      <TableRow>
        {columns.map((shortCode) => (
          <ColumnHead key={shortCode}>
            {fieldNames[shortCode]}
          </ColumnHead>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {/*
        FIXME: `proposal.id` is a guess at the field name for the proposal ID.
               Also, note that it is assumed to be an array like all other proposal values,
               but if we special-case `id` somehow we'll need to modify the type definition
               and I, for one, don't know how.
      */}
      {proposals.map((proposal) => (proposal.id.length ? (
        <ProposalListTableRow
          key={proposal.id.join()}
          proposalId={proposal.id.join()}
          columns={columns}
          proposal={proposal}
        />
      ) : null))}
    </TableBody>
  </Table>
);
