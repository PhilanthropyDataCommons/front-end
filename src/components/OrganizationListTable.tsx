import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Organization, OrganizationBundle } from '@pdc/sdk';
import { TableRow, RowCell } from './Table';
import { ListTable } from './ListTable';

interface OrganizationListTableRowProps {
	organization: Organization;
}

const OrganizationListTableRow = ({
	organization,
}: OrganizationListTableRowProps) => {
	const navigate = useNavigate();

	const userHasNotSelectedText = () => {
		if (window.getSelection()?.isCollapsed) {
			navigate(`/organizations/${organization.id}`);
		}
	};

	const handleRowClick = () => {
		userHasNotSelectedText();
	};
	return (
		<TableRow onClick={handleRowClick}>
			<RowCell>{organization.name}</RowCell>
			<RowCell>{organization.taxId}</RowCell>
		</TableRow>
	);
};

const DEFAULT_ORGANIZATION_COLUMNS = ['Name', 'Tax ID'];

interface OrganizationListTableProps {
	organizations: OrganizationBundle;
	columns?: string[];
}

export const OrganizationListTable = ({
	organizations,
	columns = DEFAULT_ORGANIZATION_COLUMNS,
}: OrganizationListTableProps) => (
	<ListTable
		items={organizations.entries}
		columns={columns}
		renderItem={(organization) => (
			<OrganizationListTableRow
				organization={organization}
				key={organization.id}
			/>
		)}
	/>
);
