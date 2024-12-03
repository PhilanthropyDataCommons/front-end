import { BuildingOffice2Icon } from '@heroicons/react/24/solid';
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
	title: string;
	applicant: string;
	applicantId: string | undefined;
	version: number;
	values: {
		shortCode: string;
		fieldName: string;
		position: number;
		value: string;
	}[];
	source: string | undefined;
}

const ProposalDetailPanel = ({
	title,
	applicant,
	applicantId,
	version,
	values,
	source,
}: ProposalDetailPanelProps) => (
	<Panel>
		<PanelHeader>
			<PanelTitleWrapper>
				<PanelTitle>{title}</PanelTitle>
				<PanelTitleTags>
					{applicant && (
						<PanelTag icon={<BuildingOffice2Icon />}>{applicant}</PanelTag>
					)}
					{applicantId && <PanelTag badge="Tax ID">{applicantId}</PanelTag>}
					{source && <PanelTag badge="Source">{source}</PanelTag>}
				</PanelTitleTags>
			</PanelTitleWrapper>
		</PanelHeader>
		<PanelBody padded={false}>
			<ProposalTable version={version} values={values} />
		</PanelBody>
	</Panel>
);

export { ProposalDetailPanel };
