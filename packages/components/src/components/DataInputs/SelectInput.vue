<template>
	<div class="select-input-container">
		<InputHeader>
			<template #header><slot name="header"></slot></template>
		</InputHeader>
		<InputInstructions>
			<template #instructions><slot name="instructions"></slot></template>
		</InputInstructions>
		<select v-model="modelValue">
			<option value=""></option>
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
			>
				{{ option.label }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
import InputHeader from './InputHeader.vue';
import InputInstructions from './InputInstructions.vue';

const modelValue = defineModel<string | null>();
export interface SelectInputProps {
	options?: Array<{ label: string | undefined; value: string | undefined }>;
}
const { options = undefined } = defineProps<SelectInputProps>();
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
</style>
