import React from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import {
	Panel,
	PanelBody,
	PanelHeader,
	PanelTag,
	PanelTitle,
	PanelTitleTags,
	PanelTitleWrapper,
} from './Panel';
import { ProposalTable } from './ProposalTable';

interface ProposalDetailPanelProps {
	title: string | undefined;
	applicant: string;
	applicantId: string | undefined;
	version: number;
	values: {
		shortCode: string;
		fieldName: string;
		position: number;
		value: string;
	}[];
}

const ProposalDetailPanel = ({
	title,
	applicant,
	applicantId,
	version,
	values,
}: ProposalDetailPanelProps) => (
	<Panel>
		<PanelHeader>
			<PanelTitleWrapper>
				<PanelTitle>{applicant}</PanelTitle>
				<PanelTitleTags>
					{applicantId && <PanelTag badge="EIN">{applicantId}</PanelTag>}
					{title && <PanelTag icon={<DocumentTextIcon />}>{title}</PanelTag>}
				</PanelTitleTags>
			</PanelTitleWrapper>
		</PanelHeader>
		<PanelBody padded={false}>
			<ProposalTable version={version} values={values} />
		</PanelBody>
	</Panel>
);

export { ProposalDetailPanel };
