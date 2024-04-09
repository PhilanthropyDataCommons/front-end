import React, { useEffect } from 'react';
import { withOidcSecure } from '@axa-fr/react-oidc';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
	PROPOSALS_DEFAULT_COUNT,
	PROPOSALS_DEFAULT_PAGE,
	PROPOSALS_DEFAULT_QUERY,
	useBaseFields,
	useProposals,
} from '../pdc-api';
import { mapProposals } from '../map-proposals';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { ProposalListTablePanel } from '../components/ProposalListTablePanel';
import { mapFieldNames } from '../utils/baseFields';

const ProposalListLoader = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const page = params.get('page') ?? PROPOSALS_DEFAULT_PAGE;
	const count = params.get('count') ?? PROPOSALS_DEFAULT_COUNT;
	const query = params.get('q') ?? PROPOSALS_DEFAULT_QUERY;
	const [fields] = useBaseFields();
	const [proposals] = useProposals(page, count, query);

	useEffect(() => {
		document.title = 'Proposal List - Philanthropy Data Commons';
	}, []);

	const handleSearch = (q: string) => navigate(`/proposals?q=${q}`);

	if (fields === null || proposals === null) {
		return (
			<PanelGrid>
				<PanelGridItem>
					<ProposalListTablePanel
						fieldNames={{}}
						proposals={[]}
						searchQuery={query}
						onSearch={handleSearch}
						loading
					/>
				</PanelGridItem>
			</PanelGrid>
		);
	}

	const mappedProposals = mapProposals(fields, proposals.entries);

	return (
		<PanelGrid>
			<PanelGridItem>
				<ProposalListTablePanel
					fieldNames={mapFieldNames(fields)}
					proposals={mappedProposals}
					searchQuery={query}
					onSearch={handleSearch}
				/>
			</PanelGridItem>
		</PanelGrid>
	);
};

const ProposalList = withOidcSecure(ProposalListLoader);
export { ProposalList };
