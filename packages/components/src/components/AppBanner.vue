<script setup lang="ts">
import { useKeycloak } from '@dsb-norge/vue-keycloak-js';
import { useRoute } from 'vue-router';
import CustomButton from './CustomButton.vue';
import { getLogger } from '@pdc/utilities';

const logger = getLogger('<AppBanner>');

const { authenticated, loginFn } = useKeycloak();
const route = useRoute();

const isHomePage = route.path === '/';
const showBanner = !authenticated && !isHomePage;

const handleLogin = async (): Promise<void> => {
	await loginFn?.().catch(logger.error);
};
</script>

<template>
	<div v-if="showBanner" class="App-banner">
		You are viewing limited public data.
		<CustomButton link-style @click="handleLogin">
			Log in to view more.
		</CustomButton>
	</div>
</template>
