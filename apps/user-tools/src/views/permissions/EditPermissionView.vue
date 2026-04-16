<script setup lang="ts">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderActionsWrapper,
	BackButton,
} from '@pdc/components';
import { useRoute } from 'vue-router';

const {
	params: { id: permissionId },
} = useRoute();
</script>

<template>
	<PanelComponent padded>
		<PanelHeader>
			<h1>Permission Grant {{ permissionId }}</h1>
			<PanelHeaderActionsWrapper>
				<BackButton to="/permissions" label="Back to permissions" />
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody variant="padded">
			<p>Permission grant view/edit coming soon.</p>
		</PanelBody>
	</PanelComponent>
</template>
