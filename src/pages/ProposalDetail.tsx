import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { BaseField, Proposal } from '@pdc/sdk';
import {
	PROPOSALS_DEFAULT_COUNT,
	PROPOSALS_DEFAULT_PAGE,
	PROPOSALS_DEFAULT_QUERY,
	useBaseFields,
	useProposal,
	useProposals,
} from '../pdc-api';
import { mapProposals } from '../map-proposals';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { ProposalDetailPanel } from '../components/ProposalDetailPanel';
import { ProposalListGridPanel } from '../components/ProposalListGridPanel';
import {
	PROPOSAL_APPLICANT_NAME_CASCADE,
	PROPOSAL_APPLICANT_NAME_FALLBACK,
} from '../utils/proposals';
import {
	mapProposalBaseFields,
	getValueOfBaseField,
	getTitle,
} from '../utils/proposalFields';

interface ProposalListGridLoaderProps {
	baseFields: BaseField[] | null;
}

const ProposalListGridLoader = ({
	baseFields,
}: ProposalListGridLoaderProps) => {
	const { proposalId } = useParams();

	const [proposals] = useProposals(
		PROPOSALS_DEFAULT_PAGE,
		PROPOSALS_DEFAULT_COUNT,
		PROPOSALS_DEFAULT_QUERY,
	);

	if (baseFields === null || proposals === null) {
		return <div>Loading data...</div>;
	}

	return (
		<PanelGridItem>
			<ProposalListGridPanel
				proposals={mapProposals(baseFields, proposals.entries)}
				activeProposalId={proposalId}
			/>
		</PanelGridItem>
	);
};

const getApplicant = (baseFields: BaseField[], proposal: Proposal) => {
	const applicantNameKey = PROPOSAL_APPLICANT_NAME_CASCADE.find((key) => {
		const baseFieldValue = getValueOfBaseField(baseFields, proposal, key);
		return (
			typeof baseFieldValue !== 'undefined' && baseFieldValue.trim() !== ''
		);
	});

	return applicantNameKey
		? (getValueOfBaseField(baseFields, proposal, applicantNameKey) ??
				PROPOSAL_APPLICANT_NAME_FALLBACK)
		: PROPOSAL_APPLICANT_NAME_FALLBACK;
};

interface ProposalDetailPanelLoaderProps {
	baseFields: BaseField[] | null;
}

const ProposalDetailPanelLoader = ({
	baseFields,
}: ProposalDetailPanelLoaderProps) => {
	const params = useParams();
	const { proposalId = 'missing' } = params;
	const [proposal] = useProposal(proposalId);

	useEffect(() => {
		if (baseFields === null || proposal === null) {
			document.title = 'Proposal Detail - Philanthropy Data Commons';
		} else {
			const applicant = getApplicant(baseFields, proposal);
			document.title = `${applicant} Proposal Detail - Philanthropy Data Commons`;
		}
		return () => {
			document.title = 'Philanthropy Data Commons';
		};
	}, [baseFields, proposal]);

	if (baseFields === null || proposal === null) {
		return (
			<PanelGridItem key="detailPanel">
				<ProposalDetailPanel
					title="Loading..."
					applicant="Loading..."
					applicantId="00-0000000"
					version={0}
					values={[]}
				/>
			</PanelGridItem>
		);
	}

	const title = getTitle(baseFields, proposal);
	const applicant = getApplicant(baseFields, proposal);
	const applicantId = getValueOfBaseField(
		baseFields,
		proposal,
		'organization_tax_id',
	);
	const version = proposal.versions[0]?.version ?? 0;
	const values = mapProposalBaseFields(baseFields, proposal);

	return (
		<PanelGridItem key="detailPanel">
			<ProposalDetailPanel
				title={title}
				applicant={applicant}
				applicantId={applicantId}
				version={version}
				values={values}
			/>
		</PanelGridItem>
	);
};

const ProposalDetailLoader = () => {
	const [baseFields] = useBaseFields();

	return (
		<PanelGrid sidebarred>
			<ProposalListGridLoader baseFields={baseFields} />
			<ProposalDetailPanelLoader baseFields={baseFields} />
		</PanelGrid>
	);
};

export { ProposalDetailLoader as ProposalDetail };
