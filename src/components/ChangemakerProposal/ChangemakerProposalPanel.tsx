import { useNavigate } from 'react-router-dom';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid';
import { ClosablePanel, PanelTitle } from '../Panel';
import { ProposalTable } from '../ProposalTable';
import { Button } from '../Button';

interface ChangemakerProposalPanelActionsProps {
	proposalId: string;
}

const ChangemakerProposalPanelActions = ({
	proposalId,
}: ChangemakerProposalPanelActionsProps) => {
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

interface ChangemakerProposalPanelProps {
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

const ChangemakerProposalPanel = ({
	proposalId,
	version,
	values,
	onClose,
	title = 'Untitled Proposal',
}: ChangemakerProposalPanelProps) => (
	<ClosablePanel
		title={<PanelTitle>{title}</PanelTitle>}
		onClose={onClose}
		padded={false}
		actions={<ChangemakerProposalPanelActions proposalId={proposalId} />}
	>
		<ProposalTable version={version} values={values} />
	</ClosablePanel>
);

export { ChangemakerProposalPanel };
