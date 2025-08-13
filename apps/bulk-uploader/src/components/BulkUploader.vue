<script setup lang="ts">
import type { FunderBundle, SourceBundle } from '@pdc/sdk';
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	PanelSection,
	FileUploadInput,
	DataSubmissionInput,
	SelectInput,
} from '@pdc/components';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { RouterLink } from 'vue-router';

const props = defineProps<{
	bulkUpload: File | null;
	sourceId: string | null;
	funderShortCode: string | null;
	sources: SourceBundle | null;
	funders: FunderBundle | null;
	handleBulkUpload: (file: File) => Promise<void>;
}>();

const emit = defineEmits<{
	'update:bulk-upload': [file: File | null];
	'update:source-id': [sourceId: string | null];
	'update:funder-short-code': [funderShortCode: string | null];
}>();
</script>

<template>
	<PanelComponent padded>
		<PanelHeader>
			<h1>New Bulk Upload</h1>
			<PanelHeaderActionsWrapper>
				<PanelHeaderAction>
					<ArrowLeftIcon class="icon" />
					<RouterLink to="/bulk-uploads">Back to bulk uploads</RouterLink>
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody>
			<PanelSection>
				<template #header>
					<h3>Select File to Upload</h3>
					<p class="text-color-gray-medium-dark">
						File format guidance and instructions here.
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
						<template #file-upload-header>
							<h4>Choose File</h4>
						</template>
						<template #file-upload-instructions>
							<p class="text-color-gray-medium-dark">
								Drag and drop a CSV file into the box above, or click it to use
								the native file picker.
							</p>
						</template>
					</FileUploadInput>
					<FileUploadInput :disabled="true">
						<template #file-upload-header>
							<h4>Choose Attachments File</h4>
						</template>
						<template #file-upload-instructions>
							<p class="text-color-gray-medium-dark">
								If the bulk upload contains base fields which are file
								attachments, you can upload a zip file with the attachments.
								Ensure that the base field values are relative paths to the
								files from the root of the zip file.
							</p>
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
						<template #select-input-header>
							<h4>Source</h4>
						</template>
						<template #select-input-instructions>
							<p class="text-color-gray-medium-dark">
								If blank, a <span>sourceId</span> column must be included in the
								upload.
							</p>
						</template>
					</SelectInput>
					<SelectInput :options="[]" :disabled="true">
						<template #select-input-header>
							<h4>Data Provider</h4>
						</template>
						<template #select-input-instructions>
							<p class="text-color-gray-medium-dark">
								If blank, a
								<span>dataProviderShortCode</span> column must be included in
								the upload.
							</p>
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
						<template #select-input-header>
							<h4>Funder</h4>
						</template>
						<template #select-input-instructions>
							<p class="text-color-gray-medium-dark">
								If blank, a
								<span>funderShortCode</span> column must be included in the
								upload.
							</p>
						</template>
					</SelectInput>
					<SelectInput :disabled="true">
						<template #select-input-header>
							<h4>Changemaker</h4>
						</template>
						<template #select-input-instructions>
							<p class="text-color-gray-medium-dark">
								If blank, a
								<span>changemakerId</span> column must be included in the
								upload.
							</p>
						</template>
					</SelectInput>
					<SelectInput :disabled="true">
						<template #select-input-header>
							<h4>Application Form</h4>
						</template>
						<template #select-input-instructions>
							<p class="text-color-gray-medium-dark">
								If blank, an
								<span>applicationFormId</span> column must be included in the
								upload.
							</p>
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
					<DataSubmissionInput
						:handle-submit="
							() => props.bulkUpload && props.handleBulkUpload(props.bulkUpload)
						"
						:disabled="!props.bulkUpload"
					>
						<template #default> Submit </template>
					</DataSubmissionInput>
				</template>
			</PanelSection>
		</PanelBody>
	</PanelComponent>
</template>

<style scoped></style>
