<script setup lang="ts">
import type { SortDirection } from './types';
import {
	ArrowDownIcon,
	ArrowUpIcon,
	ChevronUpIcon,
} from '@heroicons/vue/16/solid';

export interface ColumnHeadProps {
	className?: string;
	actions?: boolean;
	sortable?: boolean;
	sortDirection?: SortDirection;
	onSort?: () => void;
}

const {
	className = '',
	actions = false,
	sortable = false,
	sortDirection = null,
	onSort = () => null,
} = defineProps<ColumnHeadProps>();
</script>

<template>
	<th
		:class="
			`
    ${className}
    ${actions ? `has-actions ` : ''}
    ${sortable ? `sortable` : ''}
  `.trim()
		"
	>
		<div class="column-head-wrapper">
			<button v-if="sortable" type="button" class="sort-button" @click="onSort">
				<slot> </slot>
				<span class="sort-indicator">
					<ArrowDownIcon v-if="sortDirection === 'asc'" class="sort-icon" />
					<ArrowUpIcon v-else-if="sortDirection === 'desc'" class="sort-icon" />
					<ChevronUpIcon v-else class="sort-icon sort-icon-inactive" />
				</span>
			</button>
			<div v-else>
				<slot> </slot>
			</div>
		</div>
	</th>
</template>

<style scoped>
th {
	min-width: 25%;
	vertical-align: bottom;
	white-space: nowrap;
	text-align: left;
	padding: var(--accessible-spacing--1x);
	border-bottom: var(--table--border-width) solid var(--color--gray--light);
}

.has-actions .column-head-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--accessible-spacing--1x);
}

.sortable {
	cursor: pointer;
}

.sort-button {
	all: unset;
	display: flex;
	align-items: center;
	gap: var(--accessible-spacing--halfx);
	cursor: pointer;
	width: 100%;
	font-weight: inherit;
	font-size: inherit;
	color: inherit;
	text-align: left;
}

.sort-button:hover {
	color: var(--color--blue--dark);
}

.sort-indicator {
	display: inline-flex;
	align-items: center;
	margin-left: auto;
}

.sort-icon {
	width: 1rem;
	height: 1rem;
	flex-shrink: 0;
}

.sort-icon-inactive {
	opacity: 0.4;
}
</style>
