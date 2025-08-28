import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { BaseField } from '@pdc/sdk';
import {
	TableComponent,
	TableHead,
	TableBody,
	TableRow,
	TableRowCell,
	TableColumnHead,
} from '../components/Table';
import {
	PanelComponent,
	PanelHeader,
	PanelBody,
	PanelHeaderActionsWrapper,
	PanelHeaderAction,
} from '../components/Panel';
import {
	DocumentPlusIcon,
	AdjustmentsHorizontalIcon,
} from '@heroicons/vue/24/outline';

const meta = {
	component: TableComponent,
	tags: ['autodocs'],
} satisfies Meta<typeof TableComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const valueRelevanceHoursDefault = 0;

const sampleBaseFields: BaseField[] = [
	{
		shortCode: 'org_name',
		label: 'Organization Name',
		description: 'The name of the organization',
		dataType: BaseField.DataTypeEnum.String,
		category: BaseField.CategoryEnum.Organization,
		valueRelevanceHours: valueRelevanceHoursDefault,
		sensitivityClassification: BaseField.SensitivityClassificationEnum.Public,
		createdAt: '2025-01-01T00:00:00Z',
	},
	{
		shortCode: 'ein',
		label: 'EIN',
		description: 'Tax identification number',
		dataType: BaseField.DataTypeEnum.String,
		category: BaseField.CategoryEnum.Organization,
		valueRelevanceHours: valueRelevanceHoursDefault,
		sensitivityClassification:
			BaseField.SensitivityClassificationEnum.Restricted,
		createdAt: '2025-01-01T00:00:00Z',
	},
	{
		shortCode: 'org_email',
		label: 'Organization Email',
		description: 'The email of the organization',
		dataType: BaseField.DataTypeEnum.String,
		category: BaseField.CategoryEnum.Organization,
		valueRelevanceHours: valueRelevanceHoursDefault,
		sensitivityClassification: BaseField.SensitivityClassificationEnum.Public,
		createdAt: '2025-01-01T00:00:00Z',
	},
	{
		shortCode: 'org_phone',
		label: 'Organization Phone',
		description: 'The phone number of the organization',
		dataType: BaseField.DataTypeEnum.String,
		category: BaseField.CategoryEnum.Organization,
		valueRelevanceHours: valueRelevanceHoursDefault,
		sensitivityClassification: BaseField.SensitivityClassificationEnum.Public,
		createdAt: '2025-01-01T00:00:00Z',
	},
];

export const Default: Story = {
	render: (args) => ({
		components: {
			TableComponent,
			PanelComponent,
			PanelHeader,
			PanelBody,
			PanelHeaderActionsWrapper,
			PanelHeaderAction,
			TableHead,
			TableBody,
			TableRow,
			TableColumnHead,
			TableRowCell,
			DocumentPlusIcon,
		},
		setup() {
			return { args, baseFields: sampleBaseFields };
		},
		template: `<PanelComponent>
		<PanelHeader>
			<h1>Base Fields</h1>
			<PanelHeaderActionsWrapper class="disabled">
				<PanelHeaderAction>
					<DocumentPlusIcon class="icon" />
					<p class="download-csv-text">Download CSV template</p>
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody>
			<TableComponent

			>
				<TableHead fixed>
					<TableRow>
						<TableColumnHead>Label</TableColumnHead>
						<TableColumnHead>Description</TableColumnHead>
						<TableColumnHead>Short code</TableColumnHead>
						<TableColumnHead>Data type</TableColumnHead>
						<TableColumnHead>Category</TableColumnHead>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow v-for="field in baseFields" :key="field.shortCode">
						<TableRowCell>{{ field.label }}</TableRowCell>
						<TableRowCell>{{ field.description }}</TableRowCell>
						<TableRowCell>{{ field.shortCode }}</TableRowCell>
						<TableRowCell>{{ field.dataType }}</TableRowCell>
						<TableRowCell>{{ field.category }}</TableRowCell>
					</TableRow>
				</TableBody>
			</TableComponent>
		</PanelBody>
	</PanelComponent>`,
	}),
};

export const TruncatedTable: Story = {
	render: (args) => ({
		components: {
			TableComponent,
			PanelComponent,
			PanelHeader,
			PanelBody,
			PanelHeaderActionsWrapper,
			PanelHeaderAction,
			TableHead,
			TableBody,
			TableRow,
			TableColumnHead,
			TableRowCell,
			DocumentPlusIcon,
		},
		setup() {
			return { args, baseFields: sampleBaseFields };
		},
		template: `<PanelComponent>
		<PanelHeader>
			<h1>Base Fields</h1>
			<PanelHeaderActionsWrapper class="disabled">
				<PanelHeaderAction>
					<DocumentPlusIcon class="icon" />
					<p class="download-csv-text">Download CSV template</p>
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody>
			<TableComponent
				truncate
			>
				<TableHead>
					<TableRow>
						<TableColumnHead>Label</TableColumnHead>
						<TableColumnHead>Description</TableColumnHead>
						<TableColumnHead>Short code</TableColumnHead>
						<TableColumnHead>Data type</TableColumnHead>
						<TableColumnHead>Category</TableColumnHead>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow v-for="field in baseFields" :key="field.shortCode">
						<TableRowCell>{{ field.label }}</TableRowCell>
						<TableRowCell>{{ field.description }}</TableRowCell>
						<TableRowCell>{{ field.shortCode }}</TableRowCell>
						<TableRowCell>{{ field.dataType }}</TableRowCell>
						<TableRowCell>{{ field.category }}</TableRowCell>
					</TableRow>
				</TableBody>
			</TableComponent>
		</PanelBody>
	</PanelComponent>`,
	}),
};

export const WithTwoActions: Story = {
	render: (args) => ({
		components: {
			TableComponent,
			PanelComponent,
			PanelHeader,
			PanelBody,
			PanelHeaderActionsWrapper,
			PanelHeaderAction,
			TableHead,
			TableBody,
			TableRow,
			TableColumnHead,
			TableRowCell,
			DocumentPlusIcon,
			AdjustmentsHorizontalIcon,
		},
		setup() {
			return { args, baseFields: sampleBaseFields };
		},
		template: `<PanelComponent>
		<PanelHeader>
			<h1>Base Fields</h1>
			<PanelHeaderActionsWrapper>
				<PanelHeaderAction>
					<DocumentPlusIcon class="icon" />
					<p class="download-csv-text">Download CSV template</p>
				</PanelHeaderAction>
				<PanelHeaderAction>
					<AdjustmentsHorizontalIcon class="icon" />
					<p>Add New Base Field</p>
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody >
			<TableComponent truncate>
				<TableHead fixed>
					<TableRow>
						<TableColumnHead>Label</TableColumnHead>
						<TableColumnHead>Description</TableColumnHead>
						<TableColumnHead>Short code</TableColumnHead>
						<TableColumnHead>Data type</TableColumnHead>
						<TableColumnHead>Category</TableColumnHead>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow v-for="field in baseFields" :key="field.shortCode">
						<TableRowCell>{{ field.label }}</TableRowCell>
						<TableRowCell>{{ field.description }}</TableRowCell>
						<TableRowCell>{{ field.shortCode }}</TableRowCell>
						<TableRowCell>{{ field.dataType }}</TableRowCell>
						<TableRowCell>{{ field.category }}</TableRowCell>
					</TableRow>
				</TableBody>
			</TableComponent>
		</PanelBody>
	</PanelComponent>`,
	}),
};

export const WithNoActions: Story = {
	render: (args) => ({
		components: {
			TableComponent,
			PanelComponent,
			PanelHeader,
			PanelBody,
			TableHead,
			TableBody,
			TableRow,
			TableColumnHead,
			TableRowCell,
		},
		setup() {
			return { args, baseFields: sampleBaseFields };
		},
		template: `<PanelComponent>
		<PanelHeader>
			<h1>Base Fields</h1>
		</PanelHeader>
		<PanelBody>
			<TableComponent truncate>
				<TableHead fixed>
					<TableRow>
						<TableColumnHead>Label</TableColumnHead>
						<TableColumnHead>Description</TableColumnHead>
						<TableColumnHead>Short code</TableColumnHead>
						<TableColumnHead>Data type</TableColumnHead>
						<TableColumnHead>Category</TableColumnHead>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow v-for="field in baseFields" :key="field.shortCode">
						<TableRowCell>{{ field.label }}</TableRowCell>
						<TableRowCell>{{ field.description }}</TableRowCell>
						<TableRowCell>{{ field.shortCode }}</TableRowCell>
						<TableRowCell>{{ field.dataType }}</TableRowCell>
						<TableRowCell>{{ field.category }}</TableRowCell>
					</TableRow>
				</TableBody>
			</TableComponent>
		</PanelBody>
	</PanelComponent>`,
	}),
};
