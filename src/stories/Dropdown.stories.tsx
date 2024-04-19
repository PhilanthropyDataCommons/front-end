import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
	ArrowRightStartOnRectangleIcon,
	ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline';

import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownMenuButton,
	DropdownMenuText,
	DropdownMenuLink,
	DropdownMenuLinkDescription,
} from '../components/Dropdown';

const meta = {
	component: Dropdown,
	tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: [
			<DropdownTrigger>Toggle menu</DropdownTrigger>,
			<DropdownMenu>
				<DropdownMenuLink to="/" key="item1">
					Item 1
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item2">
					Item 2
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item3">
					Item 3
				</DropdownMenuLink>
			</DropdownMenu>,
		],
	},
	// Storybook elements are placed inside `overflow:hidden` containers,
	// which in our case causes the (absolutely-positioned) dropdown menu to render out of view.
	// This wrapper ensures the element will be tall enough to display the menu.
	// Subsequent stories will override it with their own height as needed.
	decorators: [
		(Story) => (
			<div style={{ height: '200px' }}>
				<Story />
			</div>
		),
	],
};

/**
 * **Note:**
 * We have forced the trigger to be aligned on the right side of the Storybook canvas
 * in order to demonstrate a right-aligned menu without overflowing the canvas boundaries.
 * In real use, the trigger does not need to be right-aligned.
 */
export const RightAligned: Story = {
	args: {
		children: [
			<DropdownTrigger>Toggle menu</DropdownTrigger>,
			<DropdownMenu align="right">
				<DropdownMenuLink to="/" key="item1">
					Item 1
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item2">
					Item 2
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item3">
					Item 3
				</DropdownMenuLink>
			</DropdownMenu>,
		],
	},
	decorators: [
		(Story) => (
			<div
				style={{
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
		children: [
			<DropdownTrigger>
				<ArrowUpOnSquareIcon key="icon" />
				Toggle menu
			</DropdownTrigger>,
			<DropdownMenu>
				<DropdownMenuLink to="/" key="item1">
					Item 1
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item2">
					Item 2
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item3">
					Item 3
				</DropdownMenuLink>
			</DropdownMenu>,
		],
	},
	decorators: [
		(Story) => (
			<div style={{ height: '250px' }}>
				<Story />
			</div>
		),
	],
};

export const UsingButtons: Story = {
	args: {
		children: [
			<DropdownTrigger>Toggle menu</DropdownTrigger>,
			<DropdownMenu>
				<DropdownMenuLink to="/" key="item1">
					This is a link
				</DropdownMenuLink>
				<DropdownMenuButton
					onClick={() => {
						// We want a low-touch way of showing we clicked a button.
						// eslint-disable-next-line no-alert
						window.alert('You clicked a button.');
					}}
					key="item2"
				>
					This is a button
				</DropdownMenuButton>
			</DropdownMenu>,
		],
	},
	decorators: [
		(Story) => (
			<div style={{ height: '250px' }}>
				<Story />
			</div>
		),
	],
};

export const WithMenuText: Story = {
	args: {
		children: [
			<DropdownTrigger>Toggle menu</DropdownTrigger>,
			<DropdownMenu>
				<DropdownMenuText key="title1">
					Some optional explainer text for the menu items:
				</DropdownMenuText>
				<DropdownMenuLink to="/" key="item1">
					Item 1
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item2">
					Item 2
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item3">
					Item 3
				</DropdownMenuLink>
				<DropdownMenuText key="title2">…or mid-stream…</DropdownMenuText>
				<DropdownMenuLink to="/" key="item4">
					Item 4
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item5">
					Item 5
				</DropdownMenuLink>
				<DropdownMenuText key="title3">…or even at the end.</DropdownMenuText>
			</DropdownMenu>,
		],
	},
	decorators: [
		(Story) => (
			<div style={{ height: '400px' }}>
				<Story />
			</div>
		),
	],
};

export const WithLinkDescriptions: Story = {
	args: {
		children: [
			<DropdownTrigger>Toggle menu</DropdownTrigger>,
			<DropdownMenu>
				<DropdownMenuLink to="/" key="item1">
					Item 1
					<DropdownMenuLinkDescription>
						This explains something about this link.
					</DropdownMenuLinkDescription>
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item2">
					Item 2
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item3">
					Item 3
				</DropdownMenuLink>
			</DropdownMenu>,
		],
	},
	decorators: [
		(Story) => (
			<div style={{ height: '400px' }}>
				<Story />
			</div>
		),
	],
};

export const WithMenuItemIcons: Story = {
	args: {
		children: [
			<DropdownTrigger>Toggle menu</DropdownTrigger>,
			<DropdownMenu>
				<DropdownMenuLink
					to="/"
					icon={<ArrowRightStartOnRectangleIcon />}
					key="item1"
				>
					Item 1
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item2">
					Item 2
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item3">
					Item 3
				</DropdownMenuLink>
			</DropdownMenu>,
		],
	},
	decorators: [
		(Story) => (
			<div style={{ height: '200px' }}>
				<Story />
			</div>
		),
	],
};

export const WithMenuItemIconsOnRight: Story = {
	args: {
		children: [
			<DropdownTrigger>Toggle menu</DropdownTrigger>,
			<DropdownMenu>
				<DropdownMenuLink
					to="/"
					icon={<ArrowRightStartOnRectangleIcon />}
					alignIcon="right"
					key="item1"
				>
					Item 1
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item2">
					Item 2
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item3">
					Item 3
				</DropdownMenuLink>
			</DropdownMenu>,
		],
	},
	decorators: [
		(Story) => (
			<div style={{ height: '200px' }}>
				<Story />
			</div>
		),
	],
};

export const WithMenuItemIconsAndDescriptions: Story = {
	args: {
		children: [
			<DropdownTrigger>Toggle menu</DropdownTrigger>,
			<DropdownMenu>
				<DropdownMenuLink
					to="/"
					icon={<ArrowRightStartOnRectangleIcon />}
					key="item1"
				>
					Item 1
					<DropdownMenuLinkDescription>
						This explains something about this link.
					</DropdownMenuLinkDescription>
				</DropdownMenuLink>
				<DropdownMenuLink
					to="/"
					icon={<ArrowRightStartOnRectangleIcon />}
					key="item2"
				>
					Item 2
					<DropdownMenuLinkDescription>
						This explains something about this link.
					</DropdownMenuLinkDescription>
				</DropdownMenuLink>
			</DropdownMenu>,
		],
	},
	decorators: [
		(Story) => (
			<div style={{ height: '200px' }}>
				<Story />
			</div>
		),
	],
};

/**
 * Only one of these can be open at once, because they use the same `name` property.
 * This is tricky to see in action in the Storybook context, but:
 *
 * 1. Open the left-hand dropdown.
 * 2. Tab through its items. (This may not work on macOS unless you have enabled *System Settings* → *Keyboard* → *Keyboard navigation*.)
 * 3. After tab focus leaves the third item, it will be on the second dropdown trigger. (Invisibly, sorry.)
 * 4. Hit space or return to activate the second dropdown.
 * 5. Note that the first dropdown menu closes and the second opens.
 */
export const AccordionStyle: Story = {
	args: {
		name: 'whatever',
		children: [
			<DropdownTrigger>Toggle menu</DropdownTrigger>,
			<DropdownMenu>
				<DropdownMenuLink to="/" key="item1">
					Item 1
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item2">
					Item 2
				</DropdownMenuLink>
				<DropdownMenuLink to="/" key="item3">
					Item 3
				</DropdownMenuLink>
			</DropdownMenu>,
		],
	},
	decorators: [
		(Story) => (
			<div style={{ height: '200px' }}>
				<Story key="story1" /> <Story key="story2" />
			</div>
		),
	],
};
