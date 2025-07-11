<script setup lang="ts">
interface PanelProps {
	className?: string;
}

const { className = '' } = defineProps<PanelProps>();
</script>

<template>
	<div :class="`panel ${className}`.trim()">
		<slot></slot>
	</div>
</template>

<style>
:root {
	--panel--padding: var(--fixed-spacing--1x);
}

.panel {
	background-color: white;
	border-radius: 5px;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);

	display: grid;
	grid-template-rows: min-content 1fr;
	position: relative;
}

.panel-header {
	grid-row: 1;

	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: var(--fixed-spacing--2x);
}

.panel-header--padded {
	padding: var(--panel--padding);
}

.panel-title {
	margin-bottom: 0.5em;

	/* Limit display to two lines of text. */
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	display: -webkit-box;
	text-overflow: ellipsis;
	overflow: hidden;
}

.panel-title-tags {
	display: flex;
	flex-wrap: wrap;
	column-gap: var(--fixed-spacing--2x);
	row-gap: var(--fixed-spacing--halfx);
}

.panel-tag {
	font-weight: var(--font-weight--medium);
	line-height: 1.1;
	color: var(--color--gray--medium);

	display: flex;
	align-items: center;
	gap: 0.75ch;
}

.panel-tag > a {
	color: inherit;

	/* Duplicated, in case the panel tag just contains a link. */
	display: flex;
	align-items: center;
	gap: 0.75ch;
}

.panel-tag--link {
	color: var(--color--blue);
}

.panel-tag--link:hover,
.panel-tag > a:hover {
	text-decoration: none;
}

.panel-tag .icon {
	flex-shrink: 0;
	width: var(--icon-size--text);
	height: var(--icon-size--text);
}

.panel-tag .badge {
	--badge--background-color: var(--color--gray--medium);
	line-height: var(--line-height);
}

.panel-actions {
	display: flex;
	gap: var(--fixed-spacing--1x);
	align-items: center;

	&.switches {
		padding-inline-end: var(--button--padding-x);
		gap: var(--fixed-spacing--2x);
		align-self: center;
	}
}

.panel-body {
	grid-row: 2;
	overflow: auto;
	scroll-behavior: smooth;
}

.panel-body--padded {
	padding: var(--panel--padding);
	scroll-padding-top: var(--panel--padding);
}
</style>
