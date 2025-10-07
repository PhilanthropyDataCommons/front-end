<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { RouterLink } from 'vue-router';
import PanelHeaderAction from './Panel/PanelHeaderAction.vue';

defineProps<{
	to: string;
	label: string;
}>();
</script>

<template>
	<PanelHeaderAction>
		<ArrowLeftIcon class="icon" />
		<RouterLink :to="to">{{ label }}</RouterLink>
	</PanelHeaderAction>
</template>
