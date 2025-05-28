import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { PanelComponent, PanelBody } from '../components/Panel';

const meta = {
	component: PanelGrid,
	tags: ['autodocs'],
} satisfies Meta<typeof PanelGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const panelContent = `
	<PanelGridItem>
		<PanelComponent>
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
		</PanelComponent>
	</PanelGridItem>
`;

const sidebarContent = `
	<PanelGridItem>
		<PanelComponent>
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
		</PanelComponent>
	</PanelGridItem>
`;

export const Default: Story = {
	render: (args) => ({
		components: { PanelGrid, PanelGridItem, PanelComponent, PanelBody },
		setup() {
			return { args, panelContent };
		},
		template: `
			<div style="position: relative; width: 100%; height: 400px">
				<PanelGrid>
					${panelContent}
				</PanelGrid>
			</div>
		`,
	}),
};

export const TwoPanels: Story = {
	render: (args) => ({
		components: { PanelGrid, PanelGridItem, PanelComponent, PanelBody },
		setup() {
			return { args, panelContent };
		},
		template: `
			<div style="position: relative; width: 100%; height: 400px">
				<PanelGrid>
					${panelContent}
					${panelContent}
				</PanelGrid>
			</div>
		`,
	}),
};

export const PlusSidebar: Story = {
	render: (args) => ({
		components: { PanelGrid, PanelGridItem, PanelComponent, PanelBody },
		setup() {
			return { args, sidebarContent, panelContent };
		},
		template: `
			<div style="position: relative; width: 100%; height: 400px">
				<PanelGrid :sidebarred="true">
					${sidebarContent}
					${panelContent}
				</PanelGrid>
			</div>
		`,
	}),
};

export const TwoPanelsPlusSidebar: Story = {
	render: (args) => ({
		components: { PanelGrid, PanelGridItem, PanelComponent, PanelBody },
		setup() {
			return { args, sidebarContent, panelContent };
		},
		template: `
			<div style="position: relative; width: 100%; height: 400px">
				<PanelGrid :sidebarred="true">
					${sidebarContent}
					${panelContent}
					${panelContent}
				</PanelGrid>
			</div>
		`,
	}),
};
