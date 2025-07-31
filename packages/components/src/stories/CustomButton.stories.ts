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

export const CustomButtonBlue: Story = {
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

export const CustomButtonRed: Story = {
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

export const CustomButtonWithIcon: Story = {
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

export const CustomButtonWithIconAndNotification: Story = {
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

export const CustomButtonInverted: Story = {
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

export const CustomButtonInvertedBlue: Story = {
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

export const CustomButtonInvertedRed: Story = {
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

export const CustomButtonInvertedWithIcon: Story = {
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

export const CustomButtonInvertedWithIconAndNotification: Story = {
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

export const CustomButtonIconOnly: Story = {
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

export const CustomButtonTextLinkStyle: Story = {
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

export const CustomButtonDisabled: Story = {
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
