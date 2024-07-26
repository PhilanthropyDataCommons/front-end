import { useNavigate } from 'react-router-dom';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid';
import { ClosablePanel, PanelTitle } from '../Panel';
import { ProposalTable } from '../ProposalTable';
import { Button } from '../Button';

interface OrganizationProposalPanelActionsProps {
	proposalId: string;
}

const OrganizationProposalPanelActions = ({
	proposalId,
}: OrganizationProposalPanelActionsProps) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/proposals/${proposalId}`);
	};
	return (
		<Button
			onClick={handleClick}
			color="gray"
			title="Expand proposal to full page"
		>
			<ArrowsPointingOutIcon className="icon" />
		</Button>
	);
};

interface OrganizationProposalPanelProps {
	proposalId: string;
	version: number;
	values: {
		shortCode: string;
		fieldName: string;
		position: number;
		value: string;
	}[];
	onClose: () => void;
	title?: string;
}

const OrganizationProposalPanel = ({
	proposalId,
	version,
	values,
	onClose,
	title = 'Untitled Proposal',
}: OrganizationProposalPanelProps) => (
	<ClosablePanel
		title={<PanelTitle>{title}</PanelTitle>}
		onClose={onClose}
		padded={false}
		actions={<OrganizationProposalPanelActions proposalId={proposalId} />}
	>
		<ProposalTable version={version} values={values} />
	</ClosablePanel>
);

export { OrganizationProposalPanel };
