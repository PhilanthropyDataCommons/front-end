import React from 'react';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import { Panel, PanelBody } from './Panel';
import { ProposalListGrid } from './ProposalListGrid';

interface ProposalListGridPanelProps {
	proposals: FrontEndProposal[];
	activeProposalId?: string | undefined;
}

export const ProposalListGridPanel = ({
	proposals,
	activeProposalId = undefined,
}: ProposalListGridPanelProps) => (
	<Panel>
		<PanelBody padded={false}>
			<ProposalListGrid
				proposals={proposals}
				activeProposalId={activeProposalId}
			/>
		</PanelBody>
	</Panel>
);
