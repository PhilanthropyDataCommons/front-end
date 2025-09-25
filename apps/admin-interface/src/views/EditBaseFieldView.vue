<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useBaseFields, usePutBaseFieldsCallback } from '../pdc-api';
import type { BaseField } from '@pdc/sdk';
import { getLogger } from '@pdc/utilities';
import BaseFieldForm from '../components/BaseFieldForm.vue';

const logger = getLogger('<EditBaseFieldView>');
const isLoading = ref(true);
const router = useRouter();
const {
	params: { shortCode: baseFieldShortCode },
} = useRoute();
const baseField = ref<BaseField | undefined>(undefined);
const { data: baseFields, fetchData: fetchBaseFields } = useBaseFields();

onMounted(async () => {
	try {
		await fetchBaseFields();
		baseField.value = baseFields.value?.find(
			(baseField) => baseField.shortCode === baseFieldShortCode,
		);
	} catch (error: unknown) {
		logger.error({ error }, 'Failed to load base fields');
	} finally {
		isLoading.value = false;
	}
});

const handleBaseFieldUpdate = async (
	updatedBaseField: BaseField,
): Promise<void> => {
	const putBaseField = usePutBaseFieldsCallback(updatedBaseField.shortCode);
	await putBaseField(updatedBaseField);
	baseField.value = updatedBaseField;
	void router.push(`/basefields`);
};
</script>

<template>
	<BaseFieldForm
		v-if="baseField"
		v-model:base-field="baseField"
		:handle-base-field-update="handleBaseFieldUpdate"
	/>
</template>

<style scoped></style>
