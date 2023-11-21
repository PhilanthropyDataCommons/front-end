import React from 'react';
import './AddDataInstructions.css';
import { Panel, PanelBody } from './Panel';

interface AddDataInstructionsProps {
  children?: React.ReactNode;
}

export const AddDataInstructions = ({
  children = null,
}: AddDataInstructionsProps) => (
  <Panel>
    <PanelBody>
      <p>TODO: add data instructions</p>
      {children}
    </PanelBody>
  </Panel>
);
