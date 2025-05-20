<script setup lang="ts">
import { useKeycloak } from '@josempgon/vue-keycloak';
import { useRoute } from 'vue-router';
import CustomButton from './CustomButton.vue';
import { getLogger } from '../logger';

const logger = getLogger('<AppBanner>');

const { isAuthenticated, keycloak } = useKeycloak();
const route = useRoute();

const isHomePage = route.path === '/';
const showBanner = !isAuthenticated && !isHomePage;

const login = async () => {
	await keycloak.value?.login().catch(logger.error);
};
</script>

<template>
	<div v-if="showBanner" class="App-banner">
		You are viewing limited public data.
		<CustomButton link-style @click="login">
			Log in to view more.
		</CustomButton>
	</div>
</template>
