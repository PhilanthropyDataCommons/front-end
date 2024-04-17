import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';
import { Organization } from '@pdc/sdk';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import { mapProposals } from '../map-proposals';
import { mapFieldNames } from '../utils/baseFields';
import { DataPlatformProviderLoader } from '../components/DataPlatformProvider/DataPlatformProviderLoader';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import {
	useOrganization,
	useOrganizations,
	ORGANIZATIONS_DEFAULT_PAGE,
	ORGANIZATIONS_DEFAULT_COUNT,
	PROPOSALS_DEFAULT_PAGE,
	PROPOSALS_DEFAULT_COUNT,
	useBaseFields,
	useProposalsByOrganizationId,
} from '../pdc-api';
import { OrganizationDetailPanel } from '../components/OrganizationDetailPanel';
import { OrganizationListGridPanel } from '../components/OrganizationListGridPanel';
import { OrganizationProposalLoader } from '../components/OrganizationProposal/OrganizationProposalLoader';
import {
	ProposalListTable,
	ProposalDetailDestinations,
} from '../components/ProposalListTable';

interface OrganizationProposalsTableLoaderProps {
	organization: Organization;
	organizationId: string;
	activeProposalId?: string | undefined;
}

const OrganizationProposalsTableLoader = ({
	organization,
	organizationId,
	activeProposalId = undefined,
}: OrganizationProposalsTableLoaderProps) => {
	const emptyProposalArray: FrontEndProposal[] = [];
	const [proposalState, setProposalState] = useState(emptyProposalArray);
	const emptyRecord: Record<string, string> = {};
	const [fieldsState, setFieldsState] = useState(emptyRecord);

	const [fields] = useBaseFields();
	const [proposals] = useProposalsByOrganizationId(
		PROPOSALS_DEFAULT_PAGE,
		PROPOSALS_DEFAULT_COUNT,
		organizationId,
	);
	useEffect(() => {
		if (fields && proposals) {
			setFieldsState(mapFieldNames(fields));
			setProposalState(mapProposals(fields, proposals.entries));
		}

		return () => {};
	}, [fields, proposals]);

	return (
		<section id="organization-proposals">
			<h2>Proposals</h2>
			{proposalState.length > 0 ? (
				<ProposalListTable
					fieldNames={fieldsState}
					proposals={proposalState}
					rowClickDestination={
						ProposalDetailDestinations.ORGANIZATION_PROPOSAL_PANEL
					}
					organizationId={organization.id}
					activeProposalId={activeProposalId}
				/>
			) : (
				<p className="quiet">
					There are no proposals linked to this organization.
				</p>
			)}
		</section>
	);
};

const OrganizationListGridPanelLoader = () => {
	const { organizationId } = useParams();
	const [organizations] = useOrganizations(
		ORGANIZATIONS_DEFAULT_PAGE,
		ORGANIZATIONS_DEFAULT_COUNT,
	);

	if (organizations === null) {
		return <div>Loading data...</div>;
	}

	return (
		<PanelGridItem key="detailPanel">
			<OrganizationListGridPanel
				organizations={organizations}
				activeOrganizationId={organizationId}
			/>
		</PanelGridItem>
	);
};

const OrganizationDetailPanelLoader = () => {
	const { isAuthenticated } = useOidc();
	const navigate = useNavigate();
	const params = useParams();
	const { provider, organizationId = 'missing', proposalId } = params;

	const canSeeProviderPanel = isAuthenticated;
	const canSeeProposalPanel = isAuthenticated;

	const [organization] = useOrganization(organizationId);

	useEffect(() => {
		if (organization === null) {
			document.title = 'Loading... - Philanthropy Data Commons';
		} else {
			document.title = `${organization.name} Organization Detail - Philanthropy Data Commons`;
		}

		return () => {
			document.title = 'Philanthropy Data Commons';
		};
	}, [organization]);

	const showProviderPanel = provider && canSeeProviderPanel;
	const showProposalPanel = proposalId && canSeeProposalPanel;

	if (organization === null) {
		const dummyOrganization: Organization = {
			id: 0,
			employerIdentificationNumber: '00-0000000',
			name: 'Loading...',
			createdAt: new Date('2024-03-06'),
		};

		return (
			<>
				<PanelGridItem key="detailPanel">
					<OrganizationDetailPanel organization={dummyOrganization} />
				</PanelGridItem>
				{showProviderPanel && (
					<PanelGridItem key="platformPanel">
						<DataPlatformProviderLoader
							externalId={undefined}
							onClose={() => {
								navigate(`/organizations/${organizationId}`);
							}}
							provider={provider}
						/>
					</PanelGridItem>
				)}
			</>
		);
	}

	return (
		<>
			<PanelGridItem key="detailPanel">
				<OrganizationDetailPanel organization={organization}>
					{isAuthenticated && (
						<OrganizationProposalsTableLoader
							organization={organization}
							organizationId={organizationId}
							activeProposalId={proposalId}
						/>
					)}
				</OrganizationDetailPanel>
			</PanelGridItem>
			{showProviderPanel && (
				<PanelGridItem key="platformPanel">
					<DataPlatformProviderLoader
						provider={provider}
						externalId={organization.employerIdentificationNumber}
						onClose={() => {
							navigate(`/organizations/${organizationId}`);
						}}
					/>
				</PanelGridItem>
			)}
			{showProposalPanel && (
				<PanelGridItem key="proposalPanel">
					<OrganizationProposalLoader
						proposalId={proposalId}
						organization={organization}
						onClose={() => {
							navigate(`/organizations/${organizationId}`);
						}}
					/>
				</PanelGridItem>
			)}
		</>
	);
};

const OrganizationDetailLoader = () => (
	<PanelGrid sidebarred>
		<OrganizationListGridPanelLoader />
		<OrganizationDetailPanelLoader />
	</PanelGrid>
);

export { OrganizationDetailLoader as OrganizationDetail };
