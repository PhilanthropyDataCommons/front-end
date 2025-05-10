<script setup lang="ts">
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

interface DropdownMenuLinkProps {
	/**
	 * Destination path or URL.
	 */
	to: string;
	/**
	 * Skip client-side routing and let the browser load the URL like a normal `<a href>`.
	 */
	reloadDocument?: boolean;
	/**
	 * Optional Heroicon element, to prepend (left) or append (right) to menu link.
	 */
	icon?: FunctionalComponent<HTMLAttributes & VNodeProps>;
	/**
	 * Align the icon on the left or right side of the menu link.
	 */
	alignIcon?: 'left' | 'right';
	className?: string;
}

const {
	to,
	reloadDocument = false,
	icon = undefined,
	alignIcon = 'left',
	className = '',
} = defineProps<DropdownMenuLinkProps>();

const handleClick = (e: Event) => {
	const $target = e.target as HTMLLinkElement;
	$target.closest('.dropdown')?.removeAttribute('open');
};
</script>

<template>
	<a
		:href="to"
		:class="
			`dropdown-menu-item ${icon ? `has-icon align-icon--${alignIcon}` : ''} ${className}`.trim()
		"
		:reload-document="reloadDocument"
		@click="handleClick"
	>
		<span><slot></slot></span>
		<component :is="icon" v-if="icon && alignIcon === 'right'" />
	</a>
</template>
