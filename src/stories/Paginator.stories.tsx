import type { Meta, StoryObj } from '@storybook/react';

import { Paginator } from '../components/Paginator';

const meta = {
  component: Paginator,
  tags: ['autodocs'],
} satisfies Meta<typeof Paginator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemsPerPage: 100,
    totalItems: 950,
    currentPage: 1,
    setCurrentPage: () => (false),
  },
};
