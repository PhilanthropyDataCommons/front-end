<template>
	<div class="file-upload-container">
		<div class="file-upload-header">
			<slot class="header" name="file-upload-header"></slot>
		</div>
		<label for="file-input" class="file-upload-area">
			<div v-if="!file" class="upload-text">Click to upload file</div>
			<div v-else class="uploaded-file">
				<span class="file-name">{{ file.name }}</span>
				<button @click.prevent="removeFile" class="remove-btn">×</button>
			</div>
		</label>
		<input
			id="file-input"
			type="file"
			@change="handleFileSelect"
			accept=".csv"
			class="hidden-input"
		/>
		<div class="file-upload-instructions">
			<slot name="file-upload-instructions"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
const file = defineModel<File | null>();

const emit = defineEmits<{
	(e: 'changed', file: File | null): void;
}>();

function handleFileSelect(e: Event) {
	const input = e.target as HTMLInputElement;
	const selectedFile = input?.files?.[0] || null;
	file.value = selectedFile;
	emit('changed', file.value);
}

function removeFile() {
	file.value = null;
	emit('changed', file.value);
}
</script>

<style scoped>
.file-upload-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: var(--accessible-spacing--1x);
}

.file-upload-area {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 120px;
	padding: var(--accessible-spacing--2x);
	background-color: var(--color--white);
	border: 2px solid var(--color--gray--light);
	border-radius: var(--fixed-spacing--halfx);
	cursor: pointer;
	transition:
		background-color var(--transition-duration--cursor),
		border-color var(--transition-duration--cursor);
}

.file-upload-area:hover {
	background-color: var(--color--gray--lighter);
	border-color: var(--color--gray--medium-dark);
}

.upload-text {
	color: var(--color--gray--medium-dark);
	font-size: var(--font-size);
	text-align: center;
}

.uploaded-file {
	display: flex;
	align-items: center;
	gap: var(--accessible-spacing--1x);
	width: 100%;
	justify-content: center;
	padding: var(--fixed-spacing--1x) var(--accessible-spacing--1x);
}

.file-name {
	color: var(--color--gray--dark);
	font-size: var(--font-size--sm);
}

.remove-btn {
	background: none;
	border: none;
	color: var(--color--gray--medium);
	cursor: pointer;
	font-size: 18px;
	line-height: 1;
	padding: 0;
	width: var(--accessible-spacing--2x);
	height: var(--accessible-spacing--2x);
	display: flex;
	align-items: center;
	justify-content: center;
	transition: color var(--transition-duration--cursor);
}

.remove-btn:hover {
	color: var(--color--gray--medium-dark);
}

.hidden-input {
	display: none;
}
</style>
