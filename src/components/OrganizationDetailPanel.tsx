import React from 'react';
import { useOidc } from '@axa-fr/react-oidc';
import {
	ArrowRightStartOnRectangleIcon,
	CircleStackIcon,
} from '@heroicons/react/24/outline';
import { Organization } from '@pdc/sdk';
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
import {
	Dropdown,
	DropdownMenu,
	DropdownMenuLink,
	DropdownMenuText,
	DropdownTrigger,
} from './Dropdown';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import {
	ProposalDetailDestinations,
	ProposalListTable,
} from './ProposalListTable';

interface OrganizationDetailPanelProps {
	organization: Organization;
	proposals: FrontEndProposal[];
	proposalFields: Record<string, string>;
	activeProposalId?: string | undefined;
}

const OrganizationDetailPanel = ({
	organization,
	proposals,
	proposalFields,
	activeProposalId = undefined,
}: OrganizationDetailPanelProps) => {
	const { id, name, employerIdentificationNumber } = organization;
	const { isAuthenticated } = useOidc();

	const showDataProviderMenu = isAuthenticated;
	const showProposalSection = isAuthenticated;

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
				<PanelActions>
					{showDataProviderMenu && (
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
									to={`/organizations/${id}/provider/candid`}
									icon={<ArrowRightStartOnRectangleIcon />}
									alignIcon="right"
									key="candid"
								>
									Candid
								</DropdownMenuLink>
								<DropdownMenuLink
									to={`/organizations/${id}/provider/charity-navigator`}
									icon={<ArrowRightStartOnRectangleIcon />}
									alignIcon="right"
									key="charity-navigator"
								>
									Charity Navigator
								</DropdownMenuLink>
							</DropdownMenu>
						</Dropdown>
					)}
				</PanelActions>
			</PanelHeader>
			<PanelBody>
				{showProposalSection && (
					<section id="organization-proposals">
						<h2>Proposals</h2>
						{proposals.length > 0 ? (
							<ProposalListTable
								fieldNames={proposalFields}
								proposals={proposals}
								rowClickDestination={
									ProposalDetailDestinations.ORGANIZATION_PROPOSAL_PANEL
								}
								organizationId={id}
								activeProposalId={activeProposalId}
							/>
						) : (
							<p className="quiet">
								There are no proposals linked to this organization.
							</p>
						)}
					</section>
				)}
			</PanelBody>
		</Panel>
	);
};

export { OrganizationDetailPanel };
