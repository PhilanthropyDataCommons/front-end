import { useEffect } from 'react';
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

export { OrganizationListLoader as OrganizationList };
