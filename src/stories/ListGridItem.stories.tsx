import type { Meta, StoryObj } from '@storybook/react';

import { Panel, PanelBody } from '../components/Panel';
import {
	ListGridItem,
	ListGridItemTitle,
	ListGridItemDetails,
} from '../components/ListGrid';

const meta = {
	component: ListGridItem,
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
} satisfies Meta<typeof ListGridItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		linkTo: '#',
		children: [
			<ListGridItemTitle>Item 1</ListGridItemTitle>,
			<ListGridItemDetails>
				<span>ABC-123</span>
				<span>Texas</span>
			</ListGridItemDetails>,
		],
	},
};

export const NoDetails: Story = {
	args: {
		linkTo: '#',
		children: [<ListGridItemTitle>Item 1</ListGridItemTitle>],
	},
};

export const OneDetail: Story = {
	args: {
		linkTo: '#',
		children: [
			<ListGridItemTitle>Item 1</ListGridItemTitle>,
			// Note that the inner `<span>` isn't necessary
			// when you have a single detail and don't require justified contents.
			<ListGridItemDetails>ABC-123</ListGridItemDetails>,
		],
	},
};

export const MultipleDetails: Story = {
	args: {
		linkTo: '#',
		children: [
			<ListGridItemTitle>Item 1</ListGridItemTitle>,
			<ListGridItemDetails>
				<span>ABC-123</span>
				<span>Texas</span>
			</ListGridItemDetails>,
			<ListGridItemDetails>
				<span>Large</span>
				<span>200lbs.</span>
			</ListGridItemDetails>,
		],
	},
};
