<template>
	<div class="data-upload-section">
		<div class="section-header">
			<slot class="header" name="header"></slot>
		</div>
		<div class="section-content">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.data-upload-section {
	display: flex;
	width: 100%;
	align-items: flex-start;
}

.section-header,
.section-content {
	flex: 1;
	width: 50%;
	margin-top: 0;
}

.section-header :deep(h3) {
	margin-top: 0;
}
</style>
