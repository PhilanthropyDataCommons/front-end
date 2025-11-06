<template>
	<div class="input-instructions">
		<p class="text-color-gray-medium-dark">
			<slot name="instructions"></slot>
		</p>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.input-instructions p {
	margin-top: var(--accessible-spacing--halfx);
	margin-bottom: var(--accessible-spacing--halfx);
}
</style>
