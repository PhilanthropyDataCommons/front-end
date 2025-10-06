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

const logger = getLogger('<AddDataView>');

const router = useRouter();
const bulkUpload = ref<File | null>(null);

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
const handleBulkUpload = async (file: File): Promise<void> => {
	if (systemSource.value?.id == null) {
		throw new Error('No System Source Available');
	}
	const proposalsDataFile = await createPdcFile({
		mimeType: file.type === '' ? 'application/octet-stream' : file.type,
		size: file.size,
		name: file.name,
	});

	await uploadUsingPresignedPost(file, proposalsDataFile.presignedPost);

	const selectedSourceId =
		sourceId.value !== null && sourceId.value !== ''
			? Number(sourceId.value)
			: systemSource.value.id;
	const selectedFunderShortCode =
		funderShortCode.value ?? defaultFunderShortCode;

	const bulkUploadResult = await registerBulkUpload({
		proposalsDataFileId: proposalsDataFile.id,
		sourceId: selectedSourceId,
		funderShortCode: selectedFunderShortCode,
		logs: [],
	});

	await router.push(`/bulk-uploads/${bulkUploadResult.id}`);
};
</script>

<template>
	<BulkUploader
		v-model:bulk-upload="bulkUpload"
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
