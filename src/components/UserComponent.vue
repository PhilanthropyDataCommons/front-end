<script setup lang="ts">
import { useKeycloak } from '@dsb-norge/vue-keycloak-js';
import {
	PowerIcon,
	UserIcon as UserIconOutline,
} from '@heroicons/vue/24/outline';
import { UserIcon as UserIconSolid } from '@heroicons/vue/24/solid';
import {
	DropdownComponent,
	DropdownTrigger,
	DropdownMenu,
	DropdownMenuButton,
} from './Dropdown';

const { authenticated, login, logoutFn, userName } = useKeycloak();

const handleLogin = async () => {
	await login?.();
};

const handleLogout = async () => {
	await logoutFn?.();
};
</script>

<template>
	<button
		v-if="!authenticated"
		className="App-navbar__item"
		type="button"
		@click="handleLogin"
	>
		<UserIconOutline />
		Log in
	</button>
	<DropdownComponent v-else name="navbar-dropdown">
		<DropdownTrigger type="navbar-item">
			<UserIconSolid />
			{{ userName }}
		</DropdownTrigger>
		<DropdownMenu align="right">
			<DropdownMenuButton
				key="logout"
				:icon="PowerIcon"
				class-name="logout"
				@click="handleLogout"
			>
				Log out
			</DropdownMenuButton>
		</DropdownMenu>
	</DropdownComponent>
</template>
