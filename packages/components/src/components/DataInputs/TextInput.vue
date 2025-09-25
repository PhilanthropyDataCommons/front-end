<template>
	<div class="text-input-container">
		<div class="text-input-header">
			<slot name="text-input-header"></slot>
		</div>

		<input v-model="modelValue" type="text" />
		<div class="text-input-instructions">
			<slot name="text-input-instructions"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
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

.text-color-gray-medium-dark {
	color: var(--color--gray--medium-dark);
}
</style>
