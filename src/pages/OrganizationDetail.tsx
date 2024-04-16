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

	const emptyProposalArray: FrontEndProposal[] = [];
	const [proposalState, setProposalState] = useState(emptyProposalArray);
	const emptyRecord: Record<string, string> = {};
	const [fieldsState, setFieldsState] = useState(emptyRecord);

	const canSeeProviderPanel = isAuthenticated;
	const canSeeProposalPanel = isAuthenticated;

	const [organization] = useOrganization(organizationId);
	const [fields] = useBaseFields();
	const [proposals] = useProposalsByOrganizationId(
		PROPOSALS_DEFAULT_PAGE,
		PROPOSALS_DEFAULT_COUNT,
		organizationId,
	);

	useEffect(() => {
		if (organization === null) {
			document.title = 'Loading... - Philanthropy Data Commons';
		} else {
			document.title = `${organization.name} Organization Detail - Philanthropy Data Commons`;
		}
		if (fields && proposals) {
			setFieldsState(mapFieldNames(fields));
			setProposalState(mapProposals(fields, proposals.entries));
		}

		return () => {
			document.title = 'Philanthropy Data Commons';
		};
	}, [fields, proposals, organization]);

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
					<OrganizationDetailPanel
						organization={dummyOrganization}
						proposals={proposalState}
						proposalFields={fieldsState}
					/>
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
				<OrganizationDetailPanel
					organization={organization}
					proposals={proposalState}
					proposalFields={fieldsState}
					activeProposalId={proposalId}
				/>
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
