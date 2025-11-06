<script setup lang="ts">
import { BaseField } from '@pdc/sdk';
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderActionsWrapper,
	PanelSection,
	DataSubmitButton,
	SelectInput,
	TextInput,
	RadioInput,
	BackButton,
	ErrorMessage,
} from '@pdc/components';
import { getLogger } from '@pdc/utilities';
import { ref, computed } from 'vue';
import RelevanceDurationInput from './RelevanceDurationInput.vue';
import CautionZone from './CautionZone.vue';

const props = defineProps<{
	baseField: BaseField;
	handleBaseFieldUpdate: (baseField: BaseField) => Promise<void>;
	isCreating?: boolean;
}>();
const {
	DataTypeEnum: BaseFieldDataType,
	CategoryEnum: BaseFieldCategory,
	SensitivityClassificationEnum: BaseFieldSensitivityClassification,
} = BaseField;
const emit = defineEmits<{ 'update:base-field': [baseField: BaseField] }>();
const logger = getLogger('BaseFieldForm');
const hadError = ref(false);
const errorMessage = ref('');
const initialLabel = ref(props.baseField.label);
const hasFormBeenEdited = ref(false);

const handleFormSubmit = async (event: Event): Promise<void> => {
	event.preventDefault();
	try {
		await props.handleBaseFieldUpdate(props.baseField);
	} catch (error) {
		logger.error({ error }, 'Failed to submit base field');
		errorMessage.value =
			error instanceof Error ? error.message : 'Failed to save base field';
		hadError.value = true;
	}
};

const isFormValid = computed((): boolean => {
	const { baseField } = props;
	return (
		baseField.label.trim() !== '' &&
		(!props.isCreating || baseField.shortCode.trim() !== '') &&
		baseField.description.trim() !== '' &&
		Boolean(baseField.dataType) &&
		Boolean(baseField.category) &&
		Boolean(baseField.sensitivityClassification)
	);
});

const updateField = (field: string, value: string | number | null): void => {
	hadError.value = false;
	errorMessage.value = '';
	hasFormBeenEdited.value = true;
	emit('update:base-field', { ...props.baseField, [field]: value });
};
</script>

<template>
	<PanelComponent padded>
		<PanelHeader>
			<h1>{{ initialLabel }}</h1>
			<PanelHeaderActionsWrapper>
				<BackButton to="/basefields" label="Back to base fields" />
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody variant="data-panel-padded">
			<form @submit="handleFormSubmit">
				<PanelSection>
					<template #header>
						<h3>General Information</h3>
					</template>
					<template #content>
						<TextInput
							:model-value="props.baseField.label"
							@update:model-value="(value) => updateField('label', value || '')"
						>
							<template #header>Label</template>
							<template #instructions>
								A human-readable name for this base field
							</template>
						</TextInput>
						<TextInput
							v-if="props.isCreating"
							:model-value="props.baseField.shortCode || ''"
							@update:model-value="
								(value) => updateField('shortCode', value || '')
							"
						>
							<template #header>Short Code</template>
							<template #instructions>
								A unique identifier for this base field
							</template>
						</TextInput>
						<TextInput
							:model-value="props.baseField.description || ''"
							@update:model-value="
								(value) => updateField('description', value || '')
							"
						>
							<template #header>Description</template>
							<template #instructions>
								A detailed description of this base field
							</template>
						</TextInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<h3>Data Configuration</h3>
					</template>
					<template #content>
						<SelectInput
							:model-value="props.baseField.dataType"
							:options="
								Object.values(BaseFieldDataType).map((dataType) => ({
									label: dataType,
									value: dataType,
								}))
							"
							@update:model-value="
								(value) => updateField('dataType', value || '')
							"
						>
							<template #header>Data Type</template>
							<template #instructions>
								The type of data this field will store
							</template>
						</SelectInput>
						<SelectInput
							:model-value="props.baseField.category || ''"
							:options="
								Object.values(BaseFieldCategory).map((category) => ({
									label: category,
									value: category,
								}))
							"
							@update:model-value="
								(value) => updateField('category', value || '')
							"
						>
							<template #header>Category</template>
							<template #instructions>
								The category this field belongs to
							</template>
						</SelectInput>
						<RelevanceDurationInput
							:model-value="props.baseField.valueRelevanceHours"
							@update:model-value="
								(value: number | null | undefined) =>
									updateField('valueRelevanceHours', value ?? null)
							"
						>
							<template #header>Relevance Duration</template>
							<template #instructions>
								How long values in this field remain relevant
							</template>
						</RelevanceDurationInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<h3>Sensitivity Classification</h3>
					</template>
					<template #content>
						<CautionZone>
							<template #description>
								Choose these settings thoughtfully, as changing them later may
								trigger data loss or break external integrations. Read
								descriptions carefully and confirm your selections before
								saving.
							</template>
							<template #default="{ isUnlocked }">
								<RadioInput
									:model-value="props.baseField.sensitivityClassification"
									name="sensitivityClassification"
									:options="
										Object.values(BaseFieldSensitivityClassification).map(
											(sensitivityClassification) => ({
												label: sensitivityClassification,
												value: sensitivityClassification,
											}),
										)
									"
									@update:model-value="
										(value: string | null | undefined) => {
											if (isUnlocked && value) {
												updateField('sensitivityClassification', value);
											}
										}
									"
								>
									<template #header>Classification Level</template>
									<template #instructions>
										Select the appropriate sensitivity level for this field
									</template>
								</RadioInput>
							</template>
						</CautionZone>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<div v-if="isFormValid">
							<h3>Ready to save</h3>
							<p class="text-color-gray-medium-dark">
								All required fields are completed.
							</p>
						</div>
						<div v-else>
							<h3>Complete all fields</h3>
							<p class="text-color-gray-medium-dark">
								Please fill in all required fields above.
							</p>
						</div>
					</template>
					<template #content>
						<DataSubmitButton :disabled="!isFormValid || !hasFormBeenEdited">{{
							props.isCreating ? 'Create Base Field' : 'Save Changes'
						}}</DataSubmitButton>
						<ErrorMessage v-if="hadError" :message="errorMessage" />
					</template>
				</PanelSection>
			</form>
		</PanelBody>
	</PanelComponent>
</template>
