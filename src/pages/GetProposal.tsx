import React from 'react';
import { ArrowsRightLeftIcon, UsersIcon } from '@heroicons/react/24/solid';
import { RectangleStackIcon } from '@heroicons/react/24/outline';
import {
  Panel,
  PanelHeader,
  PanelActions,
  PanelTitleWrapper,
  PanelTitle,
  PanelTitleTags,
  PanelTag,
  PanelBody,
} from '../components/Panel';
import { Button } from '../components/Button';
import { ProposalTable } from '../components/ProposalTable';

const GetProposal = () => (
  <Panel>
    <PanelHeader>
      <PanelTitleWrapper>
        <PanelTitle>[Proposal Title]</PanelTitle>
        <PanelTitleTags>
          <PanelTag>
            <UsersIcon className="icon" />
            [Organization Name] ([EIN])
          </PanelTag>
          <PanelTag>
            <ArrowsRightLeftIcon className="icon" />
            [Data Source]
          </PanelTag>
        </PanelTitleTags>
      </PanelTitleWrapper>
      <PanelActions>
        <Button>
          <RectangleStackIcon className="icon" />
          History
        </Button>
      </PanelActions>
    </PanelHeader>
    <PanelBody>
      <ProposalTable />
    </PanelBody>
  </Panel>
);

export { GetProposal };
