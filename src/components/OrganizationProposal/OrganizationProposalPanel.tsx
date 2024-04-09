import React from 'react';
import { ClosablePanel, PanelTitle } from '../Panel';
import { ProposalTable } from '../ProposalTable';


interface OrganizationProposalPanelProps {
	version: number;
	values: {
		shortCode: string;
		fieldName: string;
		position: number;
		value: string;
	}[];
	onClose(): void;
	title?: string;
}

const OrganizationProposalPanel = ({
	version,
	values,
	onClose,
	title = 'Untitled Proposal',
}: OrganizationProposalPanelProps) => (
	<ClosablePanel
		title={<PanelTitle>{title}</PanelTitle>}
		onClose={onClose}
		padded={false}
	>
		<ProposalTable version={version} values={values} />
	</ClosablePanel>
);

export { OrganizationProposalPanel };
