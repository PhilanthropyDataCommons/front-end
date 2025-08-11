<template>
	<div class="data-submission">
        <button @click="handleSubmit">
			Submit data
		</button>
	</div>
</template>

<script setup lang="ts">
const { handleSubmit } = defineProps<{
	handleSubmit: () => void;
}>();


</script>

<style scoped></style>
