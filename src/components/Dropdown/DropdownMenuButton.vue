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

const {
	icon = undefined,
	alignIcon = 'left',
	className = '',
	onClick = undefined,
} = defineProps<DropdownMenuButtonProps>();

const handleClick = (e: MouseEvent): void => {
	const { target } = e;
	if (target instanceof HTMLElement) {
		target.closest('.dropdown')?.removeAttribute('open');
	}

	if (onClick) {
		onClick();
	}
};
</script>

<template>
	<button
		:class="
			`dropdown-menu-item ${icon ? `has-icon align-icon--${alignIcon}` : ''} ${className}`.trim()
		"
		:onClick="handleClick"
		type="button"
	>
		<component :is="icon" v-if="icon && alignIcon === 'left'" />
		<span><slot></slot></span>
		<component :is="icon" v-if="icon && alignIcon === 'right'" />
	</button>
</template>
