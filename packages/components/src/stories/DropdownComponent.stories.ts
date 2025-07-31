import type { Meta, StoryObj } from '@storybook/vue3-vite';
import {
	ArrowRightStartOnRectangleIcon,
	ArrowUpOnSquareIcon,
} from '@heroicons/vue/24/outline';

import {
	DropdownComponent,
	DropdownTrigger,
	DropdownMenu,
	DropdownMenuButton,
	DropdownMenuText,
	DropdownMenuLink,
	DropdownMenuLinkDescription,
} from '../components/Dropdown';

const meta = {
	component: DropdownComponent,
	tags: ['autodocs'],
} satisfies Meta<typeof DropdownComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: {
			DropdownComponent,
			DropdownTrigger,
			DropdownMenu,
			DropdownMenuLink,
		},
		setup() {
			return { args };
		},
		template: `
			<div style="height: 200px">
				<DropdownComponent>
					<DropdownTrigger>Toggle menu</DropdownTrigger>
					<DropdownMenu>
						<DropdownMenuLink to="/" key="item1">Item 1</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>
					</DropdownMenu>
				</DropdownComponent>
			</div>
		`,
	}),
};

/**
 * **Note:**
 * We have forced the trigger to be aligned on the right side of the Storybook canvas
 * in order to demonstrate a right-aligned menu without overflowing the canvas boundaries.
 * In real use, the trigger does not need to be right-aligned.
 */
export const DropdownComponentRightAligned: Story = {
	render: (args) => ({
		components: {
			DropdownComponent,
			DropdownTrigger,
			DropdownMenu,
			DropdownMenuLink,
		},
		setup() {
			return { args };
		},
		template: `
			<div style="height: 200px; display: flex; justify-content: flex-end">
				<DropdownComponent	>
					<DropdownTrigger>Toggle menu</DropdownTrigger>
					<DropdownMenu align="right">
						<DropdownMenuLink to="/" key="item1">Item 1</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>
					</DropdownMenu>
				</DropdownComponent>
			</div>
		`,
	}),
};

export const DropdownComponentWithIconInTrigger: Story = {
	render: (args) => ({
		components: {
			DropdownComponent,
			DropdownTrigger,
			DropdownMenu,
			DropdownMenuLink,
			ArrowUpOnSquareIcon,
		},
		setup() {
			return { args };
		},
		template: `
			<div style="height: 250px">
				<DropdownComponent	>
					<DropdownTrigger>
						<ArrowUpOnSquareIcon />
						Toggle menu
					</DropdownTrigger>
					<DropdownMenu>
						<DropdownMenuLink to="/" key="item1">Item 1</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>
					</DropdownMenu>
				</DropdownComponent>
			</div>
		`,
	}),
};

export const DropdownComponentUsingButtons: Story = {
	render: (args) => ({
		components: {
			DropdownComponent,
			DropdownTrigger,
			DropdownMenu,
			DropdownMenuLink,
			DropdownMenuButton,
		},
		setup() {
			return { args };
		},
		template: `
			<div style="height: 250px">
				<DropdownComponent>
					<DropdownTrigger>Toggle menu</DropdownTrigger>
					<DropdownMenu>
						<DropdownMenuLink to="/" key="item1">This is a link</DropdownMenuLink>
						<DropdownMenuButton
							@click="() => window.alert('You clicked a button.')"
							key="item2"
						>
							This is a button
						</DropdownMenuButton>
					</DropdownMenu>
				</DropdownComponent>
			</div>
		`,
	}),
};

export const DropdownComponentWithMenuText: Story = {
	render: (args) => ({
		components: {
			DropdownComponent,
			DropdownTrigger,
			DropdownMenu,
			DropdownMenuLink,
			DropdownMenuText,
		},
		setup() {
			return { args };
		},
		template: `
			<div style="height: 400px">
				<DropdownComponent>
					<DropdownTrigger>Toggle menu</DropdownTrigger>
					<DropdownMenu>
						<DropdownMenuText key="title1">
							Some optional explainer text for the menu items:
						</DropdownMenuText>
						<DropdownMenuLink to="/" key="item1">Item 1</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>
						<DropdownMenuText key="title2">…or mid-stream…</DropdownMenuText>
						<DropdownMenuLink to="/" key="item4">Item 4</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item5">Item 5</DropdownMenuLink>
						<DropdownMenuText key="title3">…or even at the end.</DropdownMenuText>
					</DropdownMenu>
				</DropdownComponent>
			</div>
		`,
	}),
};

export const DropdownComponentWithLinkDescriptions: Story = {
	render: (args) => ({
		components: {
			DropdownComponent,
			DropdownTrigger,
			DropdownMenu,
			DropdownMenuLink,
			DropdownMenuLinkDescription,
		},
		setup() {
			return { args };
		},
		template: `
			<div style="height: 400px">
				<DropdownComponent>
					<DropdownTrigger>Toggle menu</DropdownTrigger>
					<DropdownMenu>
						<DropdownMenuLink to="/" key="item1">
							Item 1
							<DropdownMenuLinkDescription>
								This explains something about this link.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>
					</DropdownMenu>
				</DropdownComponent>
			</div>
		`,
	}),
};

export const DropdownComponentWithMenuItemIcons: Story = {
	render: (args) => ({
		components: {
			DropdownComponent,
			DropdownTrigger,
			DropdownMenu,
			DropdownMenuLink,
			ArrowRightStartOnRectangleIcon,
		},
		setup() {
			return { args, ArrowRightStartOnRectangleIcon };
		},
		template: `
			<div style="height: 200px">
				<DropdownComponent>
					<DropdownTrigger>Toggle menu</DropdownTrigger>
					<DropdownMenu>
						<DropdownMenuLink to="/" :icon="ArrowRightStartOnRectangleIcon" key="item1">
							Item 1
						</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>
					</DropdownMenu>
				</DropdownComponent>
			</div>
		`,
	}),
};

export const DropdownComponentWithMenuItemIconsOnRight: Story = {
	render: (args) => ({
		components: {
			DropdownComponent,
			DropdownTrigger,
			DropdownMenu,
			DropdownMenuLink,
			ArrowRightStartOnRectangleIcon,
		},
		setup() {
			return { args, ArrowRightStartOnRectangleIcon };
		},
		template: `
			<div style="height: 200px">
				<DropdownComponent>
					<DropdownTrigger>Toggle menu</DropdownTrigger>
					<DropdownMenu>
						<DropdownMenuLink
							to="/"
							:icon="ArrowRightStartOnRectangleIcon"
							alignIcon="right"
							key="item1"
						>
							Item 1
						</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>
					</DropdownMenu>
				</DropdownComponent>
			</div>
		`,
	}),
};

export const DropdownComponentWithMenuItemIconsAndDescriptions: Story = {
	render: (args) => ({
		components: {
			DropdownComponent,
			DropdownTrigger,
			DropdownMenu,
			DropdownMenuLink,
			DropdownMenuLinkDescription,
			ArrowRightStartOnRectangleIcon,
		},
		setup() {
			return { args, ArrowRightStartOnRectangleIcon };
		},
		template: `
			<div style="height: 200px">
				<DropdownComponent>
					<DropdownTrigger>Toggle menu</DropdownTrigger>
					<DropdownMenu>
						<DropdownMenuLink
							to="/"
							:icon="ArrowRightStartOnRectangleIcon"
							key="item1"
						>
							Item 1
							<DropdownMenuLinkDescription>
								This explains something about this link.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
						<DropdownMenuLink
							to="/"
							:icon="ArrowRightStartOnRectangleIcon"
							key="item2"
						>
							Item 2
							<DropdownMenuLinkDescription>
								This explains something about this link.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
					</DropdownMenu>
				</DropdownComponent>
			</div>
		`,
	}),
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
export const DropdownComponentAccordionStyle: Story = {
	render: (args) => ({
		components: {
			DropdownComponent,
			DropdownTrigger,
			DropdownMenu,
			DropdownMenuLink,
		},
		setup() {
			return { args };
		},
		template: `
			<div style="height: 200px">
				<DropdownComponent name="whatever">
					<DropdownTrigger>Toggle menu</DropdownTrigger>
					<DropdownMenu>
						<DropdownMenuLink to="/" key="item1">Item 1</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>
					</DropdownMenu>
				</DropdownComponent>
				<DropdownComponent name="whatever">
					<DropdownTrigger>Toggle menu</DropdownTrigger>
					<DropdownMenu>
						<DropdownMenuLink to="/" key="item1">Item 1</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item2">Item 2</DropdownMenuLink>
						<DropdownMenuLink to="/" key="item3">Item 3</DropdownMenuLink>
					</DropdownMenu>
				</DropdownComponent>
			</div>
		`,
	}),
};
