import React from 'react';
import { Link } from 'react-router-dom';
import { BackwardIcon, DocumentTextIcon, ForwardIcon } from '@heroicons/react/24/solid';
import {
  Panel,
  PanelActions,
  PanelBody,
  PanelHeader,
  PanelTag,
  PanelTitle,
  PanelTitleTags,
  PanelTitleWrapper,
} from './Panel';
import { ProposalTable } from './ProposalTable';

interface ProposalDetailPanelProps {
  title: string | undefined;
  applicant: string;
  applicantId: string | undefined;
  proposalId: number;
  version: number;
  values: {
    shortCode: string,
    fieldName: string,
    position: number,
    value: string,
  }[],
}

const ProposalDetailPanel = ({
  proposalId,
  title,
  applicant,
  applicantId,
  version,
  values,
}: ProposalDetailPanelProps) => (
  <Panel>
    <PanelHeader>
      <PanelTitleWrapper>
        <PanelTitle>
          {applicant}
        </PanelTitle>
        <PanelTitleTags>
          {applicantId && (
            <PanelTag badge="EIN">
              {applicantId}
            </PanelTag>
          )}
          {title && (
            <PanelTag icon={<DocumentTextIcon />}>
              {title}
            </PanelTag>
          )}
        </PanelTitleTags>
      </PanelTitleWrapper>
      <PanelActions>
        {process.env.NODE_ENV !== 'production' && (
          <>
            <Link
              to={`/proposals/${proposalId - 1}`}
              className="button button--color-gray"
            >
              <BackwardIcon className="icon" />
              Previous
            </Link>
            <Link
              to={`/proposals/${proposalId + 1}`}
              className="button button--color-gray"
            >
              Next
              <ForwardIcon className="icon" />
            </Link>
          </>
        )}
      </PanelActions>
    </PanelHeader>
    <PanelBody>
      <ProposalTable
        version={version}
        values={values}
      />
    </PanelBody>
  </Panel>
);

export { ProposalDetailPanel };