<script setup lang="ts">
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import CustomButton from '../CustomButton.vue';
import PanelComponent from './PanelComponent.vue';
import PanelHeader from './PanelHeader.vue';
import PanelActions from './PanelActions.vue';
import PanelTitleWrapper from './PanelTitleWrapper.vue';
import PanelTitleTags from './PanelTitleTags.vue';
import PanelBody from './PanelBody.vue';

interface ClosablePanelProps {
	onClose: () => void;
	title: FunctionalComponent<HTMLAttributes & VNodeProps>;
	tags?: FunctionalComponent<HTMLAttributes & VNodeProps>;
	/**
	 * Controls whether the panel body has internal padding.
	 */
	padded?: boolean;
	actions?: FunctionalComponent<HTMLAttributes & VNodeProps>;
}

const {
	onClose,
	title,
	tags = undefined,
	padded = true,
	actions = undefined,
} = defineProps<ClosablePanelProps>();
</script>

<template>
	<PanelComponent>
		<PanelHeader>
			<PanelTitleWrapper><component :is="title" /></PanelTitleWrapper>
			<PanelTitleTags v-if="tags"><component :is="tags" /> </PanelTitleTags>
			<PanelActions>
				<component :is="actions" v-if="actions" />
				<CustomButton color="red" title="Close this panel" @click="onClose">
					<XMarkIcon class="icon" />
				</CustomButton>
			</PanelActions>
		</PanelHeader>
		<PanelBody :padded="padded"><slot></slot></PanelBody>
	</PanelComponent>
</template>
