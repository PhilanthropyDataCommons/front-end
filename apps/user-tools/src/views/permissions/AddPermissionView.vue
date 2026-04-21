<script setup lang="ts">
import { useRouter } from 'vue-router';
import PermissionGrantForm from '../../components/permissions/PermissionGrantForm.vue';
import { useCreatePermissionGrantCallback } from '../../pdc-api';
import type { WritablePermissionGrantPayload } from '../../permissionsHelpers';

const router = useRouter();
const createPermissionGrant = useCreatePermissionGrantCallback();

const handleCreate = async (
	payload: WritablePermissionGrantPayload,
): Promise<void> => {
	await createPermissionGrant(payload);
	await router.push('/permissions');
};
</script>

<template>
	<PermissionGrantForm mode="create" :on-submit="handleCreate" />
</template>
