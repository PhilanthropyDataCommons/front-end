import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';
import { Changemaker, Source } from '@pdc/sdk';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import { mapProposals } from '../map-proposals';
import { mapFieldNames } from '../utils/baseFields';
import { DataPlatformProviderLoader } from '../components/DataPlatformProvider/DataPlatformProviderLoader';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import {
	useChangemaker,
	useChangemakers,
	CHANGEMAKERS_DEFAULT_PAGE,
	CHANGEMAKERS_DEFAULT_COUNT,
	PROPOSALS_DEFAULT_PAGE,
	PROPOSALS_DEFAULT_COUNT,
	SOURCES_DEFAULT_PAGE,
	SOURCES_DEFAULT_COUNT,
	useBaseFields,
	useProposalsByChangemakerId,
	useSources,
} from '../pdc-api';
import { ChangemakerDetailPanel } from '../components/ChangemakerDetailPanel';
import { ChangemakerListGridPanel } from '../components/ChangemakerListGridPanel';
import { ChangemakerProposalLoader } from '../components/ChangemakerProposal/ChangemakerProposalLoader';
import {
	ProposalListTable,
	ProposalDetailDestinations,
} from '../components/ProposalListTable';
import { ChangemakerFieldsTable } from '../components/ChangemakerFieldsTable';

interface ChangemakerProposalsTableLoaderProps {
	changemaker: Changemaker;
	changemakerId: string;
	activeProposalId?: string | undefined;
}

const ChangemakerProposalsTableLoader = ({
	changemaker,
	changemakerId,
	activeProposalId = undefined,
}: ChangemakerProposalsTableLoaderProps) => {
	const emptyProposalArray: FrontEndProposal[] = [];
	const [proposalState, setProposalState] = useState(emptyProposalArray);
	const emptyRecord: Record<string, string> = {};
	const [fieldsState, setFieldsState] = useState(emptyRecord);

	const [fields] = useBaseFields();
	const [proposals] = useProposalsByChangemakerId(
		PROPOSALS_DEFAULT_PAGE,
		PROPOSALS_DEFAULT_COUNT,
		changemakerId,
	);
	useEffect(() => {
		if (fields && proposals) {
			setFieldsState(mapFieldNames(fields));
			setProposalState(mapProposals(fields, proposals.entries));
		}

		return () => {};
	}, [fields, proposals]);

	return (
		<section id="changemaker-proposals">
			<h2>Changemaker Fields</h2>
			<ChangemakerFieldsTable changemaker={changemaker} />
			<h2>Proposals</h2>
			{proposalState.length > 0 ? (
				<ProposalListTable
					fieldNames={fieldsState}
					proposals={proposalState}
					rowClickDestination={
						ProposalDetailDestinations.CHANGEMAKER_PROPOSAL_PANEL
					}
					changemakerId={changemaker.id}
					activeProposalId={activeProposalId}
				/>
			) : (
				<p className="quiet">
					There are no proposals linked to this changemaker.
				</p>
			)}
		</section>
	);
};

const ChangemakerListGridPanelLoader = () => {
	const { changemakerId } = useParams();
	const [changemakers] = useChangemakers(
		CHANGEMAKERS_DEFAULT_PAGE,
		CHANGEMAKERS_DEFAULT_COUNT,
	);

	if (changemakers === null) {
		return <div>Loading data...</div>;
	}

	return (
		<PanelGridItem key="detailPanel">
			<ChangemakerListGridPanel
				changemakers={changemakers}
				activeChangemakerId={changemakerId}
			/>
		</PanelGridItem>
	);
};

const ChangemakerDetailPanelLoader = () => {
	const { isAuthenticated } = useOidc();
	const navigate = useNavigate();
	const params = useParams();
	const { provider, changemakerId = 'missing', proposalId } = params;

	const canSeeProviderPanel = isAuthenticated;
	const canSeeProposalPanel = isAuthenticated;

	const [changemaker] = useChangemaker(changemakerId);

	useEffect(() => {
		if (changemaker === null) {
			document.title = 'Loading... - Philanthropy Data Commons';
		} else {
			document.title = `${changemaker.name} Changemaker Detail - Philanthropy Data Commons`;
		}

		return () => {
			document.title = 'Philanthropy Data Commons';
		};
	}, [changemaker]);

	const showProviderPanel = provider && canSeeProviderPanel;
	const showProposalPanel = proposalId && canSeeProposalPanel;

	if (changemaker === null) {
		const dummyChangemaker: Changemaker = {
			id: 0,
			taxId: '00-0000000',
			name: 'Loading...',
			createdAt: new Date('2024-03-06').toISOString(),
			fields: [],
		};

		return (
			<>
				<PanelGridItem key="detailPanel">
					<ChangemakerDetailPanel changemaker={dummyChangemaker} />
				</PanelGridItem>
				{showProviderPanel && (
					<PanelGridItem key="platformPanel">
						<DataPlatformProviderLoader
							externalId={undefined}
							onClose={() => {
								navigate(`/changemakers/${changemakerId}`);
							}}
							provider={provider}
						/>
					</PanelGridItem>
				)}
			</>
		);
	}

	return (
		<>
			<PanelGridItem key="detailPanel">
				<ChangemakerDetailPanel changemaker={changemaker}>
					{isAuthenticated && (
						<ChangemakerProposalsTableLoader
							changemaker={changemaker}
							changemakerId={changemakerId}
							activeProposalId={proposalId}
						/>
					)}
				</ChangemakerDetailPanel>
			</PanelGridItem>
			{showProviderPanel && (
				<PanelGridItem key="platformPanel">
					<DataPlatformProviderLoader
						provider={provider}
						externalId={changemaker.taxId}
						onClose={() => {
							navigate(`/changemakers/${changemakerId}`);
						}}
					/>
				</PanelGridItem>
			)}
			{showProposalPanel && (
				<PanelGridItem key="proposalPanel">
					<ChangemakerProposalLoader
						proposalId={proposalId}
						changemaker={changemaker}
						onClose={() => {
							navigate(`/changemakers/${changemakerId}`);
						}}
					/>
				</PanelGridItem>
			)}
		</>
	);
};

const ChangemakerDetailLoader = () => (
	<PanelGrid sidebarred>
		<ChangemakerListGridPanelLoader />
		<ChangemakerDetailPanelLoader />
	</PanelGrid>
);

export { ChangemakerDetailLoader as ChangemakerDetail };
