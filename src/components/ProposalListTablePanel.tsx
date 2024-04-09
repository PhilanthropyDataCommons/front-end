import React, { useState } from 'react';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import { Panel, PanelHeader, PanelBody, PanelActions } from './Panel';
import { ProposalListTable } from './ProposalListTable';
import { Button } from './Button';
import { Search } from './Search';

interface ProposalListTablePanelProps {
	fieldNames: Record<string, string>;
	proposals: FrontEndProposal[];
	onSearch: (query: string) => void;
	searchQuery?: string;
	loading?: boolean;
}

export const ProposalListTablePanel = ({
	fieldNames,
	proposals,
	onSearch,
	searchQuery = '',
	loading = false,
}: ProposalListTablePanelProps) => {
	const [wrap, setWrap] = useState(false);

	const handleWrapClick = () => setWrap((previous) => !previous);

	const hasProposals = proposals.length > 0;
	const hasSearchQuery = searchQuery !== '';

	const generateFallbackMessage = () => {
		if (hasSearchQuery) {
			return loading ? 'Searching…' : 'No search results for that query.';
		}

		return loading ? 'Loading…' : 'No data available.';
	};

	return (
		<Panel>
			<PanelHeader>
				<PanelActions>
					<Search onSearch={onSearch} initialQuery={searchQuery} />
				</PanelActions>
				{hasProposals && (
					<PanelActions>
						<Button onClick={handleWrapClick} color={wrap ? 'blue' : 'gray'}>
							<Bars3BottomLeftIcon className="icon" />
							Toggle wrapping
						</Button>
					</PanelActions>
				)}
			</PanelHeader>
			<PanelBody padded={!hasProposals}>
				{hasProposals ? (
					<ProposalListTable
						fieldNames={fieldNames}
						proposals={proposals}
						wrap={wrap}
					/>
				) : (
					<div className="quiet">{generateFallbackMessage()}</div>
				)}
			</PanelBody>
		</Panel>
	);
};
