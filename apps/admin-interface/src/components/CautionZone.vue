<script setup lang="ts">
import { LockClosedIcon, LockOpenIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const isUnlocked = ref(false);
</script>

<template>
	<div class="caution-zone-container">
		<div class="caution-zone-header">
			<div class="caution-zone-title-row">
				<h4 class="caution-zone-title">Caution Zone</h4>
				<button
					type="button"
					class="lock-toggle"
					@click="isUnlocked = !isUnlocked"
				>
					<LockClosedIcon v-if="!isUnlocked" class="icon" />
					<LockOpenIcon v-else class="icon" />
					{{ isUnlocked ? 'Lock' : 'Unlock' }}
				</button>
			</div>
			<slot name="description" />
		</div>
		<div class="content-wrapper" :class="{ disabled: !isUnlocked }">
			<slot :is-unlocked="isUnlocked" />
		</div>
	</div>
</template>

<style scoped>
.caution-zone-title {
	color: var(--color--white);
	width: 100%;
}
.caution-zone-container {
	border: 2px solid var(--color--red--dark);
	padding: var(--fixed-spacing--1x);
	border-radius: var(--fixed-spacing--halfx);
	margin-bottom: var(--fixed-spacing--2x);
	max-width: 400px;
}
.caution-zone-header {
	display: flex;
	flex-direction: column;
}
.caution-zone-title-row {
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: center;
	gap: var(--fixed-spacing--1x);
}
.caution-zone-header h4 {
	background-color: var(--color--red);
	color: var(--color--white);
	padding: var(--fixed-spacing--halfx);
	border-radius: var(--fixed-spacing--halfx);
	text-align: center;
	flex: 1;
	margin: 0;
}
.lock-toggle {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--halfx);
	background: none;
	border: none;
	width: 100%;
	justify-content: center;
	padding: var(--fixed-spacing--halfx);
	cursor: pointer;
	font-size: var(--font-size);
	transition: 0.2s;
}
.lock-toggle:hover {
	background-color: var(--color--gray--light);
}
.lock-toggle .icon {
	width: 16px;
	height: 16px;
}
.content-wrapper.disabled {
	opacity: 0.5;
	pointer-events: none;
}
</style>
