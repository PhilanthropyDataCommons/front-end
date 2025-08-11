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
import { ref, watch } from 'vue';

const bulkUpload = ref<File | null>(null);

watch(bulkUpload, (newFile, oldFile) => {
	console.log('File changed:', {
		oldFile: oldFile?.name || null,
		newFile: newFile || null
	});
});
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
						<DataSubmissionInput :handleSubmit="() => {}" />
					</template>
				</DataUploadSection>
			</DataUploadComponent>
		</PanelBody>
	</PanelComponent>
</template>

<style></style>
