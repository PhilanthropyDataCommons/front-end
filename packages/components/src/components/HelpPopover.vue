<script setup lang="ts">
import { ref } from 'vue';
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline';

export interface HelpPopoverProps {
	/**
	 * Accessible name for the trigger, e.g. "About grantee types".
	 */
	label: string;
}

const { label } = defineProps<HelpPopoverProps>();

const VIEWPORT_GUTTER_PX = 16;

const details = ref<HTMLDetailsElement | null>(null);
const content = ref<HTMLDivElement | null>(null);

/**
 * The content opens to the right of the trigger. When that would run past
 * the viewport, shift it left so it stays on screen.
 */
const keepContentOnScreen = (): void => {
	if (content.value === null) return;
	content.value.style.removeProperty('left');
	if (details.value?.open !== true) return;
	const { right } = content.value.getBoundingClientRect();
	const maxRight = window.innerWidth - VIEWPORT_GUTTER_PX;
	if (right > maxRight) {
		content.value.style.left = `${(maxRight - right).toString()}px`;
	}
};

const close = (): void => {
	if (details.value?.open !== true) return;
	details.value.open = false;
	details.value.querySelector('summary')?.focus();
};
</script>

<template>
	<details
		ref="details"
		class="help-popover"
		@keydown.esc="close"
		@toggle="keepContentOnScreen"
	>
		<summary class="help-popover-trigger" :aria-label="label" :title="label">
			<QuestionMarkCircleIcon class="help-popover-icon" aria-hidden="true" />
		</summary>
		<div ref="content" class="help-popover-content">
			<slot></slot>
		</div>
	</details>
</template>

<style>
:root {
	--help-popover--border-radius: 8px;
	--help-popover--max-width: 40ch;
	--help-popover--icon-size: 1.25em;
}

.help-popover {
	position: relative;
	display: inline-block;
	vertical-align: middle;
}

.help-popover-trigger {
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	color: var(--color--gray--medium-dark);
	border-radius: 50%;
	/* Hide the disclosure triangle that is natively applied to `<summary>` elements. */
	list-style: none;
}

/* Safari hack: Safari doesn't respect the above method of hiding the disclosure triangle. */
.help-popover-trigger::-webkit-details-marker {
	display: none;
}

.help-popover-trigger:hover,
.help-popover[open] > .help-popover-trigger {
	color: var(--color--blue);
}

.help-popover-icon {
	inline-size: var(--help-popover--icon-size);
	block-size: var(--help-popover--icon-size);
}

/* An invisible backdrop behind the open popover, so clicking anywhere else
   on the page clicks the trigger and closes it. See `.dropdown-trigger`. */
.help-popover[open] > .help-popover-trigger::before {
	position: fixed;
	inset: 0;
	z-index: 80;
	content: ' ';
	display: block;
	cursor: default;
}

.help-popover-content {
	position: absolute;
	z-index: 100;
	left: 0;
	top: calc(100% + var(--fixed-spacing--1x));
	inline-size: max-content;
	max-inline-size: min(var(--help-popover--max-width), 80vw);
	padding: var(--accessible-spacing--1x);

	background-color: white;
	border-radius: var(--help-popover--border-radius);
	border: 1px solid var(--color--gray--medium);
	box-shadow: 0 4px 12px #0002;

	font-size: var(--font-size--sm);
	font-weight: normal;
	color: var(--color--gray--darker);
}

.help-popover-content > * + * {
	margin-top: var(--fixed-spacing--1x);
}
</style>
