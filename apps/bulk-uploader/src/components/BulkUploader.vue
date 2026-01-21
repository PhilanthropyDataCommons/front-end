<script setup lang="ts">
import type { ApplicationFormBundle, SourceBundle } from '@pdc/sdk';
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
	PanelHeaderAction,
	OffSiteLink,
} from '@pdc/components';
import { getLogger } from '@pdc/utilities';
import { DocumentPlusIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const props = defineProps<{
	bulkUpload: File | null;
	attachmentsUpload: File | null;
	sourceId: string | null;
	applicationFormId: string | null;
	sources: SourceBundle | null;
	applicationForms: ApplicationFormBundle | null;
	handleBulkUpload: (file: File, attachmentsFile: File | null) => Promise<void>;
}>();

const emit = defineEmits<{
	'update:bulk-upload': [file: File | null];
	'update:attachments-upload': [file: File | null];
	'update:source-id': [sourceId: string | null];
	'update:application-form-id': [applicationFormId: string | null];
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
		await props.handleBulkUpload(props.bulkUpload, props.attachmentsUpload);
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
				<PanelHeaderAction>
					<BackButton to="/bulk-uploads" label="Back to bulk uploads" />
				</PanelHeaderAction>
				<PanelHeaderAction>
					<DocumentPlusIcon class="icon" />
					<OffSiteLink
						to="https://api.philanthropydatacommons.org/static/bulkUpload.csv"
						class="download-csv-text"
					>
						Download CSV template
					</OffSiteLink>
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody variant="data-panel-padded">
			<form @submit="handleFormSubmit">
				<PanelSection>
					<template #header>
						<h3>Upload CSV File</h3>
					</template>
					<template #content>
						<FileUploadInput
							id="bulk-upload-file-input"
							accept=".csv"
							:model-value="props.bulkUpload"
							@update:model-value="
								(value: File | null | undefined) =>
									emit('update:bulk-upload', value ?? null)
							"
						>
							<template #header>Choose File</template>
							<template #instructions>
								A bulk-upload CSV must have a valid email address in the
								proposal_submitter_email address column.
							</template>
						</FileUploadInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<h3>Base Field File Attachments (Optional)</h3>
						<p class="text-color-gray-medium-dark">
							A zip file containing the file attachments for basefields.
						</p>
					</template>
					<template #content>
						<FileUploadInput
							id="attachments-file-input"
							accept=".zip"
							:model-value="props.attachmentsUpload"
							@update:model-value="
								(value: File | null | undefined) =>
									emit('update:attachments-upload', value ?? null)
							"
						>
							<template #header>Choose Attachments File</template>
							<template #instructions>
								The bulk upload CSV file must refer to the files by their
								relative path from the root of the zip file.
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
							:model-value="props.applicationFormId"
							:options="
								props.applicationForms?.entries.map((form) => ({
									label: form.id.toString(),
									value: form.id.toString(),
								}))
							"
							@update:model-value="
								(value: string | null | undefined) =>
									emit('update:application-form-id', value ?? null)
							"
						>
							<template #header>Application Form</template>
							<template #instructions>
								Select the application form associated with this bulk upload.
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
