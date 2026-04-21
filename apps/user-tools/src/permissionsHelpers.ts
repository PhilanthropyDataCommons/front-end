/**
 * Local types and lookups for permission grants.
 *
 * Much of this file exists to paper over gaps in the generated `@pdc/sdk`
 * types — see PhilanthropyDataCommons/service#2353 for the full list of
 * SDK issues being tracked. When that lands, the reshaped types and
 * hardcoded enum/scope tables here should fall out.
 */
import type { PermissionGrant } from '@pdc/sdk';

/**
 * API-shaped permission grant row. The SDK's `PermissionGrant` omits
 * grantee fields and types `scope`/`verbs` as opaque empty interfaces, so
 * we reshape here. Tracks service#2353.
 */
export type PermissionGrantRow = Omit<PermissionGrant, 'scope' | 'verbs'> & {
	scope: string[];
	verbs: string[];
	granteeType?: string;
	granteeUserKeycloakUserId?: string | null;
	granteeKeycloakOrganizationId?: string | null;
};

export const CONTEXT_ENTITY_TYPES = [
	'changemaker',
	'funder',
	'dataProvider',
	'opportunity',
	'proposal',
	'proposalVersion',
	'applicationForm',
	'applicationFormField',
	'proposalFieldValue',
	'source',
	'bulkUpload',
	'changemakerFieldValue',
] as const;

export type ContextEntityType = (typeof CONTEXT_ENTITY_TYPES)[number];

export const CONTEXT_ENTITY_KEYS: Record<
	ContextEntityType,
	keyof PermissionGrantRow
> = {
	changemaker: 'changemakerId',
	funder: 'funderShortCode',
	dataProvider: 'dataProviderShortCode',
	opportunity: 'opportunityId',
	proposal: 'proposalId',
	proposalVersion: 'proposalVersionId',
	applicationForm: 'applicationFormId',
	applicationFormField: 'applicationFormFieldId',
	proposalFieldValue: 'proposalFieldValueId',
	source: 'sourceId',
	bulkUpload: 'bulkUploadTaskId',
	changemakerFieldValue: 'changemakerFieldValueId',
};

export const CONTEXT_ENTITY_KEY_IS_SHORT_CODE: ReadonlySet<string> = new Set([
	'funder',
	'dataProvider',
]);

/**
 * Valid `scope` values per `contextEntityType`. Mirrors
 * `contextEntityTypeScopes` in service/src/types/PermissionGrant.ts; keep
 * in sync when the service adds or changes a context type.
 */
export const CONTEXT_ENTITY_SCOPES: Record<
	ContextEntityType,
	readonly ContextEntityType[]
> = {
	changemaker: [
		'changemaker',
		'changemakerFieldValue',
		'proposal',
		'proposalFieldValue',
	],
	funder: ['funder', 'opportunity', 'proposal', 'proposalFieldValue'],
	dataProvider: ['dataProvider'],
	opportunity: ['opportunity', 'proposal', 'proposalFieldValue'],
	proposal: ['proposal', 'proposalFieldValue'],
	proposalVersion: ['proposalVersion'],
	applicationForm: ['applicationForm'],
	applicationFormField: ['applicationFormField'],
	proposalFieldValue: ['proposalFieldValue'],
	source: ['source'],
	bulkUpload: ['bulkUpload'],
	changemakerFieldValue: ['changemakerFieldValue'],
};

export const PERMISSION_VERBS = [
	'view',
	'create',
	'edit',
	'delete',
	'manage',
] as const;

export type PermissionVerb = (typeof PERMISSION_VERBS)[number];

interface LabeledOption {
	label: string;
	value: string;
}

export const PERMISSION_VERB_OPTIONS: LabeledOption[] = [
	{ label: 'View', value: 'view' },
	{ label: 'Create', value: 'create' },
	{ label: 'Edit', value: 'edit' },
	{ label: 'Delete', value: 'delete' },
	{ label: 'Manage', value: 'manage' },
];

export type GranteeType = 'user' | 'userGroup';

export const GRANTEE_TYPE_OPTIONS: LabeledOption[] = [
	{ label: 'User', value: 'user' },
	{ label: 'Group', value: 'userGroup' },
];

export const CONTEXT_ENTITY_TYPE_OPTIONS: LabeledOption[] =
	CONTEXT_ENTITY_TYPES.map((type) => ({ label: type, value: type }));

export const getEntityKeyPlaceholder = (
	contextEntityType: string | null | undefined,
): string =>
	typeof contextEntityType === 'string' &&
	CONTEXT_ENTITY_KEY_IS_SHORT_CODE.has(contextEntityType)
		? 'Entity Shortcode'
		: 'Entity ID';

export interface PermissionGrantFormState {
	granteeType: string | null;
	granteeId: string;
	contextEntityType: string | null;
	entityKey: string;
	verbs: string[];
	scope: string[];
}

const CONTEXT_ENTITY_TYPES_SET: ReadonlySet<string> = new Set(
	CONTEXT_ENTITY_TYPES,
);

export const isContextEntityType = (
	value: string | null | undefined,
): value is ContextEntityType =>
	typeof value === 'string' && CONTEXT_ENTITY_TYPES_SET.has(value);

export const isGranteeType = (
	value: string | null | undefined,
): value is GranteeType => value === 'user' || value === 'userGroup';

export const getScopesForContextEntityType = (
	value: string | null | undefined,
): readonly string[] =>
	isContextEntityType(value) ? CONTEXT_ENTITY_SCOPES[value] : [];

export const rowToFormState = (
	row: PermissionGrantRow,
): PermissionGrantFormState => {
	let entityKey = '';
	if (isContextEntityType(row.contextEntityType)) {
		const { [CONTEXT_ENTITY_KEYS[row.contextEntityType]]: value } = row;
		if (typeof value === 'string') entityKey = value;
		else if (typeof value === 'number') entityKey = value.toString();
	}
	return {
		granteeType: row.granteeType ?? null,
		granteeId:
			row.granteeUserKeycloakUserId ?? row.granteeKeycloakOrganizationId ?? '',
		contextEntityType: row.contextEntityType,
		entityKey,
		verbs: row.verbs,
		scope: row.scope,
	};
};

const MIN_ENTITY_ID = 1;

/**
 * Whether `entityKey` is a valid value for the selected `contextEntityType`.
 * Short-code contexts (funder, dataProvider) accept any non-empty string;
 * everything else requires a positive integer, since the backend rejects
 * the `NaN`-serializes-as-`null` case with a cryptic error.
 */
export const isValidEntityKey = (
	contextEntityType: string | null | undefined,
	entityKey: string,
): boolean => {
	const trimmed = entityKey.trim();
	if (trimmed === '') return false;
	if (typeof contextEntityType !== 'string') return false;
	if (CONTEXT_ENTITY_KEY_IS_SHORT_CODE.has(contextEntityType)) return true;
	const parsed = Number(trimmed);
	return Number.isInteger(parsed) && parsed >= MIN_ENTITY_ID;
};

export type WritablePermissionGrantPayload = {
	contextEntityType: ContextEntityType;
	scope: string[];
	verbs: string[];
} & (
	| { granteeType: 'user'; granteeUserKeycloakUserId: string }
	| { granteeType: 'userGroup'; granteeKeycloakOrganizationId: string }
);

export const formatEntityLabel = (row: PermissionGrantRow): string => {
	if (!isContextEntityType(row.contextEntityType)) return row.contextEntityType;
	const { [row.contextEntityType]: key } = CONTEXT_ENTITY_KEYS;
	const { [key]: value } = row;
	if (typeof value === 'number')
		return `${row.contextEntityType} #${value.toString()}`;
	if (typeof value === 'string' && value !== '')
		return `${row.contextEntityType} ${value}`;
	return row.contextEntityType;
};

const MIN_SELECTIONS = 1;

export const isFormReady = (form: PermissionGrantFormState): boolean =>
	isGranteeType(form.granteeType) &&
	form.granteeId.trim() !== '' &&
	isContextEntityType(form.contextEntityType) &&
	isValidEntityKey(form.contextEntityType, form.entityKey) &&
	form.verbs.length >= MIN_SELECTIONS &&
	form.scope.length >= MIN_SELECTIONS;

export const buildPermissionGrantPayload = (
	form: PermissionGrantFormState,
): WritablePermissionGrantPayload => {
	if (
		!isGranteeType(form.granteeType) ||
		!isContextEntityType(form.contextEntityType)
	) {
		throw new Error(
			'Cannot build permission grant payload: grantee type and context entity type are required.',
		);
	}
	const { granteeType, contextEntityType } = form;
	if (!isValidEntityKey(contextEntityType, form.entityKey)) {
		throw new Error(`Invalid entity key for context "${contextEntityType}".`);
	}
	const { [contextEntityType]: contextKey } = CONTEXT_ENTITY_KEYS;
	const contextValue = CONTEXT_ENTITY_KEY_IS_SHORT_CODE.has(contextEntityType)
		? form.entityKey.trim()
		: Number(form.entityKey);

	const granteeId = form.granteeId.trim();
	const grantee =
		granteeType === 'user'
			? { granteeType, granteeUserKeycloakUserId: granteeId }
			: { granteeType, granteeKeycloakOrganizationId: granteeId };

	const payload: Record<string, unknown> = {
		...grantee,
		contextEntityType,
		[contextKey]: contextValue,
		scope: form.scope,
		verbs: form.verbs,
	};

	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Dynamic contextKey prevents structural typing; guards above enforce the shape at runtime.
	return payload as unknown as WritablePermissionGrantPayload;
};
