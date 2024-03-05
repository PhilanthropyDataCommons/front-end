import React from 'react';
import { Link } from 'react-router-dom';
import { Organization, OrganizationBundle } from '@pdc/sdk';
import { ListGrid } from './ListGrid';
import './ListGridItem.css';

interface OrganizationListGridItemProps {
	organization: Organization;
	active?: boolean;
}

const OrganizationListGridItem = ({
	organization,
	active = false,
}: OrganizationListGridItemProps) => (
	<Link
		to={`/organizations/${organization.id}`}
		className={`list-grid-item ${active ? 'active' : ''}`.trim()}
	>
		<div className="list-grid-item-title">{organization.name}</div>
		<div className="list-grid-item-organization-ein">
			{organization.employerIdentificationNumber}
		</div>
	</Link>
);

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
			<OrganizationListGridItem
				organization={organization}
				active={String(organization.id) === activeOrganizationId}
				key={organization.id}
			/>
		)}
	/>
);
