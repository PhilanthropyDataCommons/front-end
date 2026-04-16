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
import { usePermissionGrants } from '../../pdc-api';
import { getLogger } from '@pdc/utilities';
import {
	formatEntityLabel,
	type PermissionGrantRow,
} from '../../permissionsHelpers';

const logger = getLogger('<PermissionsView>');

const { data: permissionGrants, fetchData: fetchPermissionGrants } =
	usePermissionGrants();
const isLoading = ref(true);
const caughtError = ref(false);

const permissionGrantsArray = computed<PermissionGrantRow[]>(
	() =>
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SDK types omit grantee fields and type scope/verbs as opaque; see permissionsHelpers.ts
		(permissionGrants.value?.entries ?? []) as unknown as PermissionGrantRow[],
);

const columnHelper = createColumnHelper<PermissionGrantRow>();

const columns = [
	columnHelper.text('id', 'Id'),
	columnHelper.display('granteeType', 'Grantee Type', {
		cell: (info) => info.row.original.granteeType ?? '',
	}),
	columnHelper.text('contextEntityType', 'Context Entity'),
	columnHelper.display('entityLabel', 'Entity Label', {
		cell: (info) => formatEntityLabel(info.row.original),
		enableSorting: false,
	}),
	columnHelper.accessor('scope', 'Scope', {
		cell: (info) => info.getValue().join(', '),
	}),
	columnHelper.accessor('verbs', 'Verbs', {
		cell: (info) => info.getValue().join(', '),
	}),
	columnHelper.text('createdBy', 'Created By'),
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
