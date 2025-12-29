<script setup lang="ts">
import { PencilSquareIcon } from '@heroicons/vue/24/outline';

export interface EditIconLink {
	to: string;
}

const props = defineProps<EditIconLink>();
</script>

<template>
	<RouterLink :to="props.to" class="pencil-icon">
		<PencilSquareIcon class="icon text-black" />
	</RouterLink>
</template>

<style>
.text-black {
	color: var(--color--black);
}

.icon-link,
.pencil-icon {
	color: inherit;
	text-decoration: none;
	padding-left: 50px;
}

.icon-link:visited,
.pencil-icon:visited {
	color: inherit;
}

.icon-link:hover,
.pencil-icon:hover {
	color: inherit;
}
</style>
