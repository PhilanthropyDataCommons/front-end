import { useEffect } from 'react';
import { Changemaker } from '@pdc/sdk';
import { useBaseFields, useProposal } from '../../pdc-api';
import { mapProposalBaseFields, getTitle } from '../../utils/proposalFields';
import { ChangemakerProposalPanel } from './ChangemakerProposalPanel';

interface ChangemakerProposalLoaderProps {
	changemaker: Changemaker;
	proposalId: string;
	onClose: () => void;
}

const ChangemakerProposalLoader = ({
	changemaker,
	proposalId,
	onClose,
}: ChangemakerProposalLoaderProps) => {
	const [baseFields] = useBaseFields();
	const [proposal] = useProposal(proposalId);
	useEffect(() => {
		document.title = `${changemaker.name} Proposal Detail - Philanthropy Data Commons`;
		return () => {
			document.title = 'Philanthropy Data Commons';
		};
	}, [changemaker.name]);

	if (baseFields === null || proposal === null) {
		return (
			<ChangemakerProposalPanel
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
		<ChangemakerProposalPanel
			proposalId={proposalId}
			version={version}
			values={values}
			onClose={onClose}
			title={title}
		/>
	);
};

export { ChangemakerProposalLoader };
