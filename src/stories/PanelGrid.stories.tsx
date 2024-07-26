import type { Meta, StoryObj } from '@storybook/react';

import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { Panel, PanelBody } from '../components/Panel';

const meta = {
	component: PanelGrid,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div
				style={{
					position: 'relative',
					width: '100%',
					height: '400px',
				}}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof PanelGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

const panelGridItem = (
	<PanelGridItem>
		<Panel>
			<PanelBody>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			</PanelBody>
		</Panel>
	</PanelGridItem>
);

const sidebar = (
	<PanelGridItem>
		<Panel>
			<PanelBody>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
				<p>Sidebar.</p>
			</PanelBody>
		</Panel>
	</PanelGridItem>
);

export const Default: Story = {
	args: {
		children: [panelGridItem],
	},
};

export const TwoPanels: Story = {
	args: {
		children: [panelGridItem, panelGridItem],
	},
};

export const PlusSidebar: Story = {
	args: {
		children: [sidebar, panelGridItem],
		sidebarred: true,
	},
};

export const TwoPanelsPlusSidebar: Story = {
	args: {
		children: [sidebar, panelGridItem, panelGridItem],
		sidebarred: true,
	},
};
