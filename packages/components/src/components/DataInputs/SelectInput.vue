<template>
	<div class="select-input-container">
		<div class="select-input-header">
			<slot name="select-input-header"></slot>
		</div>

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
		<div class="select-input-instructions">
			<slot name="select-input-instructions"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
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

.text-color-gray-medium-dark {
	color: var(--color--gray--medium-dark);
}
</style>
