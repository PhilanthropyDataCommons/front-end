import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button } from '../Button';
import { Panel } from './Panel';
import { PanelHeader } from './PanelHeader';
import { PanelActions } from './PanelActions';
import { PanelTitleWrapper } from './PanelTitleWrapper';
import { PanelTitleTags } from './PanelTitleTags';
import { PanelBody } from './PanelBody';

interface ClosablePanelProps {
	children: React.ReactNode;
	onClose: () => void;
	title: React.ReactNode;
	tags?: React.ReactNode;
	/**
	 * Controls whether the panel body has internal padding.
	 */
	padded?: boolean;
	actions?: React.ReactNode;
}

const ClosablePanel = ({
	children,
	onClose,
	title,
	tags = undefined,
	padded = true,
	actions = undefined,
}: ClosablePanelProps) => (
	<Panel>
		<PanelHeader>
			<PanelTitleWrapper>{title}</PanelTitleWrapper>
			{tags && <PanelTitleTags> {tags} </PanelTitleTags>}
			<PanelActions>
				{actions}
				<Button onClick={onClose} color="red" title="Close this panel">
					<XMarkIcon className="icon" />
				</Button>
			</PanelActions>
		</PanelHeader>
		<PanelBody padded={padded}>{children}</PanelBody>
	</Panel>
);

export { ClosablePanel };
