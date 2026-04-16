<script setup lang="ts">
import type {
	ApplicationForm,
	ApplicationFormBundle,
	Opportunity,
	OpportunityBundle,
	SourceBundle,
} from '@pdc/sdk';
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
	InfoBlock,
	CodeText,
} from '@pdc/components';
import { getLogger } from '@pdc/utilities';
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { downloadApplicationFormCsv } from '../../pdc-api';

const props = defineProps<{
	bulkUpload: File | null;
	attachmentsUpload: File | null;
	sourceId: string | null;
	applicationFormId: string | null;
	sources: SourceBundle | null;
	applicationForms: ApplicationFormBundle | null;
	opportunities: OpportunityBundle | null;
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

const hadCsvError = ref(false);
const csvErrorMessage = ref('');

const handleCsvDownload = async (): Promise<void> => {
	if (props.applicationFormId === null) {
		return;
	}
	try {
		await downloadApplicationFormCsv(Number(props.applicationFormId));
		hadCsvError.value = false;
	} catch (error) {
		logger.error({ error }, 'Failed to download CSV template');
		csvErrorMessage.value =
			error instanceof Error ? error.message : 'Failed to Load CSV Template';
		hadCsvError.value = true;
	}
};

const applicationFormLabel = (
	form: ApplicationForm,
	opportunities: Opportunity[],
): string => {
	const opportunity = opportunities.find(({ id }) => id === form.opportunityId);
	const opportunityTitle = opportunity?.title ?? null;

	// The SDK types name as `string`, but it can be null at runtime.
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- SDK type is incorrect, name can be null
	const baseLabel = form.name ?? `Application Form #${form.id}`;
	return opportunityTitle === null
		? baseLabel
		: `${baseLabel} (${opportunityTitle})`;
};

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
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody variant="data-panel-padded">
			<form @submit="handleFormSubmit">
				<PanelSection>
					<template #header>
						<h3>Application Form</h3>
					</template>
					<template #content>
						<SelectInput
							:model-value="props.applicationFormId"
							:options="
								props.applicationForms?.entries.map((form) => ({
									label: applicationFormLabel(
										form,
										props.opportunities?.entries ?? [],
									),
									value: form.id.toString(),
								}))
							"
							@update:model-value="
								(value: string | null | undefined) =>
									emit('update:application-form-id', value ?? null)
							"
						>
							<template #header>Choose Application Form</template>
							<template #instructions>
								Choose an application form to define the fields of this upload.
							</template>
						</SelectInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<h3>Source</h3>
					</template>
					<template #content>
						<SelectInput
							:model-value="props.sourceId"
							default-value="1"
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
							<template #header>Choose Source</template>
							<template #instructions> Defaults to the PDC source. </template>
						</SelectInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<h3>Upload CSV File</h3>
						<div class="csv-download-wrapper">
							<div class="csv-download-top">
								<ArrowDownTrayIcon class="icon" />
								<button
									:disabled="props.applicationFormId === null"
									class="download-csv-text"
									@click.prevent="handleCsvDownload"
								>
									Download CSV template
								</button>
							</div>
							<p v-if="props.applicationFormId === null" class="csv-hint">
								Select an application form to download its CSV template.
							</p>
							<ErrorMessage v-if="hadCsvError" :message="csvErrorMessage" />
						</div>
					</template>
					<template #content>
						<FileUploadInput
							id="bulk-upload-file-input"
							accept=".csv"
							label="Select a CSV to upload"
							:model-value="props.bulkUpload"
							@update:model-value="
								(value: File | null | undefined) =>
									emit('update:bulk-upload', value ?? null)
							"
						>
							<template #header>Choose File</template>
							<template #instructions>
								<div>
									Upload a CSV containing the application records for this bulk
									submission. Each row represents one application.
								</div>
								<InfoBlock>
									Every row must include a valid email address in the
									<CodeText>proposal_submitter_email</CodeText> column.
								</InfoBlock>
							</template>
						</FileUploadInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<h3>Upload Attachments ZIP (Optional)</h3>
						<p class="text-color-gray-medium-dark">
							A ZIP file containing the file attachments for basefields.
						</p>
					</template>
					<template #content>
						<FileUploadInput
							id="attachments-file-input"
							accept=".zip"
							label="Select a ZIP file to upload"
							:model-value="props.attachmentsUpload"
							@update:model-value="
								(value: File | null | undefined) =>
									emit('update:attachments-upload', value ?? null)
							"
						>
							<template #header>Choose Attachments File</template>
							<template #instructions>
								<div>
									Upload a ZIP file containing any file attachments referenced
									in your CSV.
								</div>
								<InfoBlock>
									The bulk upload CSV must refer to the attachments in this ZIP
									file by their relative path from the root of the
									ZIP.</InfoBlock
								>
							</template>
						</FileUploadInput>
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
						<ErrorMessage v-if="hadError" :message="errorMessage" />
						<DataSubmitButton :disabled="props.bulkUpload === null">
							Upload bulk submission
						</DataSubmitButton>
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

.download-csv-text {
	background: none;
	border: none;
	padding: 0;
	font: inherit;
	color: var(--color--blue);
	text-decoration: underline;
	cursor: pointer;
}

.download-csv-text:disabled {
	color: var(--color--gray--medium-dark);
	cursor: not-allowed;
}

.csv-download-top {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--1x);
}

.csv-hint {
	margin: var(--fixed-spacing--1x) 0 0;
	font-size: 0.75rem;
	color: var(--color--gray--medium-dark);
	white-space: nowrap;
}
</style>
