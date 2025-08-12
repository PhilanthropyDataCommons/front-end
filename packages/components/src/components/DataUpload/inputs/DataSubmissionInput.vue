<template>
	<div class="data-submission">
        <CustomButton color="blue" inverted :disabled="disabled" @click="handleSubmit">
			<slot></slot>
		</CustomButton>
	</div>
</template>

<script setup lang="ts">
import CustomButton from '../../CustomButton.vue';
const { handleSubmit } = defineProps<{
	handleSubmit: () => void;
	disabled?: boolean;
}>();


</script>

<style scoped></style>
