import { h, ref, watch } from 'vue';
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

const MANY_PEOPLE_COUNT = 70;
const PAGE_SIZE = 25;
const SMALL_PAGE_SIZE = 10;
const LARGE_PAGE_SIZE = 50;
const PAGE_SIZE_OPTIONS = [SMALL_PAGE_SIZE, PAGE_SIZE, LARGE_PAGE_SIZE];
const FAKE_SERVER_DELAY_MS = 300;
const BASE_AGE = 20;
const AGE_SPREAD = 40;
const FIRST_ID = 1;
const FIRST_PAGE = 1;
const STATUS_CYCLE = 2;
const ACTIVE_STATUS_REMAINDER = 0;

const manyPeople: Person[] = Array.from(
	{ length: MANY_PEOPLE_COUNT },
	(_, index) => {
		const id = (index + FIRST_ID).toString();
		return {
			id,
			firstName: `Person`,
			lastName: id,
			email: `person${id}@example.com`,
			age: BASE_AGE + (index % AGE_SPREAD),
			status:
				index % STATUS_CYCLE === ACTIVE_STATUS_REMAINDER
					? 'Active'
					: 'Inactive',
		};
	},
);

export const Paginated = (): object => ({
	components: { DataTable },
	setup() {
		const page = ref(FIRST_PAGE);
		const pageSize = ref(PAGE_SIZE);
		return {
			data: manyPeople,
			columns: basicColumns,
			page,
			pageSize,
			pageSizeOptions: PAGE_SIZE_OPTIONS,
		};
	},
	template: `
		<DataTable
			v-model:page="page"
			v-model:pageSize="pageSize"
			:data="data"
			:columns="columns"
			:pageSizeOptions="pageSizeOptions"
		/>
	`,
});

export const ServerPaginated = (): object => ({
	components: { DataTable },
	setup() {
		const page = ref(FIRST_PAGE);
		const rows = ref<Person[]>([]);
		const requests = ref<string[]>([]);
		const fetchPage = (pageNumber: number): void => {
			const start = (pageNumber - FIRST_PAGE) * PAGE_SIZE;
			requests.value.push(
				`_page=${pageNumber.toString()}&_count=${PAGE_SIZE.toString()}`,
			);
			setTimeout(() => {
				rows.value = manyPeople.slice(start, start + PAGE_SIZE);
			}, FAKE_SERVER_DELAY_MS);
		};
		watch(page, fetchPage, { immediate: true });
		return {
			page,
			rows,
			requests,
			columns: basicColumns,
			pageSize: PAGE_SIZE,
			rowCount: MANY_PEOPLE_COUNT,
		};
	},
	template: `
		<DataTable
			v-model:page="page"
			:data="rows"
			:columns="columns"
			:enableSorting="false"
			:pageSize="pageSize"
			:rowCount="rowCount"
		/>
		<p class="server-requests">Requests: {{ requests.join(', ') }}</p>
	`,
});
