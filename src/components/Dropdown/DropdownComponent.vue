<script setup lang="ts">
interface DropdownProps {
	/**
	 * When multiple dropdowns have the same `name`,
	 * only one of them can be open at a time (like an accordion).
	 */
	name?: string;
}
const { name = undefined } = defineProps<DropdownProps>();
</script>

<template>
	<details class="dropdown" :name="name"><slot></slot></details>
</template>

<style>
:root {
	--dropdown--menu--border-radius: 8px;
	--dropdown--menu--spacing: var(--accessible-spacing--1x);
	--dropdown--menu--min-width: 20ch;
	--dropdown--menu--max-width: 30ch;
	--dropdown--menu-item--icon-size: 1.5em;
}

.dropdown {
	position: relative;
	display: inline-block;
}

.dropdown-trigger {
	user-select: none;
	/* Hide the disclosure triangle that is natively applied to `<summary>` elements. */
	list-style: none;
}

/* Safari hack: Safari doesn't respect the above method of hiding the disclosure triangle. */
.dropdown-trigger::-webkit-details-marker {
	display: none;
}

.dropdown[open] > .dropdown-trigger {
	--button--primary-color: var(--color--blue);
	--button--contrast-color: var(--color--gray--lighter);
	--navbar-item--background-color: #0001;
}

/* This generates an invisible backdrop when the dropdown is open,
   behind the dropdown but above all other page content,
   that is technically part of the dropdown trigger.
   Thus, clicking anywhere else on the page is like clicking the trigger,
   and closes the dropdown. */
.dropdown[open] > .dropdown-trigger::before {
	position: fixed;
	inset: 0;
	z-index: 80;
	content: ' ';
	display: block;
	cursor: default;
}

.dropdown-menu {
	position: absolute;
	z-index: 100;
	inline-size: max-content;
	min-inline-size: var(--dropdown--menu--min-width);
	max-inline-size: var(--dropdown--menu--max-width);

	background-color: white;
	border-radius: var(--dropdown--menu--border-radius);
	border: 1px solid var(--color--gray--medium);
	overflow: visible;

	display: flex;
	flex-direction: column;
}

.dropdown-menu.left {
	left: 0;
}

.dropdown-menu.right {
	right: 0;
}

.dropdown-menu > * {
	border-bottom: 1px solid var(--color--gray--light);
}

.dropdown-menu > *:first-child {
	border-top-left-radius: var(--dropdown--menu--border-radius);
	border-top-right-radius: var(--dropdown--menu--border-radius);
}

.dropdown-menu > *:last-child {
	border-bottom: none;
	border-bottom-left-radius: var(--dropdown--menu--border-radius);
	border-bottom-right-radius: var(--dropdown--menu--border-radius);
}

/* CSS `transition` doesn't work when disclosing `<details>` element contents,
  thus we use `animation`. */
@keyframes show-dropdown-menu {
	from {
		opacity: 0;
		transform: translateY(0);
	}
}

.dropdown[open] .dropdown-menu {
	animation: show-dropdown-menu 200ms ease-in-out;

	opacity: 1;
	transform: translateY(10px);
}

.dropdown-menu-text {
	font-size: var(--font-size--sm);
	padding: var(--dropdown--menu--spacing);
}

.dropdown-menu-item:where(button) {
	all: unset;

	&:focus-visible {
		outline: var(--outline);
	}
}

.dropdown-menu-item {
	color: inherit;
	font-weight: var(--font-weight--medium);
	text-decoration: none;
	padding: var(--dropdown--menu--spacing);
	cursor: pointer;
}

.dropdown-menu-item.has-icon {
	display: flex;
	align-items: flex-start;
	gap: var(--fixed-spacing--1x);
}

.dropdown-menu-item.has-icon.align-icon--right {
	justify-content: space-between;
	gap: var(--fixed-spacing--2x);
}

.dropdown-menu-item .description {
	display: block;
	font-weight: normal;
	font-size: var(--font-size--sm);
}

.dropdown-menu-item:hover {
	background-color: var(--color--gray--lighter);
}

.dropdown-menu-item > svg {
	flex-shrink: 0;
	height: var(--dropdown--menu-item--icon-size);
	width: var(--dropdown--menu-item--icon-size);
}

.dropdown[open] .closed-only,
.dropdown:not([open]) .open-only {
	display: none;
}

.dropdown[open] .open-only,
.dropdown:not([open]) .closed-only {
	display: block;
}
</style>
