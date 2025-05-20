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

<style>
.list-grid-item {
	padding: var(--fixed-spacing--1x);
	color: inherit;
	text-decoration: none;
	border-bottom: 1px solid var(--color--gray--light);
	line-height: 1.1;
	display: flex;
	flex-direction: column;
	gap: var(--fixed-spacing--halfx);
}

.list-grid-item:hover {
	background-color: var(--color--gray--lighter);
}

.list-grid-item.active {
	--list-grid-item--details--color: var(--color--gray--darker);

	background-color: var(--color--blue--lighter);
}

.list-grid-item:last-child {
	border-bottom: none;
}
</style>
