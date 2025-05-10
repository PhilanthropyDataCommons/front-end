<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/24/outline';
import { Panel, PanelBody } from '../components/Panel/';
import CustomButton from '../components/CustomButton.vue';
import Dli from '../components/Dli.vue';
import EmailLink from '../components/EmailLink.vue';
import OffSiteLink from '../components/OffSiteLink.vue';

const isAuthenticated = false;
</script>

<template>
	<Panel class="landing-panel">
		<PanelBody>
			<h3 style="font-weight: 600">
				Welcome to the Philanthropy Data Commons.
			</h3>
			<p>
				This site displays the data in the Philanthropy Data Commons.
				<OffSiteLink to="https://philanthropydatacommons.org">
					Read more about the project here.
				</OffSiteLink>
			</p>
			<div :class="`launch-buttons ${isAuthenticated ? 'authenticated' : ''}`">
				<CustomButton color="blue" inverted block v-if="!isAuthenticated">
					<UserIcon class="icon" />
					Log in
				</CustomButton>
			</div>

			<dl>
				<Dli v-if="!isAuthenticated">
					<dt>Need an account?</dt>
					<dd>
						Email Jonathan Mergy:
						<EmailLink
							to="jmergy@philanthropydatacommons.org"
							subject="PDC account"
						/>
					</dd>
				</Dli>
				<Dli>
					<dt>Have questions or feedback?</dt>
					<dd>
						Email the team:
						<EmailLink to="info@philanthropydatacommons.org" subject="PDC" />
					</dd>
				</Dli>
				<Dli>
					<dt>Recent improvements</dt>
					<dd>
						<OffSiteLink
							to="https://github.com/PhilanthropyDataCommons/front-end/blob/main/RECENT_CHANGES.md"
						>
							Read a summary of recent changes here.
						</OffSiteLink>
					</dd>
				</Dli>
			</dl>
		</PanelBody>
	</Panel>
</template>

<style scoped>
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
