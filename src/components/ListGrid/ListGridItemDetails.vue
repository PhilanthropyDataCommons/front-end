<template>
	<div class="list-grid-item--details">
		<slot></slot>
	</div>
</template>
<style>
:root {
	--list-grid-item--details--color: var(--color--gray--medium-dark);
}

.list-grid-item--details {
	color: var(--list-grid-item--details--color);
	font-size: var(--font-size--sm);
	display: flex;
	flex-direction: row;
	gap: var(--fixed-spacing--2x);
	justify-content: space-between;
	align-items: flex-start;
}
</style>
