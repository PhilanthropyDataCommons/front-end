import type { PermissionGrant } from '@pdc/sdk';

// The SDK's PermissionGrant type omits grantee fields the API returns and
// types `scope`/`verbs` as opaque empty interfaces. Reshape locally until
// the SDK catches up.
export type PermissionGrantRow = Omit<PermissionGrant, 'scope' | 'verbs'> & {
	scope: string[];
	verbs: string[];
	granteeType?: string;
	granteeUserKeycloakUserId?: string | null;
	granteeKeycloakOrganizationId?: string | null;
};

const ENTITY_LABEL_KEYS: Record<string, keyof PermissionGrantRow> = {
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

export const formatEntityLabel = (row: PermissionGrantRow): string => {
	const { [row.contextEntityType]: key } = ENTITY_LABEL_KEYS;
	if (key === undefined) return row.contextEntityType;
	const { [key]: value } = row;
	if (typeof value === 'number')
		return `${row.contextEntityType} #${value.toString()}`;
	if (typeof value === 'string' && value !== '')
		return `${row.contextEntityType} ${value}`;
	return row.contextEntityType;
};
