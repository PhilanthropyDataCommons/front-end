import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { PanelComponent, PanelBody } from '../components/Panel';
import ListGridItem from '../components/ListGrid/ListGridItem.vue';
import ListGridItemTitle from '../components/ListGrid/ListGridItemTitle.vue';
import ListGridItemDetails from '../components/ListGrid/ListGridItemDetails.vue';
import { withVueRouter } from './storybookRouterPlugin';

const meta = {
	component: ListGridItem,
	tags: ['autodocs'],
	decorators: [
		(story) => ({
			components: { story, PanelComponent, PanelBody },
			template: `
				<div style="max-width: 300px">
					<PanelComponent>
						<PanelBody :padded="false">
							<story />
						</PanelBody>
					</PanelComponent>
				</div>
			`,
		}),
		withVueRouter(),
	],
} satisfies Meta<typeof ListGridItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { ListGridItem, ListGridItemTitle, ListGridItemDetails },
		setup() {
			return { args };
		},
		template: `
			<ListGridItem :link-to="args.linkTo">
				<ListGridItemTitle>Item 1</ListGridItemTitle>
				<ListGridItemDetails>
					<span>ABC-123</span>
					<span>Texas</span>
				</ListGridItemDetails>
			</ListGridItem>
		`,
	}),
	args: {
		linkTo: '#',
	},
};

export const NoDetails: Story = {
	render: (args) => ({
		components: { ListGridItem, ListGridItemTitle },
		setup() {
			return { args };
		},
		template: `
			<ListGridItem :link-to="args.linkTo">
				<ListGridItemTitle>Item 1</ListGridItemTitle>
			</ListGridItem>
		`,
	}),
	args: {
		linkTo: '#',
	},
};

export const OneDetail: Story = {
	render: (args) => ({
		components: { ListGridItem, ListGridItemTitle, ListGridItemDetails },
		setup() {
			return { args };
		},
		template: `
			<ListGridItem :link-to="args.linkTo">
				<ListGridItemTitle>Item 1</ListGridItemTitle>
				<ListGridItemDetails>ABC-123</ListGridItemDetails>
			</ListGridItem>
		`,
	}),
	args: {
		linkTo: '#',
	},
};

export const MultipleDetails: Story = {
	render: (args) => ({
		components: { ListGridItem, ListGridItemTitle, ListGridItemDetails },
		setup() {
			return { args };
		},
		template: `
			<ListGridItem :link-to="args.linkTo">
				<ListGridItemTitle>Item 1</ListGridItemTitle>
				<ListGridItemDetails>
					<span>ABC-123</span>
					<span>Texas</span>
				</ListGridItemDetails>
				<ListGridItemDetails>
					<span>Large</span>
					<span>200lbs.</span>
				</ListGridItemDetails>
			</ListGridItem>
		`,
	}),
	args: {
		linkTo: '#',
	},
};
