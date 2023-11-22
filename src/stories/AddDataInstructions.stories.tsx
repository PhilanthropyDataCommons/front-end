import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { AddDataInstructions } from '../components/AddDataInstructions';

const meta = {
  component: AddDataInstructions,
  tags: ['autodocs'],
} satisfies Meta<typeof AddDataInstructions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>Children</p>,
  },
};
