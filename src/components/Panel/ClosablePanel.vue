<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid';
import CustomButton from '../CustomButton.vue';
import Panel from './Panel.vue';
import PanelHeader from './PanelHeader.vue';
import PanelActions from './PanelActions.vue';
import PanelTitleWrapper from './PanelTitleWrapper.vue';
import PanelTitleTags from './PanelTitleTags.vue';
import PanelBody from './PanelBody.vue';
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

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
	<Panel>
		<PanelHeader>
			<PanelTitleWrapper><component :is="title" /></PanelTitleWrapper>
			<PanelTitleTags v-if="tags"><component :is="tags" /> </PanelTitleTags>
			<PanelActions>
				<component :is="actions" v-if="actions" />
				<CustomButton :on-click="onClose" color="red" title="Close this panel">
					<XMarkIcon class="icon" />
				</CustomButton>
			</PanelActions>
		</PanelHeader>
		<PanelBody :padded="padded"><slot></slot></PanelBody>
	</Panel>
</template>
