import React from 'react';
import { ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/solid';
import {
  Panel,
  PanelActions,
  PanelBody,
  PanelHeader,
  PanelTitle,
  PanelTitleTags,
  PanelTitleWrapper,
} from '../Panel';
import { Button } from '../Button';
import { OffsiteLink } from '../OffsiteLink';
import { DataPlatformProviderTable } from './DataPlatformProviderTable';

interface DataPlatformProviderPanelProps {
  applicant: string;
  onClose: () => void;
  provider: string;
  url: string;
  values: {
    jsonPath: string,
    fieldName: string,
    value: string,
  }[];
}

const DataPlatformProviderPanel = ({
  applicant,
  onClose,
  provider,
  url,
  values,
}: DataPlatformProviderPanelProps) => (
  <Panel>
    <PanelHeader>
      <PanelTitleWrapper>
        <PanelTitle>
          {applicant}
        </PanelTitle>
        <PanelTitleTags>
          <OffsiteLink
            to={url}
            targetBlank
            className="panel-tag panel-tag--link"
          >
            <ArrowTopRightOnSquareIcon className="icon" />
            {`Open in ${provider}`}
          </OffsiteLink>
        </PanelTitleTags>
      </PanelTitleWrapper>
      <PanelActions>
        <Button
          onClick={onClose}
          color="red"
          title="Close data platform provider panel"
        >
          <XMarkIcon className="icon" />
        </Button>
      </PanelActions>
    </PanelHeader>
    <PanelBody>
      <DataPlatformProviderTable values={values} />
    </PanelBody>
  </Panel>
);

export { DataPlatformProviderPanel };
