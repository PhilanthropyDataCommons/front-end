<script setup lang="ts">
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

interface DropdownMenuButtonProps {
	/**
	 * Optional Heroicon element, to prepend (left) or append (right) to menu link.
	 */
	icon?: FunctionalComponent<HTMLAttributes & VNodeProps>;
	/**
	 * Align the icon on the left or right side of the menu link.
	 */
	alignIcon?: 'left' | 'right';
	className?: string;
	onClick?: () => void;
}

const props = defineProps<DropdownMenuButtonProps>();

const handleClick = (e: Event) => {
	const $target = e.target as HTMLLinkElement;
	$target.closest('.dropdown')?.removeAttribute('open');

	if (props.onClick) {
		props.onClick();
	}
};
</script>

<template>
	<button
		:className="
			`dropdown-menu-item ${icon ? `has-icon align-icon--${alignIcon}` : ''} ${className}`.trim()
		"
		:onClick="handleClick"
		type="button"
	>
		<component :is="props.icon" v-if="props.icon && alignIcon === 'left'" />
		<span><slot></slot></span>
		<component :is="props.icon" v-if="props.icon && alignIcon === 'right'" />
	</button>
</template>
