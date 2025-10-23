<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import {
	useSystemSource,
	useFileUploadCallback,
	useRegisterBulkUploadCallback,
	uploadUsingPresignedPost,
	useSources,
	useFunders,
	useBaseFields,
} from '../pdc-api';
import { getLogger } from '@pdc/utilities';
import BulkUploader from '../components/BulkUploader.vue';
import BaseFieldsTable from '../components/BaseFieldsTable.vue';
import type { FileUploadResponse } from '../pdc-api';

const logger = getLogger('<AddDataView>');

const router = useRouter();
const bulkUpload = ref<File | null>(null);
const attachmentsUpload = ref<File | null>(null);

const sourceId = ref<string | null>(null);
const funderShortCode = ref<string | null>(null);

const { data: sources } = useSources();
const { data: funders } = useFunders();

const { data: systemSource, fetchData: fetchSystemSource } = useSystemSource();
const { data: baseFields, fetchData: fetchBaseFields } = useBaseFields();
const isLoading = ref(true);

const createPdcFile = useFileUploadCallback();
const registerBulkUpload = useRegisterBulkUploadCallback();

const defaultFunderShortCode = 'pdc';

const getMimeType = (file: File): string =>
	file.type === '' ? 'application/octet-stream' : file.type;

const uploadFile = async (file: File): Promise<FileUploadResponse> => {
	const pdcFile = await createPdcFile({
		mimeType: getMimeType(file),
		size: file.size,
		name: file.name,
	});
	await uploadUsingPresignedPost(file, pdcFile.presignedPost);
	return pdcFile;
};

const getSelectedSourceId = (): number => {
	if (sourceId.value !== null && sourceId.value !== '') {
		return Number(sourceId.value);
	}
	if (systemSource.value?.id == null) {
		throw new Error('No System Source Available');
	}
	return systemSource.value.id;
};

onMounted(async () => {
	await fetchSystemSource();
	try {
		await fetchBaseFields();
	} catch (error: unknown) {
		logger.error({ error }, 'Failed to load base fields');
	} finally {
		isLoading.value = false;
	}
});

const handleBulkUpload = async (
	file: File,
	attachmentsFile: File | null = null,
): Promise<void> => {
	const proposalsDataFile = await uploadFile(file);
	const attachmentsDataFile =
		attachmentsFile === null ? null : await uploadFile(attachmentsFile);

	const bulkUploadResult = await registerBulkUpload({
		proposalsDataFileId: proposalsDataFile.id,
		sourceId: getSelectedSourceId(),
		funderShortCode: funderShortCode.value ?? defaultFunderShortCode,
		/* @ts-expect-error  -- The bulk upload task should be typed as null, but is coming through as undefined due to an sdk issue. */
		attachmentsArchiveFileId: attachmentsDataFile?.id ?? null,
		attachmentsArchiveFile: null,
		logs: [],
	});

	await router.push(`/bulk-uploads/${bulkUploadResult.id}`);
};
</script>

<template>
	<BulkUploader
		v-model:bulk-upload="bulkUpload"
		v-model:attachments-upload="attachmentsUpload"
		v-model:source-id="sourceId"
		v-model:funder-short-code="funderShortCode"
		:sources="sources"
		:funders="funders"
		:handle-bulk-upload="handleBulkUpload"
		:default-funder-short-code="defaultFunderShortCode"
	/>
	<BaseFieldsTable :base-fields="baseFields" :is-loading="isLoading" />
</template>

<style scoped></style>
