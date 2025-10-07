<template>
	<div class="text-input-container">
		<InputHeader>
			<template #header><slot name="header"></slot></template>
		</InputHeader>

		<input v-model="modelValue" type="text" />

		<InputInstructions>
			<template #instructions><slot name="instructions"></slot></template>
		</InputInstructions>
	</div>
</template>

<script setup lang="ts">
import InputHeader from './InputHeader.vue';
import InputInstructions from './InputInstructions.vue';

const modelValue = defineModel<string | null>();
</script>

<style scoped>
input {
	margin-top: var(--accessible-spacing--1x);

	border: 2px solid var(--color--gray--light);
	border-radius: var(--fixed-spacing--halfx);
	background: white;
	width: 100%;
	padding: 10px;
	transition: 0.4s;
	font-size: var(--font-size);
}
</style>
