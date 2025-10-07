<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { usePutBaseFieldsCallback } from '../pdc-api';
import { BaseField } from '@pdc/sdk';
import BaseFieldForm from '../components/BaseFieldForm.vue';

const DEFAULT_RELEVANCE_HOURS = 0;
const router = useRouter();
const {
	DataTypeEnum: BaseFieldDataType,
	CategoryEnum: BaseFieldCategory,
	SensitivityClassificationEnum: BaseFieldSensitivityClassification,
} = BaseField;

const baseField = ref<BaseField>({
	shortCode: '',
	label: '',
	description: '',
	dataType: BaseFieldDataType.String,
	category: BaseFieldCategory.Organization,
	valueRelevanceHours: DEFAULT_RELEVANCE_HOURS,
	sensitivityClassification: BaseFieldSensitivityClassification.Public,
	createdAt: new Date().toISOString(),
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
		:is-creating="true"
		:handle-base-field-update="handleBaseFieldUpdate"
	/>
</template>

<style scoped></style>
