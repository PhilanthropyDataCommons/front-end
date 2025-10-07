<script setup lang="ts">
import type { FunderBundle, SourceBundle } from '@pdc/sdk';
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderActionsWrapper,
	PanelSection,
	FileUploadInput,
	DataSubmitButton,
	SelectInput,
	ErrorMessage,
} from '@pdc/components';
import { getLogger } from '@pdc/utilities';
import { ref } from 'vue';

const props = defineProps<{
	bulkUpload: File | null;
	sourceId: string | null;
	funderShortCode: string | null;
	sources: SourceBundle | null;
	funders: FunderBundle | null;
	defaultFunderShortCode: string;
	handleBulkUpload: (file: File) => Promise<void>;
}>();

const emit = defineEmits<{
	'update:bulk-upload': [file: File | null];
	'update:source-id': [sourceId: string | null];
	'update:funder-short-code': [funderShortCode: string | null];
}>();

const logger = getLogger('BulkUploader');
const hadError = ref(false);
const errorMessage = ref('');

const handleFormSubmit = async (event: Event): Promise<void> => {
	event.preventDefault();

	if (props.bulkUpload === null) {
		logger.warn('Attempted to submit form without a file');
		return;
	}

	try {
		await props.handleBulkUpload(props.bulkUpload);
		logger.info('Bulk upload submitted successfully');
	} catch (error) {
		logger.error({ error }, 'Failed to submit bulk upload');
		errorMessage.value =
			error instanceof Error
				? error.message
				: 'An error occurred while submitting the bulk upload.';
		hadError.value = true;
	}
};
</script>

<template>
	<PanelComponent padded>
		<PanelHeader>
			<h1>New Bulk Upload</h1>
			<PanelHeaderActionsWrapper>
				<BackButton to="/bulk-uploads" label="Back to bulk uploads" />
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody variant="data-panel-padded">
			<form @submit="handleFormSubmit">
				<PanelSection>
					<template #header>
						<h3>Select File to Upload</h3>
						<p class="text-color-gray-medium-dark">
							A bulk-upload must have a valid email address in the
							proposal_submitter_email address column.
						</p>
					</template>
					<template #content>
						<FileUploadInput
							:model-value="props.bulkUpload"
							@update:model-value="
								(value: File | null | undefined) =>
									emit('update:bulk-upload', value ?? null)
							"
						>
							<template #header>Choose File</template>
							<template #instructions>
								Drag and drop a CSV file into the box above, or click it to use
								the file picker.
							</template>
						</FileUploadInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<h3>Associated Entities</h3>
					</template>
					<template #content>
						<SelectInput
							:model-value="props.sourceId"
							:options="
								props.sources?.entries.map((source) => ({
									label: source.label,
									value: source.id.toString(),
								}))
							"
							@update:model-value="
								(value: string | null | undefined) =>
									emit('update:source-id', value ?? null)
							"
						>
							<template #header>Source</template>
							<template #instructions>
								If blank, the default source in the pdc instance will be used
								for the bulk upload.
							</template>
						</SelectInput>
						<SelectInput
							:model-value="props.funderShortCode"
							:options="
								props.funders?.entries.map((funder) => ({
									label: funder.name,
									value: funder.shortCode,
								}))
							"
							@update:model-value="
								(value: string | null | undefined) =>
									emit('update:funder-short-code', value ?? null)
							"
						>
							<template #header>Funder</template>
							<template #instructions>
								If blank, the system funder shortcode will be used (default is
								`{{ defaultFunderShortCode }}`)
							</template>
						</SelectInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<div v-if="props.bulkUpload">
							<h3>Ready to upload</h3>
							<p class="text-color-gray-medium-dark">
								All required data has been provided.
							</p>
						</div>
						<div v-else>
							<h3>Not quite ready</h3>
							<p class="text-color-gray-medium-dark">
								Please select a file above.
							</p>
						</div>
					</template>
					<template #content>
						<DataSubmitButton :disabled="props.bulkUpload === null">
							Submit
						</DataSubmitButton>
						<ErrorMessage v-if="hadError" :message="errorMessage" />
					</template>
				</PanelSection>
			</form>
		</PanelBody>
	</PanelComponent>
</template>

<style scoped>
.error-message {
	color: var(--color--red--dark);
	display: flex;
	align-items: center;
}
</style>
