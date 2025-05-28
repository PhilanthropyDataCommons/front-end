import type { Meta, StoryObj } from '@storybook/vue3-vite';
import type { DefineComponent, PropType } from 'vue';
import ListGridRaw from '../components/ListGrid/ListGrid.vue';
import ListGridItem from '../components/ListGrid/ListGridItem.vue';
import ListGridItemTitle from '../components/ListGrid/ListGridItemTitle.vue';
import ListGridItemDetails from '../components/ListGrid/ListGridItemDetails.vue';
import { PanelComponent, PanelBody } from '../components/Panel';
import { withVueRouter } from './storybookRouterPlugin';

interface SampleGridItem {
	label: string;
	id: string;
	location: string;
	size: string;
	weight: string;
}

const ListGrid = ListGridRaw as unknown as DefineComponent<{
	items: { type: PropType<SampleGridItem[]>; required: true };
}>;

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

const meta = {
	component: ListGrid,
	tags: ['autodocs'],
	decorators: [withVueRouter()],
	args: {
		items: sampleGridItems,
	},
} satisfies Meta<{ items: SampleGridItem[] }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		items: sampleGridItems,
	},
	render: (args) => ({
		components: {
			ListGrid,
			ListGridItem,
			ListGridItemTitle,
			ListGridItemDetails,
			PanelComponent,
			PanelBody,
		},
		setup() {
			return { args };
		},
		template: `
      <div style="max-width: 300px">
        <PanelComponent>
          <PanelBody :padded="false">
            <ListGrid :items="args.items">
              <template #default="{ item }">
                <ListGridItem linkTo="#">
                  <ListGridItemTitle>{{ item.label }}</ListGridItemTitle>
                  <ListGridItemDetails>
                    <span>{{ item.id }}</span>
                    <span>{{ item.location }}</span>
                  </ListGridItemDetails>
                </ListGridItem>
              </template>
            </ListGrid>
          </PanelBody>
        </PanelComponent>
      </div>
    `,
	}),
};
