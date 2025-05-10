<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/24/outline';
import { useKeycloak } from '@dsb-norge/vue-keycloak-js';
import { PanelComponent, PanelBody } from '../components/Panel';
import CustomButton from '../components/CustomButton.vue';
import EmailLink from '../components/EmailLink.vue';
import DliComponent from '../components/DliComponent.vue';
import OffSiteLink from '../components/OffSiteLink.vue';

const { authenticated, login } = useKeycloak();

const handleLogin = async () => {
	await login?.();
};
</script>

<template>
	<PanelComponent class="landing-panel">
		<PanelBody>
			<h3 style="font-weight: 600">
				Philanthropy Data Commons Administrative Interface
			</h3>
			<p>
				This site provides administrative tools for the Philanthropy Data
				Commons. {{ ' ' }}
				<OffSiteLink to="https://philanthropydatacommons.org">
					Read more about the project here.
				</OffSiteLink>
			</p>
			<div
				v-if="!authenticated"
				:class="`launch-buttons ${authenticated ? 'authenticated' : ''}`"
			>
				<CustomButton color="blue" inverted block @click="handleLogin">
					<UserIcon class="icon" />
					Log in
				</CustomButton>
			</div>

			<dl>
				<DliComponent>
					<dt>Have questions or feedback?</dt>
					<dd>
						Email the team:{{ ' ' }}
						<EmailLink to="info@philanthropydatacommons.org" subject="PDC" />
					</dd>
				</DliComponent>
				<DliComponent>
					<dt>Code Repository</dt>
					<dd>
						<OffSiteLink
							to="https://github.com/PhilanthropyDataCommons/front-end"
						>
							Please visit our repository to raise any issues or feature
							requests.
						</OffSiteLink>
					</dd>
				</DliComponent>
			</dl>
		</PanelBody>
	</PanelComponent>
</template>

<style>
.landing-panel {
	max-width: 60ch;
	margin: var(--fixed-spacing--2x) auto;

	--panel--padding: var(--fixed-spacing--2x);
}

.launch-buttons {
	display: flex;
	gap: var(--fixed-spacing--1x);
	flex-direction: column;

	&.authenticated {
		flex-direction: row;
	}
}
</style>
