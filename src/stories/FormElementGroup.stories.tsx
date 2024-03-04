import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FormElementGroup } from '../components/FormElementGroup';
import { Button } from '../components/Button';

const meta = {
	component: FormElementGroup,
	tags: ['autodocs'],
} satisfies Meta<typeof FormElementGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: [<Button>Button 1</Button>, <Button>Button 2</Button>],
	},
};

export const Vertical: Story = {
	args: {
		direction: 'vertical',
		children: [<Button>Button 1</Button>, <Button>Button 2</Button>],
	},
};
