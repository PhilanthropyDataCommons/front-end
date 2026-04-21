<script setup lang="ts">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderActionsWrapper,
	PanelSection,
	BackButton,
	CustomButton,
	RadioInput,
	TextInput,
	SelectInput,
	CheckboxInput,
	DataSubmitButton,
	ErrorMessage,
} from '@pdc/components';
import { reactive, ref, computed, watch } from 'vue';
import { getLogger } from '@pdc/utilities';
import {
	GRANTEE_TYPE_OPTIONS,
	CONTEXT_ENTITY_TYPE_OPTIONS,
	PERMISSION_VERB_OPTIONS,
	buildPermissionGrantPayload,
	getEntityKeyPlaceholder,
	getScopesForContextEntityType,
	isFormReady,
	type PermissionGrantFormState,
	type WritablePermissionGrantPayload,
} from '../../permissionsHelpers';

const logger = getLogger('<PermissionGrantForm>');

type FormMode = 'create' | 'edit';

const props = defineProps<{
	mode: FormMode;
	onSubmit: (payload: WritablePermissionGrantPayload) => Promise<void>;
	initialValue?: PermissionGrantFormState;
	onDelete?: () => Promise<void>;
	title?: string;
	submitLabel?: string;
	backTo?: string;
}>();

const {
	mode,
	title = mode === 'edit' ? 'Edit Permission Grant' : 'Grant Permission',
	submitLabel = mode === 'edit' ? 'Save changes' : 'Grant Permission',
	backTo = '/permissions',
} = props;

const readyHeading =
	mode === 'edit' ? 'Ready to save' : 'Ready to Grant Permission';

const form = reactive<PermissionGrantFormState>(
	props.initialValue ?? {
		granteeType: null,
		granteeId: '',
		contextEntityType: null,
		entityKey: '',
		verbs: [],
		scope: [],
	},
);

const hadError = ref(false);
const errorMessage = ref('');

const scopeOptions = computed(() =>
	getScopesForContextEntityType(form.contextEntityType).map((s) => ({
		label: s,
		value: s,
	})),
);

const entityKeyPlaceholder = computed(() =>
	getEntityKeyPlaceholder(form.contextEntityType),
);

const granteeNoun = computed(() => {
	if (form.granteeType === 'user') return 'the user';
	if (form.granteeType === 'userGroup') return 'the group';
	return 'the user or group';
});

watch(
	() => form.contextEntityType,
	(newType) => {
		const allowed = new Set<string>(getScopesForContextEntityType(newType));
		form.scope = form.scope.filter((s) => allowed.has(s));
	},
);

const canSubmit = computed(() => isFormReady(form));

const handleFormSubmit = async (event: Event): Promise<void> => {
	event.preventDefault();
	if (!canSubmit.value) return;
	hadError.value = false;
	errorMessage.value = '';
	try {
		const payload = buildPermissionGrantPayload(form);
		await props.onSubmit(payload);
	} catch (error) {
		logger.error({ error }, 'Failed to submit permission grant');
		errorMessage.value =
			error instanceof Error
				? error.message
				: 'An error occurred while granting permission.';
		hadError.value = true;
	}
};
</script>

<template>
	<PanelComponent padded>
		<PanelHeader>
			<h1>{{ title }}</h1>
			<PanelHeaderActionsWrapper>
				<BackButton :to="backTo" label="Back to Permissions" />
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody variant="data-panel-padded">
			<form @submit="handleFormSubmit">
				<PanelSection>
					<template #header>
						<h3>Grantee</h3>
						<p class="text-color-gray-medium-dark">
							Who do you want to give permission to?
						</p>
					</template>
					<template #content>
						<RadioInput
							v-model="form.granteeType"
							name="grantee-type"
							:options="GRANTEE_TYPE_OPTIONS"
						>
							<template #header>Grantee type</template>
						</RadioInput>
						<TextInput v-model="form.granteeId">
							<template #header>Grantee ID</template>
							<template #instructions>
								The Keycloak UUID for {{ granteeNoun }} (e.g.,
								550e8400-e29b-41d4-a716-446655440000).
							</template>
						</TextInput>
					</template>
				</PanelSection>

				<PanelSection>
					<template #header>
						<h3>Permissions</h3>
						<p class="text-color-gray-medium-dark">
							What do you want {{ granteeNoun }} to be able to do?
						</p>
					</template>
					<template #content>
						<CheckboxInput
							v-model="form.verbs"
							name="verbs"
							:options="PERMISSION_VERB_OPTIONS"
						>
							<template #header>Which actions do you want to allow?</template>
						</CheckboxInput>
					</template>
				</PanelSection>

				<PanelSection>
					<template #header>
						<h3>Context</h3>
						<p class="text-color-gray-medium-dark">
							Which entity does this grant apply to?
						</p>
					</template>
					<template #content>
						<SelectInput
							v-model="form.contextEntityType"
							:options="CONTEXT_ENTITY_TYPE_OPTIONS"
						>
							<template #header>Entity type (required)</template>
							<template #instructions>
								Applies to all data with a related entity of this type.
							</template>
						</SelectInput>
						<TextInput
							v-if="form.contextEntityType !== null"
							v-model="form.entityKey"
						>
							<template #header>{{ entityKeyPlaceholder }}</template>
							<template #instructions>
								Enter the {{ entityKeyPlaceholder.toLowerCase() }} for the
								{{ form.contextEntityType }}.
							</template>
						</TextInput>
						<CheckboxInput
							v-if="form.contextEntityType !== null"
							v-model="form.scope"
							name="scope"
							:options="scopeOptions"
						>
							<template #header>On which types of data?</template>
							<template #instructions>
								Limited to scopes valid for the selected entity type.
							</template>
						</CheckboxInput>
					</template>
				</PanelSection>

				<PanelSection>
					<template #header>
						<h3>{{ readyHeading }}</h3>
						<p class="text-color-gray-medium-dark">
							{{
								canSubmit
									? 'All required fields have been provided.'
									: 'Fill in grantee, context, allowed actions and scope to continue.'
							}}
						</p>
					</template>
					<template #content>
						<DataSubmitButton :disabled="!canSubmit">
							{{ submitLabel }}
						</DataSubmitButton>
						<ErrorMessage v-if="hadError" :message="errorMessage" />
					</template>
				</PanelSection>

				<PanelSection v-if="onDelete !== undefined">
					<template #header>
						<h3>Remove Permission</h3>
					</template>
					<template #content>
						<div>
							<CustomButton color="red" inverted @click="onDelete">
								Delete Permission
							</CustomButton>
						</div>
					</template>
				</PanelSection>
			</form>
		</PanelBody>
	</PanelComponent>
</template>
