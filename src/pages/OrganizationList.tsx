import React, { useEffect } from 'react';
import { withOidcSecure } from '@axa-fr/react-oidc';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { OrganizationListTablePanel } from '../components/OrganizationListTablePanel';
import {
	ORGANIZATIONS_DEFAULT_COUNT,
	ORGANIZATIONS_DEFAULT_PAGE,
	useOrganizations,
} from '../pdc-api';

const OrganizationListLoader = () => {
	const [organizations] = useOrganizations(
		ORGANIZATIONS_DEFAULT_PAGE,
		ORGANIZATIONS_DEFAULT_COUNT,
	);

	useEffect(() => {
		document.title = 'Organizations - Philanthropy Data Commons';
	}, []);

	if (organizations === null) {
		return (
			<PanelGrid>
				<PanelGridItem>
					<OrganizationListTablePanel loading />
				</PanelGridItem>
			</PanelGrid>
		);
	}

	return (
		<PanelGrid>
			<PanelGridItem>
				<OrganizationListTablePanel organizations={organizations} />
			</PanelGridItem>
		</PanelGrid>
	);
};

const OrganizationList = withOidcSecure(OrganizationListLoader);
export { OrganizationList };
