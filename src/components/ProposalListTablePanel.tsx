import React, { useState } from 'react';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import { Panel, PanelHeader, PanelBody, PanelActions } from './Panel';
import { ProposalListTable } from './ProposalListTable';
import { Search } from './Search';
import { ToggleSwitch } from './ToggleSwitch';

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

	const handleWrapChange = () => setWrap((previous) => !previous);

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
					<PanelActions className="switches">
						<ToggleSwitch checked={wrap} onChange={handleWrapChange}>
							Wrap long text
						</ToggleSwitch>
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
