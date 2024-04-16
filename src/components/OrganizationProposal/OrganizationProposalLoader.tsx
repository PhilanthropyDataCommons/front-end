import React, { useEffect } from 'react';
import { Organization } from '@pdc/sdk';
import { useBaseFields, useProposal } from '../../pdc-api';
import { OrganizationProposalPanel } from './OrganizationProposalPanel';
import { mapProposalBaseFields, getTitle } from '../../utils/proposalFields';

interface OrganizationProposalLoaderProps {
	organization: Organization;
	proposalId: string;
	onClose(): void;
}
const OrganizationProposalLoader = ({
	organization,
	proposalId,
	onClose,
}: OrganizationProposalLoaderProps) => {
	const [baseFields] = useBaseFields();
	const [proposal] = useProposal(proposalId);
	useEffect(() => {
		document.title = `${organization.name} Proposal Detail - Philanthropy Data Commons`;
		return () => {
			document.title = 'Philanthropy Data Commons';
		};
	}, [organization.name]);

	if (baseFields === null || proposal === null) {
		return (
			<OrganizationProposalPanel
				proposalId={proposalId}
				version={0}
				values={[]}
				onClose={onClose}
			/>
		);
	}

	const version = proposal.versions[0]?.version ?? 0;
	const values = mapProposalBaseFields(baseFields, proposal);
	const title = getTitle(baseFields, proposal);

	return (
		<OrganizationProposalPanel
			proposalId={proposalId}
			version={version}
			values={values}
			onClose={onClose}
			title={title}
		/>
	);
};

export { OrganizationProposalLoader };
