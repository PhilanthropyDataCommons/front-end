<template>
	<div class="checkbox-input-container">
		<InputHeader>
			<template #header><slot name="header"></slot></template>
		</InputHeader>
		<InputInstructions>
			<template #instructions><slot name="instructions"></slot></template>
		</InputInstructions>
		<fieldset>
			<div
				v-for="(option, index) in options"
				:key="option.value"
				class="checkbox-input-container"
			>
				<div class="checkbox-input-option">
					<input
						:id="`checkbox-option-${index}-${name}-${option.value}`"
						v-model="modelValue"
						type="checkbox"
						:name="name"
						:value="option.value"
					/>
					<label :for="`checkbox-option-${index}-${name}-${option.value}`">{{
						option.label
					}}</label>
				</div>
				<p v-if="option.description" class="text-color-gray-medium-dark">
					{{ option.description }}
				</p>
			</div>
		</fieldset>
	</div>
</template>

<script setup lang="ts">
import InputHeader from './InputHeader.vue';
import InputInstructions from './InputInstructions.vue';

export interface CheckboxInputProps {
	options?: Array<{ label: string; value: string; description?: string }>;
	name?: string;
}

const modelValue = defineModel<string[]>({ default: () => [] });

const { options = [], name = 'checkbox-input' } =
	defineProps<CheckboxInputProps>();
</script>

<style scoped>
fieldset {
	border: none;
	padding: 0;
	margin-top: 10px;
}

legend {
	font-size: var(--font-size);
}

label {
	font-size: 20px;
}

.checkbox-input-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.checkbox-input-option {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--1x);
}
</style>
