import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { withOidcSecure } from '@axa-fr/react-oidc';
import { Organization } from '@pdc/sdk';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import {
	useOrganization,
	useOrganizations,
	ORGANIZATIONS_DEFAULT_PAGE,
	ORGANIZATIONS_DEFAULT_COUNT,
} from '../pdc-api';
import { OrganizationDetailPanel } from '../components/OrganizationDetailPanel';
import { OrganizationListGridPanel } from '../components/OrganizationListGridPanel';

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
	const params = useParams();
	const organizationId = params.organizationId ?? 'missing';
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

	if (organization === null) {
		const dummyOrganization: Organization = {
			id: 0,
			employerIdentificationNumber: '00-0000000',
			name: 'Loading...',
			createdAt: new Date('2024-03-06'),
		};
		return (
			<PanelGridItem key="detailPanel">
				<OrganizationDetailPanel organization={dummyOrganization} />
			</PanelGridItem>
		);
	}
	return (
		<PanelGridItem key="detailPanel">
			<OrganizationDetailPanel organization={organization} />
		</PanelGridItem>
	);
};

const OrganizationDetailLoader = () => (
	<PanelGrid sidebarred>
		<OrganizationListGridPanelLoader />
		<OrganizationDetailPanelLoader />
	</PanelGrid>
);

const OrganizationDetail = withOidcSecure(OrganizationDetailLoader);
export { OrganizationDetail };
