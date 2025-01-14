import { useNavigate } from 'react-router-dom';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid';
import { ClosablePanel, PanelTag, PanelTitle } from '../Panel';
import { ProposalTable } from '../ProposalTable';
import { Button } from '../Button';
import { getLogger } from '../../logger';

const logger = getLogger('ChangemakerProposalPanel');

interface ChangemakerProposalPanelActionsProps {
	proposalId: string;
}

const ChangemakerProposalPanelActions = ({
	proposalId,
}: ChangemakerProposalPanelActionsProps) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/proposals/${proposalId}`)?.catch(logger.error);
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
	source: string | undefined;
	onClose: () => void;
	title?: string;
}

const ChangemakerProposalPanel = ({
	proposalId,
	version,
	values,
	source,
	onClose,
	title = 'Untitled Proposal',
}: ChangemakerProposalPanelProps) => (
	<ClosablePanel
		title={<PanelTitle>{title}</PanelTitle>}
		onClose={onClose}
		padded={false}
		actions={<ChangemakerProposalPanelActions proposalId={proposalId} />}
		tags={source ? <PanelTag badge="Source">{source}</PanelTag> : undefined}
	>
		<ProposalTable version={version} values={values} />
	</ClosablePanel>
);

export { ChangemakerProposalPanel };
