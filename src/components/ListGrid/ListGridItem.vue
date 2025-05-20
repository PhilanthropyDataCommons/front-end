<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface ListGridItemProps {
	/**
	 * URL destination for the list grid item when clicked.
	 * Proxies directly to the `<Link to>` attribute.
	 */
	linkTo: string;
	active?: boolean;
}

/**
 * Slot should contain one `ListGridItemTitle`, plus (optionally)
 * an arbitrary number of `ListGridItemDetail`s.
 */

const { linkTo, active = false } = defineProps<ListGridItemProps>();
</script>

<template>
	<RouterLink
		:to="linkTo"
		:class="`list-grid-item ${active ? 'active' : ''}`.trim()"
	>
		<slot></slot>
	</RouterLink>
</template>
