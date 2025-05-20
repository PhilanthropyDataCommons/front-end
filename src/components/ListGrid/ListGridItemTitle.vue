<template>
	<div class="list-grid-item--title">
		<slot></slot>
	</div>
</template>

<style>
.list-grid-item--title {
	font-weight: var(--font-weight--medium);

	/* Limit display to two lines of text. */
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	display: -webkit-box;
	text-overflow: ellipsis;
	overflow: hidden;
}
</style>
