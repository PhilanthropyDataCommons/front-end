<script setup lang="tsx">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	DataTable,
	EditIconLink,
	createColumnHelper,
} from '@pdc/components';
import { RouterLink } from 'vue-router';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref, computed, h } from 'vue';
import {
	usePermissionGrants,
	useChangemakers,
	useFunders,
	useDataProviders,
	useOpportunities,
	useApplicationForms,
	useSources,
} from '../../pdc-api';
import { getLogger } from '@pdc/utilities';
import {
	buildEntityLabelLookup,
	humanLabel,
	isEntityLabelPending,
	resolveEntityLabel,
	type ContextEntityType,
	type PermissionGrantRow,
} from '../../permissionsHelpers';

const logger = getLogger('<PermissionsView>');

const { data: permissionGrants, fetchData: fetchPermissionGrants } =
	usePermissionGrants();
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
const isLoading = ref(true);
const caughtError = ref(false);

const permissionGrantsArray = computed<PermissionGrantRow[]>(
	() => permissionGrants.value?.entries ?? [],
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

onMounted(async () => {
	try {
		await fetchPermissionGrants();
	} catch (error: unknown) {
		if (error instanceof Error) {
			logger.error({ error }, `Failed to load data: ${error.message}`);
		}
		caughtError.value = true;
	} finally {
		isLoading.value = false;
	}
});
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
			<div v-if="caughtError">
				<p>Error loading permissions</p>
			</div>
			<div
				v-if="isLoading && !caughtError"
				class="text-center py-8 text-gray-500"
			>
				<p>Loading permissions...</p>
			</div>

			<DataTable
				v-else-if="permissionGrantsArray.length > 0 && !caughtError"
				:data="permissionGrantsArray"
				:columns="columns"
				:enable-column-resizing="true"
			/>

			<div v-else-if="!caughtError">
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
