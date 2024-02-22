import React, { useState } from 'react';
import { CodeBracketSquareIcon as SolidBracketIcon } from '@heroicons/react/24/solid';
import { CodeBracketSquareIcon as OutlineBracketIcon } from '@heroicons/react/24/outline';
import {
  Table,
  TableHead,
  ColumnHead,
  TableBody,
  TableRow,
  RowHead,
  RowCell,
  ColumnAction,
  ColumnActions,
} from './Table';

interface ProposalTableProps {
  version: number;
  values: {
    shortCode: string,
    fieldName: string,
    position: number,
    value: string,
  }[];
}

export const ProposalTable = ({
  values,
  version,
}: ProposalTableProps) => {
  const [displayShortCodes, setDisplayShortCodes] = useState(false);

  const handleDisplayShortCodesClick = () => {
    setDisplayShortCodes((previous) => !previous);
  };

  return (
    <Table>
      <TableHead fixed>
        <TableRow>
          <ColumnHead
            actions
            actionAlignment="left"
          >
            Base Field
            <ColumnActions>
              <ColumnAction
                title="Toggle between field label and short code"
                onClick={handleDisplayShortCodesClick}
              >
                {displayShortCodes
                  ? <SolidBracketIcon className="icon" />
                  : <OutlineBracketIcon className="icon" />}
              </ColumnAction>
            </ColumnActions>
          </ColumnHead>
          <ColumnHead>
            {`Version ${version}`}
          </ColumnHead>
        </TableRow>
      </TableHead>
      <TableBody>
        {values.map(({
          shortCode, fieldName, position, value,
        }) => (
          <TableRow key={position}>
            <RowHead>
              {displayShortCodes ? <code className="short-code">{shortCode}</code> : fieldName}
            </RowHead>
            <RowCell>
              {value}
            </RowCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
