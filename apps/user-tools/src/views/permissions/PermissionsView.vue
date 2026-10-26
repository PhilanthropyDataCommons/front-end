<script setup lang="tsx">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	DataTable,
	EditIconLink,
	ErrorMessage,
	createColumnHelper,
} from '@pdc/components';
import { RouterLink } from 'vue-router';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { ref, computed, h, nextTick, watch } from 'vue';
import {
	usePermissionGrants,
	useChangemakers,
	useFunders,
	useDataProviders,
	useOpportunities,
	useApplicationForms,
	useSources,
} from '../../pdc-api';
import {
	buildEntityLabelLookup,
	humanLabel,
	isEntityLabelPending,
	resolveEntityLabel,
	type ContextEntityType,
	type PermissionGrantRow,
} from '../../permissionsHelpers';

const SMALL_PAGE_SIZE = 10;
const DEFAULT_PERMISSIONS_PAGE_SIZE = 25;
const LARGE_PAGE_SIZE = 50;
const LARGEST_PAGE_SIZE = 100;
const PERMISSIONS_PAGE_SIZE_OPTIONS = [
	SMALL_PAGE_SIZE,
	DEFAULT_PERMISSIONS_PAGE_SIZE,
	LARGE_PAGE_SIZE,
	LARGEST_PAGE_SIZE,
];
const FIRST_PAGE = 1;

const page = ref(FIRST_PAGE);
const pageSize = ref(DEFAULT_PERMISSIONS_PAGE_SIZE);

const {
	data: permissionGrants,
	isLoading: permissionGrantsLoading,
	error: permissionGrantsError,
	fetchData: fetchPermissionGrants,
} = usePermissionGrants(page, pageSize);
const { data: changemakers, isLoading: changemakersLoading } =
	useChangemakers();
const { data: funders, isLoading: fundersLoading } = useFunders();
const { data: dataProviders, isLoading: dataProvidersLoading } =
	useDataProviders();
const { data: opportunities, isLoading: opportunitiesLoading } =
	useOpportunities();
const { data: applicationForms, isLoading: applicationFormsLoading } =
	useApplicationForms();
const { data: sources, isLoading: sourcesLoading } = useSources();

const loadedPermissionGrants = ref<typeof permissionGrants.value>(null);
const loadedPage = ref(FIRST_PAGE);
const loadedPageSize = ref(DEFAULT_PERMISSIONS_PAGE_SIZE);
const pageLoadFailed = ref(false);
watch(permissionGrants, (bundle) => {
	if (bundle === null) return;
	const { value: requestedPage } = page;
	const { value: requestedPageSize } = pageSize;
	const lastPage = Math.max(
		Math.ceil(bundle.total / requestedPageSize),
		FIRST_PAGE,
	);
	if (requestedPage > lastPage) {
		page.value = lastPage;
		return;
	}
	loadedPermissionGrants.value = bundle;
	loadedPage.value = requestedPage;
	loadedPageSize.value = requestedPageSize;
});
watch(permissionGrantsError, (error) => {
	if (error === null || loadedPermissionGrants.value === null) return;
	pageLoadFailed.value = true;
});
const retryFailedRequest = async (): Promise<void> => {
	pageLoadFailed.value = false;
	await fetchPermissionGrants();
};
interface PageRequest {
	page?: number;
	pageSize?: number;
}
let pendingPageRequest: PageRequest | null = null;
const sendPendingPageRequest = async (): Promise<void> => {
	if (pendingPageRequest === null) return;
	const {
		page: requestedPage = loadedPage.value,
		pageSize: requestedPageSize = loadedPageSize.value,
	} = pendingPageRequest;
	pendingPageRequest = null;
	if (requestedPage === page.value && requestedPageSize === pageSize.value) {
		if (pageLoadFailed.value) await retryFailedRequest();
		return;
	}
	page.value = requestedPage;
	pageSize.value = requestedPageSize;
};
const queuePageRequest = (change: PageRequest): void => {
	const isFirstChange = pendingPageRequest === null;
	pendingPageRequest = { ...pendingPageRequest, ...change };
	if (isFirstChange) {
		void nextTick().then(sendPendingPageRequest);
	}
};
const requestPage = (requested: number | undefined): void => {
	queuePageRequest({ page: requested ?? FIRST_PAGE });
};
const requestPageSize = (requested: number | undefined): void => {
	queuePageRequest({ pageSize: requested ?? DEFAULT_PERMISSIONS_PAGE_SIZE });
};
watch([page, pageSize], () => {
	pageLoadFailed.value = false;
});

const permissionGrantsArray = computed<PermissionGrantRow[]>(
	() => loadedPermissionGrants.value?.entries ?? [],
);

const entityLabelLookup = computed(() =>
	buildEntityLabelLookup({
		changemaker: changemakers.value?.entries,
		funder: funders.value?.entries,
		dataProvider: dataProviders.value?.entries,
		opportunity: opportunities.value?.entries,
		applicationForm: applicationForms.value?.entries,
		source: sources.value?.entries,
	}),
);

const labelEntityLoading = [
	['changemaker', changemakersLoading],
	['funder', fundersLoading],
	['dataProvider', dataProvidersLoading],
	['opportunity', opportunitiesLoading],
	['applicationForm', applicationFormsLoading],
	['source', sourcesLoading],
] as const satisfies ReadonlyArray<readonly [ContextEntityType, unknown]>;

const loadingEntityTypes = computed(
	() =>
		new Set(
			labelEntityLoading
				.filter(([, loading]) => loading.value)
				.map(([type]) => type),
		),
);

const columnHelper = createColumnHelper<PermissionGrantRow>();

const columns = [
	columnHelper.text('id', 'Id'),
	columnHelper.display('granteeType', 'Grantee Type', {
		cell: (info) => {
			const {
				row: {
					original: { granteeType },
				},
			} = info;
			return typeof granteeType === 'string' ? humanLabel(granteeType) : '';
		},
	}),
	columnHelper.display('contextEntityType', 'Context Entity', {
		cell: (info) => humanLabel(info.row.original.contextEntityType),
	}),
	columnHelper.display('entityLabel', 'Entity Label', {
		cell: (info) => {
			const {
				row: { original: row },
			} = info;
			if (isEntityLabelPending(row, loadingEntityTypes.value)) {
				return h(
					'span',
					{ class: 'text-gray-500', 'aria-busy': 'true' },
					'Loading…',
				);
			}
			return resolveEntityLabel(row, entityLabelLookup.value);
		},
		enableSorting: false,
	}),
	columnHelper.accessor('scope', 'Scope', {
		cell: (info) => info.getValue().map(humanLabel).join(', '),
	}),
	columnHelper.accessor('verbs', 'Verbs', {
		cell: (info) => info.getValue().map(humanLabel).join(', '),
	}),
	columnHelper.text('createdByUser.keycloakUserName', 'Created By'),
	columnHelper.icon('edit', '', (row) =>
		h(EditIconLink, { to: `/permissions/${String(row.id ?? '')}` }),
	),
];
</script>

<template>
	<PanelComponent>
		<PanelHeader>
			<h1>Permissions</h1>
			<PanelHeaderActionsWrapper>
				<PanelHeaderAction>
					<PlusIcon class="icon" />
					<RouterLink to="/permissions/add">New permission grant</RouterLink>
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody>
			<div v-if="loadedPermissionGrants === null && permissionGrantsError">
				<p>Error loading permissions</p>
			</div>
			<div
				v-else-if="loadedPermissionGrants === null && permissionGrantsLoading"
				class="text-center py-8 text-gray-500"
			>
				<p>Loading permissions...</p>
			</div>
			<template v-else-if="permissionGrantsArray.length > 0">
				<ErrorMessage
					v-if="pageLoadFailed"
					message="That page of permissions couldn't be loaded. Showing the last page that loaded."
				/>
				<p
					v-if="
						permissionGrantsLoading &&
						(page !== loadedPage || pageSize !== loadedPageSize)
					"
					class="text-gray-500"
					aria-live="polite"
				>
					Loading page {{ page }}…
				</p>
				<DataTable
					:page="loadedPage"
					:data="permissionGrantsArray"
					:columns="columns"
					:enable-column-resizing="true"
					:enable-sorting="false"
					:page-size="loadedPageSize"
					:page-size-options="PERMISSIONS_PAGE_SIZE_OPTIONS"
					:row-count="loadedPermissionGrants?.total"
					@update:page="requestPage"
					@update:page-size="requestPageSize"
				/>
			</template>
			<div v-else>
				<p>No permissions found</p>
			</div>
		</PanelBody>
	</PanelComponent>
</template>

<style scoped>
:deep(.pencil-icon) {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
