import { ChangemakerBundle } from '@pdc/sdk';
import {
	ListGrid,
	ListGridItem,
	ListGridItemDetails,
	ListGridItemTitle,
} from './ListGrid';

interface ChangemakerListGridProps {
	changemakers: ChangemakerBundle;
	activeChangemakerId?: string | undefined;
}

export const ChangemakerListGrid = ({
	changemakers,
	activeChangemakerId = undefined,
}: ChangemakerListGridProps) => (
	<ListGrid
		items={changemakers.entries}
		renderItem={(changemaker) => (
			<ListGridItem
				linkTo={`/changemakers/${changemaker.id}`}
				active={String(changemaker.id) === activeChangemakerId}
				key={changemaker.id}
			>
				<ListGridItemTitle>{changemaker.name}</ListGridItemTitle>
				<ListGridItemDetails>{changemaker.taxId}</ListGridItemDetails>
			</ListGridItem>
		)}
	/>
);
