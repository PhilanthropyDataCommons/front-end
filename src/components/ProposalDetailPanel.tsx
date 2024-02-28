import React from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { ArrowRightStartOnRectangleIcon, CircleStackIcon } from '@heroicons/react/24/outline';
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
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuLink,
  DropdownMenuText,
  DropdownTrigger,
} from './Dropdown';

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
        <Dropdown>
          <DropdownTrigger>
            <CircleStackIcon />
            Data providers
          </DropdownTrigger>
          <DropdownMenu align="right">
            <DropdownMenuText>
              View applicant data from one of the data platform providers:
            </DropdownMenuText>
            <DropdownMenuLink
              to={`/proposals/${proposalId}/provider/candid`}
              icon={<ArrowRightStartOnRectangleIcon />}
              alignIcon="right"
              key="candid"
            >
              Candid
            </DropdownMenuLink>
            <DropdownMenuLink
              to={`/proposals/${proposalId}/provider/charity-navigator`}
              icon={<ArrowRightStartOnRectangleIcon />}
              alignIcon="right"
              key="charity-navigator"
            >
              Charity Navigator
            </DropdownMenuLink>
          </DropdownMenu>
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
