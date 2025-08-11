<script setup lang="ts">
import { useKeycloak } from '@dsb-norge/vue-keycloak-js';
import { PowerIcon, UserIcon } from '@heroicons/vue/24/outline';
import { getLogger } from '@pdc/utilities';

const logger = getLogger('<UserComponent>');

const { authenticated, login, logoutFn, userName } = useKeycloak();

const handleLogin = async (): Promise<void> => {
	await login?.().catch(logger.error);
};

const handleLogout = async (): Promise<void> => {
	await logoutFn?.()?.catch(logger.error);
};
</script>

<template>
	<div class="user-component">
		<div v-if="authenticated" class="user-component-item">
			<UserIcon class="user-component-item-icon" />
			<div class="user-component-item-text">{{ userName }}</div>
		</div>

		<button
			v-if="authenticated"
			class="user-component-item"
			@click="handleLogout"
		>
			<PowerIcon class="user-component-item-icon" />
			<div class="user-component-item-text">Log Out</div>
		</button>
		<button v-else class="user-component-item" @click="handleLogin">
			<UserIcon class="user-component-item-icon" />
			<div class="user-component-item-text">Log In</div>
		</button>
	</div>
</template>

<style scoped>
.user-component {
	display: flex;
	flex-direction: column;
	gap: var(--fixed-spacing--2x);
	align-items: flex-start;
}
.user-component-item {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--1x);
	font-weight: var(--font-weight--medium);
	font-size: var(--font-size);
}
.user-component-item-icon {
	width: 20px;
	height: 20px;
}
button {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}
</style>
