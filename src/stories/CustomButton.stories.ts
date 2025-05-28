import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { h } from 'vue';
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline';

import CustomButton from '../components/CustomButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Custom Button',
  component: CustomButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof CustomButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    default: 'Buaton',
  },
};

export const Blue: Story = {
  args: {
    color: 'blue',
    default: 'Button',
  },
};

export const Red: Story = {
  args: {
    color: 'red',
    default: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    color: 'blue',
    bordered: true,
    default: () => [h(AdjustmentsHorizontalIcon), 'Button'],
  },
};

export const WithIconAndNotification: Story = {
  args: {
    color: 'blue',
    bordered: true,
    notification: true,
    default: () => [h(AdjustmentsHorizontalIcon), 'Button'],
  },
};

export const Inverted: Story = {
  args: {
    inverted: true,
    default: 'Button',
  },
};

export const InvertedBlue: Story = {
  args: {
    color: 'blue',
    inverted: true,
    default: 'Button',
  },
};

export const InvertedRed: Story = {
  args: {
    color: 'red',
    inverted: true,
    default: 'Button',
  },
};

export const InvertedWithIcon: Story = {
  args: {
    color: 'blue',
    inverted: true,
    default: () => [h(AdjustmentsHorizontalIcon), 'Button'],
  },
};

export const InvertedWithIconAndNotification: Story = {
  args: {
    color: 'blue',
    inverted: true,
    notification: true,
    default: () => [h(AdjustmentsHorizontalIcon), 'Button'],
  },
};

export const IconOnly: Story = {
  args: {
    default: () => h(AdjustmentsHorizontalIcon),
  },
};

export const TextLinkStyle: Story = {
  args: {
    linkStyle: true,
    default: 'Link-Style Button',
  },
};

// export const Disabled: Story = {
// 	args: {
// 		children: 'Button',
// 		disabled: true,
// 	},
// };
