<script setup lang="ts">
import { useKeycloak } from '@josempgon/vue-keycloak';
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

const { isAuthenticated, keycloak, username } = useKeycloak();

const login = async () => {
	await keycloak.value?.login();
};

const logout = async () => {
	await keycloak.value?.logout();
};
</script>

<template>
	<button
		v-if="!isAuthenticated"
		className="App-navbar__item"
		type="button"
		@click="login"
	>
		<UserIconOutline />
		Log in
	</button>
	<DropdownComponent v-else name="navbar-dropdown">
		<DropdownTrigger type="navbar-item">
			<UserIconSolid />
			{{ username }}
		</DropdownTrigger>
		<DropdownMenu align="right">
			<DropdownMenuButton
				key="logout"
				:icon="PowerIcon"
				class-name="logout"
				@click="logout"
			>
				Log out
			</DropdownMenuButton>
		</DropdownMenu>
	</DropdownComponent>
</template>
