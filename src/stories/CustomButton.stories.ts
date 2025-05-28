import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline';

import CustomButton from '../components/CustomButton.vue';

const meta = {
	component: CustomButton,
	tags: ['autodocs'],
} satisfies Meta<typeof CustomButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { CustomButton },
		setup() {
			return { args };
		},
		template: '<CustomButton> {{args.default}} </CustomButton>',
	}),
	args: {
		default: 'Button',
	},
};

export const Blue: Story = {
	render: (args) => ({
		components: { CustomButton },
		setup() {
			return { args };
		},
		template:
			'<CustomButton :color="args.color"> {{args.default}} </CustomButton>',
	}),
	args: {
		color: 'blue',
		default: 'Button',
	},
};

export const Red: Story = {
	render: (args) => ({
		components: { CustomButton },
		setup() {
			return { args };
		},
		template:
			'<CustomButton :color="args.color"> {{args.default}} </CustomButton>',
	}),
	args: {
		color: 'red',
		default: 'Button',
	},
};

export const WithIcon: Story = {
	render: (args) => ({
		components: { CustomButton, AdjustmentsHorizontalIcon },
		setup() {
			return { args };
		},
		template: `
		<CustomButton :color="args.color" :bordered="args.bordered">
			<AdjustmentsHorizontalIcon />
			{{args.default}}
		</CustomButton>`,
	}),
	args: {
		color: 'blue',
		bordered: true,
		default: 'Button',
	},
};

export const WithIconAndNotification: Story = {
	render: (args) => ({
		components: { CustomButton, AdjustmentsHorizontalIcon },
		setup() {
			return { args };
		},
		template: `
		<CustomButton :color="args.color" :bordered="args.bordered" :notification="args.notification">
			<AdjustmentsHorizontalIcon />
			{{args.default}}
		</CustomButton>`,
	}),
	args: {
		color: 'blue',
		bordered: true,
		notification: true,
		default: 'Button',
	},
};

export const Inverted: Story = {
	render: (args) => ({
		components: { CustomButton },
		setup() {
			return { args };
		},
		template: `<CustomButton :inverted="args.inverted">
			<AdjustmentsHorizontalIcon />
			{{args.default}}
			</CustomButton>`,
	}),
	args: {
		inverted: true,
		default: 'Button',
	},
};

export const InvertedBlue: Story = {
	render: (args) => ({
		components: { CustomButton },
		setup() {
			return { args };
		},
		template: `<CustomButton :color="args.color" :inverted="args.inverted">
			<AdjustmentsHorizontalIcon />
			{{args.default}}
			</CustomButton>`,
	}),
	args: {
		color: 'blue',
		inverted: true,
		default: 'Button',
	},
};

export const InvertedRed: Story = {
	render: (args) => ({
		components: { CustomButton },
		setup() {
			return { args };
		},
		template: `<CustomButton :color="args.color" :inverted="args.inverted">
			<AdjustmentsHorizontalIcon />
			{{args.default}}
			</CustomButton>`,
	}),
	args: {
		color: 'red',
		inverted: true,
		default: 'Button',
	},
};

export const InvertedWithIcon: Story = {
	render: (args) => ({
		components: { CustomButton, AdjustmentsHorizontalIcon },
		setup() {
			return { args };
		},
		template: `<CustomButton :color="args.color" :inverted="args.inverted">
			<AdjustmentsHorizontalIcon />
			{{args.default}}
			</CustomButton>`,
	}),
	args: {
		color: 'blue',
		inverted: true,
		default: 'Button',
	},
};

export const InvertedWithIconAndNotification: Story = {
	render: (args) => ({
		components: { CustomButton, AdjustmentsHorizontalIcon },
		setup() {
			return { args };
		},
		template: `<CustomButton :color="args.color" :inverted="args.inverted" :notification="args.notification">
			<AdjustmentsHorizontalIcon />
			{{args.default}}
			</CustomButton>`,
	}),
	args: {
		color: 'blue',
		inverted: true,
		notification: true,
		default: 'Button',
	},
};

export const IconOnly: Story = {
	render: (args) => ({
		components: { CustomButton, AdjustmentsHorizontalIcon },
		setup() {
			return { args };
		},
		template: `
		<CustomButton>
			<AdjustmentsHorizontalIcon />
			{{args.default}}
		</CustomButton>`,
	}),
	args: {},
};

export const TextLinkStyle: Story = {
	render: (args) => ({
		components: { CustomButton, AdjustmentsHorizontalIcon },
		setup() {
			return { args };
		},
		template: `<CustomButton :linkStyle="args.linkStyle"> {{args.default}} </CustomButton>`,
	}),
	args: {
		linkStyle: true,
		default: 'Link-Style Button',
	},
};

export const Disabled: Story = {
	render: (args) => ({
		components: { CustomButton },
		setup() {
			return { args };
		},
		template:
			'<CustomButton :disabled="args.disabled"> {{args.default}} </CustomButton>',
	}),
	args: {
		disabled: true,
		default: 'Button',
	},
};
