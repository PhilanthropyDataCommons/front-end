import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button } from '../Button';
import { Panel } from './Panel';
import { PanelHeader } from './PanelHeader';
import { PanelActions } from './PanelActions';
import { PanelTitleWrapper } from './PanelTitleWrapper';
import { PanelBody } from './PanelBody';

interface ClosablePanelProps {
  children: React.ReactNode;
  onClose: () => void;
  title: React.ReactNode;
}

const ClosablePanel = ({
  children,
  onClose,
  title,
}: ClosablePanelProps) => (
  <Panel>
    <PanelHeader>
      <PanelTitleWrapper>
        {title}
      </PanelTitleWrapper>
      <PanelActions>
        <Button
          onClick={onClose}
          color="red"
          title="Close this panel"
        >
          <XMarkIcon className="icon" />
        </Button>
      </PanelActions>
    </PanelHeader>
    <PanelBody>
      {children}
    </PanelBody>
  </Panel>
);

export { ClosablePanel };
