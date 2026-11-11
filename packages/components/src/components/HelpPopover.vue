<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline';

export interface HelpPopoverProps {
	label: string;
}

const { label } = defineProps<HelpPopoverProps>();

const VIEWPORT_GUTTER_PX = 16;

const details = ref<HTMLDetailsElement | null>(null);
const content = ref<HTMLDivElement | null>(null);

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

const handleToggle = (): void => {
	keepContentOnScreen();
	if (details.value?.open === true) {
		window.addEventListener('resize', keepContentOnScreen);
	} else {
		window.removeEventListener('resize', keepContentOnScreen);
	}
};

onUnmounted(() => {
	window.removeEventListener('resize', keepContentOnScreen);
});

const close = (): void => {
	if (details.value?.open !== true) return;
	details.value.open = false;
	details.value.querySelector('summary')?.focus();
};

const closeWhenFocusLeaves = (event: FocusEvent): void => {
	if (details.value?.open !== true) return;
	const { relatedTarget } = event;
	if (!(relatedTarget instanceof Node)) return;
	if (details.value.contains(relatedTarget)) return;
	details.value.open = false;
};
</script>

<template>
	<details
		ref="details"
		class="help-popover"
		@keydown.esc="close"
		@focusout="closeWhenFocusLeaves"
		@toggle="handleToggle"
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
	display: flex;
	align-items: center;
	cursor: pointer;
	color: var(--color--gray--medium-dark);
	border-radius: 50%;
	list-style: none;
}

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
