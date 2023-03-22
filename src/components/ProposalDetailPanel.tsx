import React from 'react';
import { BuildingLibraryIcon, DocumentIcon } from '@heroicons/react/24/solid';
import {
  Panel,
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
  version: number;
  values: {
    fieldName: string,
    position: number,
    value: string,
  }[],
}

const ProposalDetailPanel = ({
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
            <PanelTag>
              <BuildingLibraryIcon className="icon" />
              {applicantId}
            </PanelTag>
          )}
          {title && (
            <PanelTag>
              <DocumentIcon className="icon" />
              {title}
            </PanelTag>
          )}
        </PanelTitleTags>
      </PanelTitleWrapper>
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
