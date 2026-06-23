import {
	PermissionGrantEntityType,
	PermissionGrantGranteeType,
	PermissionGrantVerb,
} from '@pdc/sdk';
import type { PermissionGrant } from '@pdc/sdk';

export type PermissionGrantRow = Omit<PermissionGrant, 'scope'> & {
	scope: string[];
	granteeType?: string;
	granteeUserKeycloakUserId?: string | null;
	granteeKeycloakOrganizationId?: string | null;
};

export type ContextEntityType = Exclude<`${PermissionGrantEntityType}`, 'any'>;

export const CONTEXT_ENTITY_TYPES: readonly ContextEntityType[] = (
	Object.values(
		PermissionGrantEntityType,
	) as ReadonlyArray<`${PermissionGrantEntityType}`>
).filter((value): value is ContextEntityType => value !== 'any');

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

export const CONTEXT_ENTITY_SCOPES: Record<
	ContextEntityType,
	ReadonlyArray<`${PermissionGrantEntityType}`>
> = {
	changemaker: [
		'changemaker',
		'changemakerFieldValue',
		'proposal',
		'proposalFieldValue',
		'any',
	],
	funder: [
		'funder',
		'opportunity',
		'applicationForm',
		'proposal',
		'proposalFieldValue',
		'any',
	],
	dataProvider: ['dataProvider', 'any'],
	opportunity: [
		'opportunity',
		'applicationForm',
		'proposal',
		'proposalFieldValue',
		'any',
	],
	proposal: ['proposal', 'proposalFieldValue', 'any'],
	proposalVersion: ['proposalVersion', 'any'],
	applicationForm: ['applicationForm', 'any'],
	applicationFormField: ['applicationFormField', 'any'],
	proposalFieldValue: ['proposalFieldValue', 'any'],
	source: ['source', 'any'],
	bulkUpload: ['bulkUpload', 'any'],
	changemakerFieldValue: ['changemakerFieldValue', 'any'],
};

interface LabeledOption {
	label: string;
	value: string;
}

export const humanLabel = (value: string): string =>
	value
		.replace(/(?<=[a-z])(?=[A-Z])/gu, ' ')
		.replace(/^./u, (first) => first.toUpperCase());

export const PERMISSION_VERB_OPTIONS: LabeledOption[] = Object.values(
	PermissionGrantVerb,
).map((verb) => ({ label: humanLabel(verb), value: verb }));

export type GranteeType = `${PermissionGrantGranteeType}`;

export const GRANTEE_TYPE_OPTIONS: LabeledOption[] = [
	{ label: 'User', value: PermissionGrantGranteeType.User },
	{ label: 'Group', value: PermissionGrantGranteeType.UserGroup },
	{
		label: 'All authenticated users',
		value: PermissionGrantGranteeType.AuthenticatedUsers,
	},
];

export const CONTEXT_ENTITY_TYPE_OPTIONS: LabeledOption[] =
	CONTEXT_ENTITY_TYPES.map((type) => ({
		label: humanLabel(type),
		value: type,
	}));

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
): value is GranteeType =>
	value === 'user' || value === 'userGroup' || value === 'authenticatedUsers';

export const granteeTypeRequiresId = (granteeType: GranteeType): boolean =>
	granteeType !== 'authenticatedUsers';

export const getScopesForContextEntityType = (
	value: string | null | undefined,
): readonly string[] =>
	isContextEntityType(value) ? CONTEXT_ENTITY_SCOPES[value] : [];

export const rowToFormState = (
	row: PermissionGrantRow,
): PermissionGrantFormState => {
	const entityKey = isContextEntityType(row.contextEntityType)
		? row[CONTEXT_ENTITY_KEYS[row.contextEntityType]]
		: undefined;
	return {
		granteeType: row.granteeType ?? null,
		granteeId:
			row.granteeUserKeycloakUserId ?? row.granteeKeycloakOrganizationId ?? '',
		contextEntityType: row.contextEntityType,
		entityKey:
			typeof entityKey === 'string' || typeof entityKey === 'number'
				? String(entityKey)
				: '',
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
	| {
			granteeType: `${PermissionGrantGranteeType.User}`;
			granteeUserKeycloakUserId: string;
	  }
	| {
			granteeType: `${PermissionGrantGranteeType.UserGroup}`;
			granteeKeycloakOrganizationId: string;
	  }
	| { granteeType: `${PermissionGrantGranteeType.AuthenticatedUsers}` }
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

export const ENTITY_LABEL_FIELDS: Partial<
	Record<ContextEntityType, { keyField: string; labelField: string }>
> = {
	changemaker: { keyField: 'id', labelField: 'name' },
	funder: { keyField: 'shortCode', labelField: 'name' },
	dataProvider: { keyField: 'shortCode', labelField: 'name' },
	opportunity: { keyField: 'id', labelField: 'title' },
	applicationForm: { keyField: 'id', labelField: 'name' },
	source: { keyField: 'id', labelField: 'label' },
};

export type EntityLabelLookup = ReadonlyMap<string, string>;

const entityLabelMapKey = (
	contextEntityType: string,
	entityKey: string | number,
): string => `${contextEntityType}:${String(entityKey)}`;

const readEntityField = (entry: unknown, field: string): unknown => {
	if (typeof entry !== 'object' || entry === null) return undefined;
	if (!(field in entry)) return undefined;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Dynamic field name driven by ENTITY_LABEL_FIELDS; SDK entry types don't carry an index signature.
	return (entry as Record<string, unknown>)[field];
};

export const buildEntityLabelLookup = (
	entityLists: Partial<
		Record<ContextEntityType, readonly unknown[] | undefined>
	>,
): EntityLabelLookup => {
	const lookup = new Map<string, string>();
	for (const type of CONTEXT_ENTITY_TYPES) {
		const { [type]: config } = ENTITY_LABEL_FIELDS;
		const { [type]: entries } = entityLists;
		if (config === undefined || entries === undefined) continue;
		for (const entry of entries) {
			const keyValue = readEntityField(entry, config.keyField);
			const labelValue = readEntityField(entry, config.labelField);
			if (
				(typeof keyValue !== 'string' && typeof keyValue !== 'number') ||
				typeof labelValue !== 'string' ||
				labelValue === ''
			)
				continue;
			lookup.set(entityLabelMapKey(type, keyValue), labelValue);
		}
	}
	return lookup;
};

export const resolveEntityLabel = (
	row: PermissionGrantRow,
	lookup: EntityLabelLookup,
): string => {
	if (isContextEntityType(row.contextEntityType)) {
		const { [row.contextEntityType]: key } = CONTEXT_ENTITY_KEYS;
		const { [key]: value } = row;
		if (typeof value === 'string' || typeof value === 'number') {
			const label = lookup.get(entityLabelMapKey(row.contextEntityType, value));
			if (label !== undefined) return label;
		}
	}
	return formatEntityLabel(row);
};

export const isEntityLabelPending = (
	row: PermissionGrantRow,
	loadingEntityTypes: ReadonlySet<ContextEntityType>,
): boolean =>
	isContextEntityType(row.contextEntityType) &&
	row.contextEntityType in ENTITY_LABEL_FIELDS &&
	loadingEntityTypes.has(row.contextEntityType);

const MIN_SELECTIONS = 1;

export const isFormReady = (form: PermissionGrantFormState): boolean => {
	if (!isGranteeType(form.granteeType)) return false;
	if (granteeTypeRequiresId(form.granteeType) && form.granteeId.trim() === '')
		return false;
	return (
		isContextEntityType(form.contextEntityType) &&
		isValidEntityKey(form.contextEntityType, form.entityKey) &&
		form.verbs.length >= MIN_SELECTIONS &&
		form.scope.length >= MIN_SELECTIONS
	);
};

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
	const grantee: Record<string, string> =
		granteeType === 'user'
			? { granteeType, granteeUserKeycloakUserId: granteeId }
			: granteeType === 'userGroup'
				? { granteeType, granteeKeycloakOrganizationId: granteeId }
				: { granteeType };

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
