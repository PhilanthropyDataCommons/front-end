import { OrganizationBundle } from '@pdc/sdk';
import { Panel, PanelBody } from './Panel';
import { OrganizationListTable } from './OrganizationListTable';

interface OrganizationListTablePanelProps {
	organizations?: OrganizationBundle;
	loading?: boolean;
}

export const OrganizationListTablePanel = ({
	organizations = undefined,
	loading = false,
}: OrganizationListTablePanelProps) => {
	const generateFallbackMessage = () =>
		loading ? 'Loading…' : 'No data available.';

	const hasOrganizations =
		organizations !== undefined && organizations.entries.length > 0;

	return (
		<Panel>
			<PanelBody padded={!hasOrganizations}>
				{hasOrganizations ? (
					<OrganizationListTable organizations={organizations} />
				) : (
					<div className="quiet">{generateFallbackMessage()}</div>
				)}
			</PanelBody>
		</Panel>
	);
};
