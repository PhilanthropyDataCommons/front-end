import React from 'react';
import { Organization } from '@pdc/sdk';
import {
	Panel,
	PanelHeader,
	PanelTag,
	PanelTitle,
	PanelTitleTags,
	PanelTitleWrapper,
} from './Panel';
import { PanelGridItem } from './PanelGrid';
import { ProposalListTable } from './ProposalListTable';
import { DEFAULT_COLUMNS } from './ProposalListTablePanel';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';

interface OrganizationDetailPanelProps {
	organization: Organization;
	proposals?: FrontEndProposal[];
	proposalFields?: Record<string, string>;
}

const OrganizationDetailPanel = ({
	organization,
	proposals = undefined,
	proposalFields = undefined,
}: OrganizationDetailPanelProps) => {
	const { name, employerIdentificationNumber } = organization;
	const hasProposals = proposalFields && proposals;
	return (
		<Panel>
			<PanelHeader>
				<PanelTitleWrapper>
					<PanelTitle>{name}</PanelTitle>
					<PanelTitleTags>
						{employerIdentificationNumber && (
							<PanelTag badge="EIN">{employerIdentificationNumber}</PanelTag>
						)}
					</PanelTitleTags>
				</PanelTitleWrapper>
			</PanelHeader>
			<PanelGridItem>
				{hasProposals && (
					<ProposalListTable
						fieldNames={proposalFields}
						proposals={proposals}
						columns={DEFAULT_COLUMNS}
					/>
				)}
			</PanelGridItem>
		</Panel>
	);
};

export { OrganizationDetailPanel };
