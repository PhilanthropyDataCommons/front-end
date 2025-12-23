import { h } from 'vue';
import { createColumnHelper, DataTable } from '../components/Table';

interface Person {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	status: string;
}

const AGE_COLUMN_SIZE = 80;
const STATUS_COLUMN_SIZE = 100;
const ACTIONS_COLUMN_SIZE = 80;

const SAMPLE_AGE_1 = 32;
const SAMPLE_AGE_2 = 28;
const SAMPLE_AGE_3 = 45;
const SAMPLE_AGE_4 = 36;
const SAMPLE_AGE_5 = 29;

const sampleData: Person[] = [
	{
		id: '1',
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@example.com',
		age: SAMPLE_AGE_1,
		status: 'Active',
	},
	{
		id: '2',
		firstName: 'Jane',
		lastName: 'Smith',
		email: 'jane.smith@example.com',
		age: SAMPLE_AGE_2,
		status: 'Active',
	},
	{
		id: '3',
		firstName: 'Bob',
		lastName: 'Johnson',
		email: 'bob.johnson@example.com',
		age: SAMPLE_AGE_3,
		status: 'Inactive',
	},
	{
		id: '4',
		firstName: 'Alice',
		lastName: 'Williams',
		email: 'alice.williams@example.com',
		age: SAMPLE_AGE_4,
		status: 'Active',
	},
	{
		id: '5',
		firstName: 'Charlie',
		lastName: 'Brown',
		email: 'charlie.brown@example.com',
		age: SAMPLE_AGE_5,
		status: 'Pending',
	},
];

const columnHelper = createColumnHelper<Person>();

const basicColumns = [
	columnHelper.text('firstName', 'First Name'),
	columnHelper.text('lastName', 'Last Name'),
	columnHelper.text('email', 'Email'),
	columnHelper.text('age', 'Age', { size: AGE_COLUMN_SIZE }),
	columnHelper.text('status', 'Status', { size: STATUS_COLUMN_SIZE }),
];

const columnsWithActions = [
	...basicColumns,
	columnHelper.action(
		'actions',
		'Actions',
		(row) => {
			// eslint-disable-next-line no-alert -- Alert is appropriate for demo purposes in Storybook
			alert(`Edit ${row.firstName}`);
			return h('button', {}, 'Edit');
		},
		{ size: ACTIONS_COLUMN_SIZE },
	),
];

export default {
	title: 'Components/DataTable',
	component: DataTable,
	tags: ['autodocs'],
};

export const Default = (): object => ({
	components: { DataTable },
	setup() {
		return {
			data: sampleData,
			columns: basicColumns,
		};
	},
	template: `
		<DataTable
			:data="data"
			:columns="columns"
		/>
	`,
});

export const WithSorting = (): object => ({
	components: { DataTable },
	setup() {
		return {
			data: sampleData,
			columns: basicColumns,
		};
	},
	template: `
		<DataTable
			:data="data"
			:columns="columns"
			:enableSorting="true"
		/>
	`,
});

export const WithResizing = (): object => ({
	components: { DataTable },
	setup() {
		return {
			data: sampleData,
			columns: basicColumns,
		};
	},
	template: `
		<DataTable
			:data="data"
			:columns="columns"
			:enableSorting="false"
			:enableColumnResizing="true"
		/>
	`,
});

export const WithActions = (): object => ({
	components: { DataTable },
	setup() {
		return {
			data: sampleData,
			columns: columnsWithActions,
		};
	},
	template: `
		<DataTable
			:data="data"
			:columns="columns"
		/>
	`,
});

export const Truncated = (): object => ({
	components: { DataTable },
	setup() {
		return {
			data: sampleData,
			columns: basicColumns,
		};
	},
	template: `
		<DataTable
			:data="data"
			:columns="columns"
			:truncate="true"
		/>
	`,
});

export const SortingDisabled = (): object => ({
	components: { DataTable },
	setup() {
		return {
			data: sampleData,
			columns: basicColumns,
		};
	},
	template: `
		<DataTable
			:data="data"
			:columns="columns"
			:enableSorting="false"
		/>
	`,
});
