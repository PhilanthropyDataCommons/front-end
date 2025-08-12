<template>
	<div class="panel-section">
		<div class="panel-section-header">
			<slot class="header" name="header"></slot>
		</div>
		<div class="panel-section-content">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.panel-section {
	display: flex;
	width: 100%;
	align-items: flex-start;
}

.panel-section-header,
.panel-section-content {
	flex: 1;
	width: 50%;
	margin-top: 0;
}

.panel-section-header :deep(h3) {
	margin-top: 0;
}
</style>
