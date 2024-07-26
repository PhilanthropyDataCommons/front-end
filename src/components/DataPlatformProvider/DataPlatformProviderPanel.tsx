import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { ClosablePanel, PanelTitle, PanelTitleTags } from '../Panel';
import { OffsiteLink } from '../OffsiteLink';
import { DataPlatformProviderTable } from './DataPlatformProviderTable';

interface DataPlatformProviderTitleProps {
	applicant: string;
	provider: string;
	url: string;
}
const DataPlatformProviderTitle = ({
	applicant,
	provider,
	url,
}: DataPlatformProviderTitleProps) => (
	<>
		<PanelTitle>{applicant}</PanelTitle>
		<PanelTitleTags>
			<OffsiteLink to={url} targetBlank className="panel-tag panel-tag--link">
				<ArrowTopRightOnSquareIcon className="icon" />
				{`Open in ${provider}`}
			</OffsiteLink>
		</PanelTitleTags>
	</>
);

interface DataPlatformProviderPanelProps {
	applicant: string;
	onClose: () => void;
	provider: string;
	url: string;
	values: {
		jsonPath: string;
		fieldName: string;
		value: string;
	}[];
}

const DataPlatformProviderPanel = ({
	applicant,
	onClose,
	provider,
	url,
	values,
}: DataPlatformProviderPanelProps) => (
	<ClosablePanel
		onClose={onClose}
		padded={false}
		title={
			<DataPlatformProviderTitle
				applicant={applicant}
				provider={provider}
				url={url}
			/>
		}
	>
		<DataPlatformProviderTable values={values} />
	</ClosablePanel>
);

export { DataPlatformProviderPanel };
