<script setup lang="ts">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderActionsWrapper,
	BackButton,
} from '@pdc/components';
</script>

<template>
	<PanelComponent padded>
		<PanelHeader>
			<h1>New Permission Grant</h1>
			<PanelHeaderActionsWrapper>
				<BackButton to="/permissions" label="Back to permissions" />
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody variant="padded">
			<p>Permission grant creation form coming soon.</p>
		</PanelBody>
	</PanelComponent>
</template>
