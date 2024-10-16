import { ChangemakerBundle } from '@pdc/sdk';
import { Panel, PanelBody } from './Panel';
import { ChangemakerListGrid } from './ChangemakerListGrid';

interface ChangemakerListGridPanelProps {
	changemakers: ChangemakerBundle;
	activeChangemakerId?: string | undefined;
}

export const ChangemakerListGridPanel = ({
	changemakers,
	activeChangemakerId = undefined,
}: ChangemakerListGridPanelProps) => (
	<Panel>
		<PanelBody padded={false}>
			<ChangemakerListGrid
				changemakers={changemakers}
				activeChangemakerId={activeChangemakerId}
			/>
		</PanelBody>
	</Panel>
);
