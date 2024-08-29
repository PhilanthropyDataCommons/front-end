import type { Meta, StoryObj } from '@storybook/react';

import { Panel, PanelBody } from '../components/Panel';
import {
	ListGrid,
	ListGridItem,
	ListGridItemTitle,
	ListGridItemDetails,
	ListGridProps,
} from '../components/ListGrid';

const meta: Meta<ListGridProps<SampleGridItem>> = {
	component: ListGrid,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '300px' }}>
				<Panel>
					<PanelBody padded={false}>
						<Story />
					</PanelBody>
				</Panel>
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof meta>;

interface SampleGridItem {
	label: string;
	id: string;
	location: string;
	size: string;
	weight: string;
}

const sampleGridItems: SampleGridItem[] = [
	{
		label: 'Item 1',
		id: 'ABC-123',
		location: 'Texas',
		size: 'Large',
		weight: '200lbs',
	},
	{
		label: 'Item 2',
		id: 'DEF-456',
		location: 'California',
		size: 'Medium',
		weight: '100lbs',
	},
	{
		label: 'Item 3',
		id: 'GHI-789',
		location: 'Arizona',
		size: 'Small',
		weight: '50lbs',
	},
];

export const Default: Story = {
	args: {
		items: sampleGridItems,
		renderItem: (item: SampleGridItem) => (
			<ListGridItem linkTo="#">
				<ListGridItemTitle>{item.label}</ListGridItemTitle>
				<ListGridItemDetails>
					<span>{item.id}</span>
					<span>{item.location}</span>
				</ListGridItemDetails>
			</ListGridItem>
		),
	},
};
