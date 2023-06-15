import React from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { ArrowRightOnRectangleIcon, CircleStackIcon } from '@heroicons/react/24/outline';
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
import { Dropdown, DropdownMenuLink, DropdownMenuText } from './Dropdown';

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
  }[];
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
        <Dropdown
          align="right"
          trigger={(
            <>
              <CircleStackIcon />
              Data providers
            </>
        )}
        >
          <DropdownMenuText>
            View applicant data from one of the data platform providers:
          </DropdownMenuText>
          <DropdownMenuLink
            to={`/proposals/${proposalId}/provider/candid`}
            key="candid"
          >
            Candid
            <ArrowRightOnRectangleIcon />
          </DropdownMenuLink>
          <DropdownMenuLink
            to={`/proposals/${proposalId}/provider/charity-navigator`}
            key="charity-navigator"
          >
            Charity Navigator
            <ArrowRightOnRectangleIcon />
          </DropdownMenuLink>
        </Dropdown>
      </PanelActions>
    </PanelHeader>
    <PanelBody padded={false}>
      <ProposalTable
        version={version}
        values={values}
      />
    </PanelBody>
  </Panel>
);

export { ProposalDetailPanel };
