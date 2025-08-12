<script setup lang="ts">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	DataUploadComponent,
	PanelSection,
	FileUploadInput,
	DataSubmissionInput,
	SelectInput,
} from '@pdc/components';
import { RouterLink } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { ref, watch, onMounted } from 'vue';
import {
	useSystemSource,
	usePresignedPostCallback,
	useRegisterBulkUploadCallback,
	uploadUsingPresignedPost,
	useSources,
	useFunders,
	useDataProviders,
	useChangemakers,
	useApplicationForms,
} from '../pdc-api';
import { useRouter } from 'vue-router';

const router = useRouter();
const bulkUpload = ref<File | null>(null);

const sourceId = ref<string | null>(null);
const funderId = ref<string | null>(null);
const dataProviderId = ref<string | null>(null);
const changemakerId = ref<string | null>(null);
const applicationFormId = ref<string | null>(null);

const { data: sources } = useSources();
const { data: funders } = useFunders();
const { data: dataProviders } = useDataProviders();
const { data: changemakers } = useChangemakers();
const { data: applicationForms } = useApplicationForms();

watch(bulkUpload, (newFile, oldFile) => {
	console.log('File changed:', {
		oldFile: oldFile?.name || null,
		newFile: newFile || null,
	});
});

watch(sourceId, (newSourceId, oldSourceId) => {
	console.log('Source changed:', {
		oldSourceId: oldSourceId || null,
		newSourceId: newSourceId || null,
	});
});

const { data: systemSource, fetchData: fetchSystemSource } = useSystemSource();
const createPresignedPost = usePresignedPostCallback();
const registerBulkUpload = useRegisterBulkUploadCallback();

onMounted(async () => {
	await fetchSystemSource();
});
const handleBulkUpload = async (file: File) => {
	if (!systemSource.value?.id) {
		throw new Error('No System Source Available');
	}
	console.log(systemSource);
	const { presignedPost } = await createPresignedPost({
		fileType: file.type || 'application/octet-stream',
		fileSize: file.size,
	});

	await uploadUsingPresignedPost(file, presignedPost);

	const bulkUploadResult = await registerBulkUpload({
		fileName: file.name,
		sourceKey: presignedPost.fields.key,
		sourceId: systemSource.value.id,
		funderShortCode: 'pdc',
	});

	await router.push(`/bulk-uploads/${bulkUploadResult.id}`);
};
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
			<DataUploadComponent>
				<PanelSection>
					<template #header>
						<h3 class="font-medium">Select File to Upload</h3>
						<p class="text-color-gray-medium-dark">
							File format guidance and instructions here.
						</p>
					</template>
					<template #content>
						<FileUploadInput v-model="bulkUpload">
							<template #file-upload-header>
								<h4 class="font-medium">Choose File</h4>
							</template>
							<template #file-upload-instructions>
								<p class="text-color-gray-medium-dark">
									Drag and drop a file into the box above, or click it to use
									the native file picker.
								</p>
							</template>
						</FileUploadInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<h3 class="font-medium">Associated Entities</h3>
					</template>
					<template #content>
						<SelectInput
							v-model="sourceId"
							:options="
								sources?.entries.map((source) => ({
									label: source.label,
									value: source.id.toString(),
								}))
							"
						>
							<template #select-input-header>
								<h4 class="font-medium">Source</h4>
							</template>
							<template #select-input-instructions>
								<p class="text-color-gray-medium-dark">
									If blank, a <span class="font-medium">sourceId</span> column must be included in the upload.
								</p>
							</template>
						</SelectInput>
						<SelectInput
							v-model="dataProviderId"
							:options="
								dataProviders?.entries.map((dataProvider) => ({
									label: dataProvider.name,
									value: dataProvider.shortCode,
								}))
							"
						>
							<template #select-input-header>
								<h4 class="font-medium">Data Provider</h4>
							</template>
							<template #select-input-instructions>
								<p class="text-color-gray-medium-dark">
									If blank, a <span class="font-medium">dataProviderShortCode</span> column must be included in the upload.
								</p>
							</template>
						</SelectInput>
						<SelectInput
							v-model="funderId"
							:options="
								funders?.entries.map((funder) => ({
									label: funder.name,
									value: funder.shortCode,
								}))
							"
						>
							<template #select-input-header>
								<h4 class="font-medium">Funder</h4>
							</template>
							<template #select-input-instructions>
								<p class="text-color-gray-medium-dark">
									If blank, a <span class="font-medium">funderShortCode</span> column must be included in the upload.
								</p>
							</template>
						</SelectInput>
						<SelectInput
							v-model="changemakerId"
							:options="
								changemakers?.entries.map((changemaker) => ({
									label: changemaker.name,
									value: changemaker.id.toString(),
								}))
							"
						>
							<template #select-input-header>
								<h4 class="font-medium">Changemaker</h4>
							</template>
							<template #select-input-instructions>
								<p class="text-color-gray-medium-dark">
									If blank, a <span class="font-medium">changemakerId</span> column must be included in the upload.
								</p>
							</template>
						</SelectInput>
						<SelectInput
							v-model="applicationFormId"
							:options="
								applicationForms?.entries.map((applicationForm) => ({
									label: applicationForm.id.toString(),
									value: applicationForm.id.toString(),
								}))
							"
						>
							<template #select-input-header>
								<h4 class="font-medium">Application Form</h4>
							</template>
							<template #select-input-instructions>
								<p class="text-color-gray-medium-dark">
									If blank, an <span class="font-medium">applicationFormId</span> column must be included in the upload.
								</p>
							</template>
						</SelectInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<div v-if="bulkUpload">
							<h3 class="font-medium">Ready to upload</h3>
							<p class="text-color-gray-medium-dark">
								All required data has been provided.
							</p>
						</div>
						<div v-else>
							<h3 class="font-medium">Not quite ready</h3>
							<p class="text-color-gray-medium-dark">
								Please select a file above.
							</p>
						</div>
					</template>
					<template #content>
						<DataSubmissionInput
							:handleSubmit="() => bulkUpload && handleBulkUpload(bulkUpload)"
							:disabled="!bulkUpload"
						>
							<template #default> Submit </template>
						</DataSubmissionInput>
					</template>
				</PanelSection>
			</DataUploadComponent>
		</PanelBody>
	</PanelComponent>
</template>

<style></style>
