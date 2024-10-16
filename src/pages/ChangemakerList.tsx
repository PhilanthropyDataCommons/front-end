import { useEffect } from 'react';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { ChangemakerListTablePanel } from '../components/ChangemakerListTablePanel';
import {
	CHANGEMAKERS_DEFAULT_COUNT,
	CHANGEMAKERS_DEFAULT_PAGE,
	useChangemakers,
} from '../pdc-api';

const ChangemakerListLoader = () => {
	const [changemakers] = useChangemakers(
		CHANGEMAKERS_DEFAULT_PAGE,
		CHANGEMAKERS_DEFAULT_COUNT,
	);

	useEffect(() => {
		document.title = 'Changemakers - Philanthropy Data Commons';
	}, []);

	if (changemakers === null) {
		return (
			<PanelGrid>
				<PanelGridItem>
					<ChangemakerListTablePanel loading />
				</PanelGridItem>
			</PanelGrid>
		);
	}

	return (
		<PanelGrid>
			<PanelGridItem>
				<ChangemakerListTablePanel changemakers={changemakers} />
			</PanelGridItem>
		</PanelGrid>
	);
};

export { ChangemakerListLoader as ChangemakerList };
