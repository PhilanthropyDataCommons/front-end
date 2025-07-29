<script setup lang="ts">
import { defineProps } from 'vue';

interface CustomButtonProps {
	color?: 'gray' | 'blue' | 'red';

	disabled?: boolean;
	/**
	 * Makes the button dark with light text.
	 */
	inverted?: boolean;
	/**
	 * Adds a visible border to the button.
	 */
	bordered?: boolean;
	/**
	 * Adds a notification disc to the button.
	 */
	notification?: boolean;
	/**
	 * Make the button occupy maximum available horizontal space.
	 */
	block?: boolean;
	/**
	 * Sets the <button> type to "submit"
	 */
	submit?: boolean;
	/**
	 * Style the button like a text link
	 */
	linkStyle?: boolean;
	className?: string;
}

const {
	color = 'gray',
	inverted = false,
	bordered = true,
	notification = false,
	block = false,
	submit = false,
	linkStyle = false,
	className = '',
	disabled = false,
} = defineProps<CustomButtonProps>();

const buttonClassNames = ['button', `button--color-${color}`];

if (inverted) {
	buttonClassNames.push('button--inverted');
}

if (bordered) {
	buttonClassNames.push('button--bordered');
}

if (notification) {
	buttonClassNames.push('button--notification');
}

if (block) {
	buttonClassNames.push('button--block');
}

if (linkStyle) {
	buttonClassNames.push('button--link-style');
}

buttonClassNames.push(className);
</script>

<template>
	<button
		:type="submit ? 'submit' : 'button'"
		:class="buttonClassNames.join(' ').trim()"
		:disabled="disabled"
	>
		<slot></slot>
	</button>
</template>

<style>
:root {
	--button--font-size: 1rem;
	--button--border-radius: 8px;
	/* These next values should be relative to the button's font-size, so we switch to `em` units. */
	--button--height: 2.75em;
	--button--icon-size: 1.5em;

	/* V-padding based on desired button height minus font-height. */
	--button--padding-y: calc(
		(var(--button--height) - var(--button--font-size)) / 2
	);
	/* H-padding based on desired button width minus icon size. (Smallest expected content.) */
	--button--padding-x: calc(
		(var(--button--height) - var(--button--icon-size)) / 2
	);
}

.button {
	/* Nuclear unset of browser defaults: we want to completely define button styles. */
	all: unset;
	box-sizing: border-box;
	cursor: pointer;

	border-radius: var(--button--border-radius);
	border: 1px solid transparent;
	font-family: var(--font-family--sans-serif);
	font-weight: var(--font-weight--medium);
	font-size: var(--button--font-size);
	line-height: 1;
	letter-spacing: normal;
	white-space: nowrap;
	height: var(--button--height);
	padding: var(--button--padding-y) var(--button--padding-x);

	transition-property: background-color, color, border-color, outline, opacity;
	transition-duration: var(--transition-duration--cursor);

	display: inline-flex;
	flex-direction: row;
	align-items: center;
	gap: calc(var(--button--padding-x) / 2);

	/* Standard, default theme. */
	--button--border-color: var(--button--primary-color);
	--button--notification-color: var(--button--primary-color);
	background-color: var(--button--contrast-color);
	color: var(--button--primary-color);
}

.button:not(:disabled):is(:hover, :focus-visible, :active) {
	background-color: var(--button--contrast-color--accent);
}

.button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.button > svg {
	flex-shrink: 0;
	height: var(--button--icon-size);
	width: var(--button--icon-size);
}

.button--color-gray {
	--button--primary-color: var(--color--gray--dark);
	--button--primary-color--accent: var(--color--gray--darker);
	--button--contrast-color: var(--color--gray--lighter);
	--button--contrast-color--accent: var(--color--gray--light);

	/* Special styling for non-inverted and non-bordered mode. */
	&:not(.button--inverted, .button--bordered) {
		--button--contrast-color: var(--color--gray--light);
		--button--contrast-color--accent: var(--color--gray);
	}
}

.button--color-blue {
	--button--primary-color: var(--color--blue);
	--button--primary-color--accent: var(--color--blue--dark);
	--button--contrast-color: var(--color--gray--lighter);
	--button--contrast-color--accent: var(--color--gray--light);
}

.button--color-red {
	--button--primary-color: var(--color--red);
	--button--primary-color--accent: var(--color--red--dark);
	--button--contrast-color: var(--color--gray--lighter);
	--button--contrast-color--accent: var(--color--gray--light);
}

.button--inverted {
	--button--border-color: transparent;
	--button--notification-color: var(--button--contrast-color);
	background-color: var(--button--primary-color);
	color: var(--button--contrast-color);
}

.button--inverted:not(:disabled):is(:hover, :focus-visible, :active) {
	background-color: var(--button--primary-color--accent);
}

.button--bordered {
	border-color: var(--button--border-color);
}

.button--notification {
	position: relative;
}

.button--notification::after {
	content: '';
	border-radius: 50%;
	width: 0.65em;
	height: 0.65em;
	background-color: var(--button--notification-color);

	/* If we dislike this design, then remove the absolute positioning and give this element a
     margin-left equal to the `gap` property above. */
	position: absolute;
	top: 3px;
	right: 3px;
}

.button--block {
	display: flex;
	justify-content: center;
	inline-size: 100%;
}

.button--link-style {
	--button--primary-color: var(--color--blue);
	--button--primary-color: var(--color--blue--dark);
	--button--contrast-color: transparent;
	--button--contrast-color--accent: transparent;

	--button--border-color: transparent;
	--button--border-radius: 0;

	--button--font-size: 1em;
	--button--height: auto;
	--button--padding-y: 0;
	--button--padding-x: 0;

	text-decoration: underline;

	&:hover,
	&:focus-visible {
		text-decoration: none;
	}
}
</style>
