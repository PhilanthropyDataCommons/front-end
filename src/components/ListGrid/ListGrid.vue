<script setup lang="ts" generic="T">
import { ref, onMounted } from 'vue';
import type { ListGridProps } from './ListGridProps';

const { items } = defineProps<ListGridProps<T>>();

const listGridRef = ref<HTMLElement | null>(null);

function scrollToActiveItem() {
	const el = listGridRef.value?.querySelector('.active')
		?.previousElementSibling as HTMLElement | null;

	el?.scrollIntoView();
}
onMounted(scrollToActiveItem);
</script>

<template>
	<div ref="listGridRef">
		<slot v-for="item in items" :item="item"></slot>
	</div>
</template>
