import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ArrowRightOnRectangleIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

import {
  Dropdown,
  DropdownMenuText,
  DropdownMenuLink,
} from '../components/Dropdown';

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: 'Toggle menu',
    children: [
      <DropdownMenuLink to="/" key="item1">Item 1</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>,
    ],
  },
  // Storybook elements are placed inside `overflow:hidden` containers,
  // which in our case causes the (absolutely-positioned) dropdown menu to render out of view.
  // This wrapper ensures the element will be tall enough to display the menu.
  // Subsequent stories will override it with their own height as needed.
  decorators: [
    (Story) => <div style={{ height: '200px' }}><Story /></div>,
  ],
};

export const RightAligned: Story = {
  args: {
    align: 'right',
    trigger: 'Toggle menu',
    children: [
      <DropdownMenuLink to="/" key="item1">Item 1</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>,
    ],
  },
  decorators: [
    (Story) => (
      <div style={{
        height: '200px',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      >
        <Story />
      </div>
    ),
  ],
};

export const WithIconInTrigger: Story = {
  args: {
    trigger: [
      <ArrowUpOnSquareIcon key="icon" />,
      'Toggle menu',
    ],
    children: [
      <DropdownMenuLink to="/" key="item1">Item 1</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>,
    ],
  },
  decorators: [
    (Story) => <div style={{ height: '250px' }}><Story /></div>,
  ],
};

export const WithMenuTitle: Story = {
  args: {
    trigger: 'Toggle menu',
    children: [
      <DropdownMenuText key="title1">Some optional explainer text for the menu items:</DropdownMenuText>,
      <DropdownMenuLink to="/" key="item1">Item 1</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>,
    ],
  },
  decorators: [
    (Story) => <div style={{ height: '250px' }}><Story /></div>,
  ],
};

export const WithMultipleMenuTitles: Story = {
  args: {
    trigger: 'Toggle menu',
    children: [
      <DropdownMenuText key="title1">Some optional explainer text for the menu items:</DropdownMenuText>,
      <DropdownMenuLink to="/" key="item1">Item 1</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>,
      <DropdownMenuText key="title2">…or mid-stream…</DropdownMenuText>,
      <DropdownMenuLink to="/" key="item4">Item 4</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item5">Item 5</DropdownMenuLink>,
      <DropdownMenuText key="title3">…or even at the end.</DropdownMenuText>,
    ],
  },
  decorators: [
    (Story) => <div style={{ height: '400px' }}><Story /></div>,
  ],
};

export const WithMenuItemIcons: Story = {
  args: {
    trigger: 'Toggle menu',
    children: [
      <DropdownMenuLink to="/" key="item1">
        Item 1
        <ArrowRightOnRectangleIcon />
      </DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>,
      <DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>,
    ],
  },
  decorators: [
    (Story) => <div style={{ height: '200px' }}><Story /></div>,
  ],
};
