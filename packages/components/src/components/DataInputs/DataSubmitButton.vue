<template>
	<div class="data-submit-button">
		<CustomButton color="blue" inverted submit :disabled="disabled">
			<slot></slot>
		</CustomButton>
	</div>
</template>

<script setup lang="ts">
import CustomButton from '../CustomButton.vue';
export interface DataSubmitButtonProps {
	disabled?: boolean;
}
const { disabled = false } = defineProps<DataSubmitButtonProps>();
</script>

<style scoped></style>
