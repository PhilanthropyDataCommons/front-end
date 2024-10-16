import { ChangemakerBundle } from '@pdc/sdk';
import { Panel, PanelBody } from './Panel';
import { ChangemakerListTable } from './ChangemakerListTable';

interface ChangemakerListTablePanelProps {
	changemakers?: ChangemakerBundle;
	loading?: boolean;
}

export const ChangemakerListTablePanel = ({
	changemakers = undefined,
	loading = false,
}: ChangemakerListTablePanelProps) => {
	const generateFallbackMessage = () =>
		loading ? 'Loading…' : 'No data available.';

	const hasChangemakers =
		changemakers !== undefined && changemakers.entries.length > 0;

	return (
		<Panel>
			<PanelBody padded={!hasChangemakers}>
				{hasChangemakers ? (
					<ChangemakerListTable changemakers={changemakers} />
				) : (
					<div className="quiet">{generateFallbackMessage()}</div>
				)}
			</PanelBody>
		</Panel>
	);
};
