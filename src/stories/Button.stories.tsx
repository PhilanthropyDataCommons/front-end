import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

import { Button } from '../components/Button';

const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Blue: Story = {
  args: {
    color: 'blue',
    children: 'Button',
  },
};

export const Red: Story = {
  args: {
    color: 'red',
    children: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    color: 'blue',
    bordered: true,
    children: (
      <>
        <AdjustmentsHorizontalIcon />
        Button
      </>
    ),
  },
};

export const WithIconAndNotification: Story = {
  args: {
    color: 'blue',
    bordered: true,
    notification: true,
    children: (
      <>
        <AdjustmentsHorizontalIcon />
        Button
      </>
    ),
  },
};

export const Inverted: Story = {
  args: {
    color: 'blue',
    inverted: true,
    children: 'Button',
  },
};

export const InvertedWithIcon: Story = {
  args: {
    color: 'blue',
    inverted: true,
    children: (
      <>
        <AdjustmentsHorizontalIcon />
        Button
      </>
    ),
  },
};

export const InvertedWithIconAndNotification: Story = {
  args: {
    color: 'blue',
    inverted: true,
    notification: true,
    children: (
      <>
        <AdjustmentsHorizontalIcon />
        Button
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    children: (
      <AdjustmentsHorizontalIcon />
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};
