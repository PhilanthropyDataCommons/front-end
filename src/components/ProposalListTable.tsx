import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataViewerProposal } from '../interfaces/DataViewerProposal';
import { getPreferredApplicantNameValues } from '../utils/proposals';
import {
  Table,
  TableHead,
  ColumnHead,
  TableBody,
  TableRow,
  RowCell,
} from './Table';

interface ProposalListTableRowProps {
  columns: string[];
  proposal: DataViewerProposal;
}

const ProposalListTableRow = ({
  proposal,
  columns,
}: ProposalListTableRowProps) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/proposals/${proposal.id}`);
  };

  const getProposalCellContents = (shortCode: string) => {
    let proposalValue;

    switch (shortCode) {
      case 'organization_name':
        proposalValue = getPreferredApplicantNameValues(proposal);
        break;
      default:
        proposalValue = proposal.values[shortCode];
    }

    return proposalValue;
  };

  return (
    <TableRow onClick={handleRowClick}>
      {/* Iterate over columns to ensure order. */}
      {columns.map((shortCode) => (
        <RowCell key={shortCode}>
          {getProposalCellContents(shortCode)}
        </RowCell>
      ))}
    </TableRow>
  );
};

interface ProposalListTableProps {
  columns: string[];
  fieldNames: Record<string, string>;
  proposals: DataViewerProposal[];
  wrap?: boolean;
}

export const ProposalListTable = ({
  fieldNames,
  proposals,
  columns,
  wrap = false,
}: ProposalListTableProps) => (
  <Table truncate={!wrap}>
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
      {proposals.map((proposal, index) => (
        <ProposalListTableRow
          key={index} // eslint-disable-line react/no-array-index-key
          columns={columns}
          proposal={proposal}
        />
      ))}
    </TableBody>
  </Table>
);
