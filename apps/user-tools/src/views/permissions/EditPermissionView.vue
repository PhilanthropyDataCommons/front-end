<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getLogger } from '@pdc/utilities';
import PermissionGrantForm from '../../components/permissions/PermissionGrantForm.vue';
import {
	usePermissionGrant,
	useUpdatePermissionGrantCallback,
	useDeletePermissionGrantCallback,
} from '../../pdc-api';
import {
	rowToFormState,
	type PermissionGrantFormState,
	type PermissionGrantRow,
	type WritablePermissionGrantPayload,
} from '../../permissionsHelpers';

const logger = getLogger('<EditPermissionView>');
const route = useRoute();
const router = useRouter();

const {
	params: { id: rawId },
} = route;
const permissionGrantId = Number(rawId);

const initialValue = ref<PermissionGrantFormState | null>(null);
const loadError = ref(false);

const updateGrant = useUpdatePermissionGrantCallback(permissionGrantId);
const deleteGrant = useDeletePermissionGrantCallback(permissionGrantId);

onMounted(async () => {
	try {
		const grant = await usePermissionGrant(permissionGrantId);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SDK types omit grantee fields the API returns; see permissionsHelpers.ts
		initialValue.value = rowToFormState(grant as unknown as PermissionGrantRow);
	} catch (error) {
		logger.error({ error }, 'Failed to load permission grant');
		loadError.value = true;
	}
});

const handleUpdate = async (
	payload: WritablePermissionGrantPayload,
): Promise<void> => {
	await updateGrant(payload);
	await router.push('/permissions');
};

const handleDelete = async (): Promise<void> => {
	// eslint-disable-next-line no-alert -- intentional confirm() for destructive action; upgrade to modal TBD
	const confirmed = window.confirm(
		`Delete permission grant #${permissionGrantId.toString()}? This cannot be undone.`,
	);
	if (!confirmed) return;
	await deleteGrant();
	await router.push('/permissions');
};
</script>

<template>
	<div v-if="loadError">
		<p>Error loading permission grant.</p>
	</div>
	<div v-else-if="initialValue === null">
		<p>Loading permission grant...</p>
	</div>
	<PermissionGrantForm
		v-else
		mode="edit"
		:title="`Permission #${permissionGrantId.toString()}`"
		:initial-value="initialValue"
		:on-submit="handleUpdate"
		:on-delete="handleDelete"
	/>
</template>
