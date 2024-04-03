import React from 'react';
import { OrganizationBundle } from '@pdc/sdk';
import {
	ListGrid,
	ListGridItem,
	ListGridItemDetails,
	ListGridItemTitle,
} from './ListGrid';

interface OrganizationListGridProps {
	organizations: OrganizationBundle;
	activeOrganizationId?: string | undefined;
}

export const OrganizationListGrid = ({
	organizations,
	activeOrganizationId = undefined,
}: OrganizationListGridProps) => (
	<ListGrid
		items={organizations.entries}
		renderItem={(organization) => (
			<ListGridItem
				linkTo={`/organizations/${organization.id}`}
				active={String(organization.id) === activeOrganizationId}
				key={organization.id}
			>
				<ListGridItemTitle>{organization.name}</ListGridItemTitle>
				<ListGridItemDetails>
					{organization.employerIdentificationNumber}
				</ListGridItemDetails>
			</ListGridItem>
		)}
	/>
);
