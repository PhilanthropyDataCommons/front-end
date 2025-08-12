<script setup lang="ts">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	DataUploadComponent,
	DataUploadSection,
	FileUploadInput,
	DataSubmissionInput,
} from '@pdc/components';
import { RouterLink } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { ref, watch, onMounted } from 'vue';
import {
	useSystemSource,
	usePresignedPostCallback,
	useRegisterBulkUploadCallback,
	uploadUsingPresignedPost,
} from '../pdc-api';

const bulkUpload = ref<File | null>(null);

watch(bulkUpload, (newFile, oldFile) => {
	console.log('File changed:', {
		oldFile: oldFile?.name || null,
		newFile: newFile || null,
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

	await registerBulkUpload({
		fileName: file.name,
		sourceKey: presignedPost.fields.key,
		sourceId: systemSource.value.id,
		funderShortCode: 'pdc',
	});

	console.log('Bulk upload completed successfully');
};
</script>

<template>
	<PanelComponent padded>
		<PanelHeader>
			<h1>New Bulk Upload</h1>
			<PanelHeaderActionsWrapper>
				<PanelHeaderAction>
					<ArrowLeftIcon class="icon" />
					<RouterLink to="/">Back to bulk uploads</RouterLink>
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody>
			<DataUploadComponent>
				<DataUploadSection>
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
				</DataUploadSection>
				<DataUploadSection>
					<template #header>
						<h3 class="font-medium">Ready to upload</h3>
						<p class="text-color-gray-medium-dark">
							All required data has been provided.
						</p>
					</template>
					<template #content>
						<DataSubmissionInput
							:handleSubmit="() => bulkUpload && handleBulkUpload(bulkUpload)"
						/>
					</template>
				</DataUploadSection>
			</DataUploadComponent>
		</PanelBody>
	</PanelComponent>
</template>

<style></style>
