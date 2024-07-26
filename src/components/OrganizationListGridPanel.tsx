import { OrganizationBundle } from '@pdc/sdk';
import { Panel, PanelBody } from './Panel';
import { OrganizationListGrid } from './OrganizationListGrid';

interface OrganizationListGridPanelProps {
	organizations: OrganizationBundle;
	activeOrganizationId?: string | undefined;
}

export const OrganizationListGridPanel = ({
	organizations,
	activeOrganizationId = undefined,
}: OrganizationListGridPanelProps) => (
	<Panel>
		<PanelBody padded={false}>
			<OrganizationListGrid
				organizations={organizations}
				activeOrganizationId={activeOrganizationId}
			/>
		</PanelBody>
	</Panel>
);
