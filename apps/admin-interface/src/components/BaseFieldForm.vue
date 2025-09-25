<script setup lang="ts">
import { BaseField } from '@pdc/sdk';
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	PanelSection,
	DataSubmitButton,
	SelectInput,
	TextInput,
	RadioInput,
} from '@pdc/components';
import {
	ArrowLeftIcon,
	XCircleIcon,
	LockClosedIcon,
	LockOpenIcon,
} from '@heroicons/vue/24/outline';
import { RouterLink } from 'vue-router';
import { getLogger } from '@pdc/utilities';
import { ref, computed } from 'vue';
import RelevanceDurationInput from './RelevanceDurationInput.vue';

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
const cautionZoneUnlocked = ref(false);
const initialLabel = ref(props.baseField.label);

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
	emit('update:base-field', { ...props.baseField, [field]: value });
};
</script>

<template>
	<PanelComponent padded>
		<PanelHeader>
			<h1>{{ initialLabel }}</h1>
			<PanelHeaderActionsWrapper>
				<PanelHeaderAction>
					<ArrowLeftIcon class="icon" />
					<RouterLink to="/basefields">Back to base fields</RouterLink>
				</PanelHeaderAction>
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
							<template #text-input-header><h4>Label</h4></template>
							<template #text-input-instructions
								><p class="text-color-gray-medium-dark">
									A human-readable name for this base field
								</p></template
							>
						</TextInput>
						<TextInput
							v-if="props.isCreating"
							:model-value="props.baseField.shortCode || ''"
							@update:model-value="
								(value) => updateField('shortCode', value || '')
							"
						>
							<template #text-input-header><h4>Short Code</h4></template>
							<template #text-input-instructions
								><p class="text-color-gray-medium-dark">
									A unique identifier for this base field
								</p></template
							>
						</TextInput>
						<TextInput
							:model-value="props.baseField.description || ''"
							@update:model-value="
								(value) => updateField('description', value || '')
							"
						>
							<template #text-input-header><h4>Description</h4></template>
							<template #text-input-instructions
								><p class="text-color-gray-medium-dark">
									A detailed description of this base field
								</p></template
							>
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
							<template #select-input-header><h4>Data Type</h4></template>
							<template #select-input-instructions
								><p class="text-color-gray-medium-dark">
									The type of data this field will store
								</p></template
							>
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
							<template #select-input-header><h4>Category</h4></template>
							<template #select-input-instructions
								><p class="text-color-gray-medium-dark">
									The category this field belongs to
								</p></template
							>
						</SelectInput>
						<RelevanceDurationInput
							:model-value="props.baseField.valueRelevanceHours"
							@update:model-value="
								(value: number | null | undefined) =>
									updateField('valueRelevanceHours', value ?? null)
							"
						>
							<template #radio-input-header
								><h4>Relevance Duration</h4></template
							>
							<template #radio-input-instructions
								><p class="text-color-gray-medium-dark">
									How long values in this field remain relevant
								</p></template
							>
						</RelevanceDurationInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<h3>Sensitivity Classification</h3>
					</template>
					<template #content>
						<div class="caution-zone-container">
							<div class="caution-zone-header">
								<div class="caution-zone-title-row">
									<h4>Caution Zone</h4>
									<button
										type="button"
										class="lock-toggle"
										@click="cautionZoneUnlocked = !cautionZoneUnlocked"
									>
										<LockClosedIcon v-if="!cautionZoneUnlocked" class="icon" />
										<LockOpenIcon v-else class="icon" />
										{{ cautionZoneUnlocked ? 'Lock' : 'Unlock' }}
									</button>
								</div>
								<p class="text-color-gray-medium-dark">
									This setting affects data privacy and compliance requirements.
								</p>
							</div>
							<div
								class="radio-input-wrapper"
								:class="{ disabled: !cautionZoneUnlocked }"
							>
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
											if (cautionZoneUnlocked && value) {
												updateField('sensitivityClassification', value);
											}
										}
									"
								>
									<template #radio-input-header
										><h4>Classification Level</h4></template
									>
									<template #radio-input-instructions
										><p class="text-color-gray-medium-dark">
											Select the appropriate sensitivity level for this field
										</p></template
									>
								</RadioInput>
							</div>
						</div>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<div v-if="isFormValid">
							<h3>Ready to save</h3>
							<p class="text-color-gray-medium-dark">
								All required fields have been completed.
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
						<DataSubmitButton :disabled="!isFormValid">{{
							props.isCreating ? 'Create Base Field' : 'Save Changes'
						}}</DataSubmitButton>
						<div v-if="hadError" class="error-message">
							<XCircleIcon class="icon" />
							<p>{{ errorMessage }}</p>
						</div>
					</template>
				</PanelSection>
			</form>
		</PanelBody>
	</PanelComponent>
</template>

<style scoped>
.caution-zone-container {
	border: 2px solid var(--color--red--dark);
	padding: var(--fixed-spacing--1x);
	border-radius: var(--fixed-spacing--halfx);
}
.caution-zone-header {
	display: flex;
	flex-direction: column;
}
.caution-zone-title-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--fixed-spacing--1x);
}
.caution-zone-header h4 {
	background-color: var(--color--red);
	color: var(--color--white);
	padding: var(--fixed-spacing--halfx);
	border-radius: var(--fixed-spacing--halfx);
	text-align: center;
	flex: 1;
	margin: 0;
}
.lock-toggle {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--halfx);
	background: none;
	border: none;
	width: 100%;
	justify-content: center;
	padding: var(--fixed-spacing--halfx);
	cursor: pointer;
	font-size: var(--font-size);
	transition: 0.2s;
}
.lock-toggle:hover {
	background-color: var(--color--gray--light);
}
.lock-toggle .icon {
	width: 16px;
	height: 16px;
}
.radio-input-wrapper.disabled {
	opacity: 0.5;
	pointer-events: none;
}
.error-message {
	color: var(--color--red--dark);
	display: flex;
	align-items: center;
}
</style>
