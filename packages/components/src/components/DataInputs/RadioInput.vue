<template>
	<div class="radio-input-container">
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
				class="radio-input-container"
			>
				<div class="radio-input-option">
					<input
						:id="`radio-option-${index}-${name}-${option.value}`"
						v-model="modelValue"
						type="radio"
						:name="name"
						:value="option.value"
					/>
					<label :for="`radio-option-${index}-${name}-${option.value}`">{{
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

export interface RadioInputProps {
	options?: Array<{ label: string; value: string; description?: string }>;
	name?: string;
}

const modelValue = defineModel<string | null>();

const { options = [], name = 'radio-input' } = defineProps<RadioInputProps>();
</script>

<style scoped>
select {
	margin-top: var(--accessible-spacing--1x);

	border: 2px solid var(--color--gray--light);
	border-radius: var(--fixed-spacing--halfx);
	background: white;
	width: 100%;
	padding: 10px;
	transition: 0.4s;
	font-size: var(--font-size);
}

select::picker-icon {
	width: 40px;
}

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

.radio-input-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.radio-input-option {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--1x);
}
</style>
