<template>
	<div class="file-upload-container">
		<InputHeader>
			<template #header><slot name="header"></slot></template>
		</InputHeader>

		<label :for="props.id" class="file-upload-area">
			<div v-if="!file" class="upload-text">Select a file to upload</div>
			<div v-else class="uploaded-file">
				<span class="file-name">{{ file.name }}</span>
				<button class="remove-btn" @click.prevent="removeFile">×</button>
			</div>
		</label>
		<input
			:id="props.id"
			class="hidden-input"
			type="file"
			:accept="props.accept"
			@change="handleFileSelect"
		/>

		<InputInstructions>
			<template #instructions><slot name="instructions"></slot></template>
		</InputInstructions>
	</div>
</template>

<script setup lang="ts">
import InputHeader from './InputHeader.vue';
import InputInstructions from './InputInstructions.vue';

const props = defineProps<{
	accept?: string;
	id: string;
}>();

const file = defineModel<File | null>();

const emit = defineEmits<{
	changed: [file: File | null];
}>();

const FIRST_FILE_INDEX = 0;

function handleFileSelect(e: Event): void {
	const { target } = e;
	if (
		target instanceof HTMLInputElement &&
		target.files !== null &&
		target.files.length > FIRST_FILE_INDEX &&
		target.files[FIRST_FILE_INDEX] !== undefined
	) {
		const { files } = target;
		const [selectedFile] = files;
		file.value = selectedFile ?? null;
		emit('changed', selectedFile ?? null);
	}
}

function removeFile(): void {
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
