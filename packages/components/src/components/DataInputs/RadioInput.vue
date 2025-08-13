<template>
	<div class="radio-input-container">
		<div class="radio-input-header">
			<slot class="header" name="radio-input-header"></slot>
		</div>

		<fieldset>
			<legend>Select a maintenance drone:</legend>
			<div>
				<input type="radio" id="huey" name="drone" value="huey" checked />
				<label for="huey">Huey</label>
			</div>

			<div>
				<input type="radio" id="dewey" name="drone" value="dewey" />
				<label for="dewey">Dewey</label>
			</div>

			<div>
				<input type="radio" id="louie" name="drone" value="louie" />
				<label for="louie">Louie</label>
			</div>
		</fieldset>
		<div class="radio-input-instructions">
			<slot name="radio-input-instructions"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string | null>();

const { options = undefined } = defineProps<{
	options?: { label: string | undefined; value: string | undefined }[];
}>();
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
