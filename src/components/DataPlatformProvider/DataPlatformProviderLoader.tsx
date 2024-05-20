import React from 'react';
import { JSONPath } from 'jsonpath-plus';
import { titleCase } from 'title-case';
import { useProviderData } from '../../pdc-api';
import { ClosablePanel, PanelTitle } from '../Panel';
import { DataPlatformProviderPanel } from './DataPlatformProviderPanel';

interface JSONPathAll {
	path: string;
	pointer: string;
	value: unknown;
}

const mapPathsToValues = (paths: string[][], data: object) =>
	paths
		.flatMap((path) =>
			JSONPath<JSONPathAll>({
				json: data,
				path,
				eval: false,
				resultType: 'all',
			}),
		)
		.map(({ path, pointer, value }) => ({
			jsonPath: path,
			fieldName: titleCase(
				pointer.substring(1).replace(/\//g, ': ').replace(/_/g, ' '),
			),
			value,
		}))
		.filter(({ value }) => value !== null && value !== undefined)
		.map(({ value, ...rest }) => ({ value: String(value), ...rest }))
		.filter(({ value }) => value.trim() !== '');

const providers = {
	candid: {
		name: 'Candid',
		parse: (data: object) => ({
			applicant: JSONPath<string>({
				json: data,
				path: ['$', 'summary', 'organization_name'],
				eval: false,
				resultType: 'value',
				wrap: false,
			}),
			url: JSONPath<string>({
				json: data,
				path: ['$', 'summary', 'gs_public_report'],
				eval: false,
				resultType: 'value',
				wrap: false,
			}),
			values: mapPathsToValues(
				[
					['$', 'summary', 'ein'],
					['$', 'summary', 'mission'],
					['$', 'summary', 'website_url'],
					['$', 'operations', 'blog_url'],
					['$', 'summary', 'telephone_numbers', '*', 'telephone_number'],
					['$', 'summary', 'social_media_urls', '*'],
					['$', 'summary', 'gs_profile_update_level'],
					['$', 'operations', 'leader_name'],
					['$', 'operations', 'leader_profile'],
					['$', 'operations', 'no_of_employees'],
					['$', 'operations', 'no_of_volunteers'],
					['$', 'operations', 'employees_greater_than_100K'],
					['$', 'operations', 'demographics', 'staff_level_totals', '*'],
					['$', 'operations', 'board_chair_name'],
					['$', 'operations', 'board_chair_affiliation'],
					['$', 'operations', 'board_of_directors', '*', 'name'],
					['$', 'summary', 'latitude'],
					['$', 'summary', 'longitude'],
					['$', 'summary', 'keywords'],
					['$', 'summary', 'ntee_code'],
					['$', 'summary', 'pcs_codes', '*', 'pcs_description'],
					['$', 'summary', 'profile_sdg_codes', '*', 'description'],
					['$', 'summary', 'addresses', '*', '*'],
				],
				data,
			),
		}),
	},
	'charity-navigator': {
		name: 'Charity Navigator',
		parse: (data: object) => ({
			applicant: JSONPath<string>({
				json: data,
				path: ['$', 'title'],
				eval: false,
				resultType: 'value',
				wrap: false,
			}),
			url: `https://www.charitynavigator.org${JSONPath<string>({
				json: data,
				path: ['$', 'url'],
				eval: false,
				resultType: 'value',
				wrap: false,
			})}`,
			values: mapPathsToValues(
				[
					['$', 'name'],
					['$', 'star_rating'],
					['$', 'ein'],
					['$', 'subsection'],
					['$', 'cause'],
					['$', 'city'],
					['$', 'state'],
					['$', 'size'],
					['$', 'acronym'],
					['$', 'donation_eligible'],
					['$', 'encompass_eligible'],
					['$', 'highest_level_advisory'],
					['$', 'akas', '*'],
				],
				data,
			),
		}),
	},
};
type KnownProvider = keyof typeof providers;

const isValidProvider = (provider: string): provider is KnownProvider =>
	Object.hasOwn(providers, provider);

interface DataPlatformProviderProps {
	externalId: string | undefined;
	onClose: () => void;
	provider: string;
}

const Invalid = ({
	onClose,
	provider,
}: Omit<Required<DataPlatformProviderProps>, 'externalId'>) => (
	<ClosablePanel
		onClose={onClose}
		title={<PanelTitle>Invalid Provider</PanelTitle>}
	>
		<div className="quiet">
			{`The data platform provider “${provider}” is not recognized.`}
		</div>
	</ClosablePanel>
);

interface ClosableKnownProviderProps {
	onClose: () => void;
	provider: KnownProvider;
}
const Loading = ({ onClose, provider }: ClosableKnownProviderProps) => (
	<ClosablePanel
		onClose={onClose}
		title={<PanelTitle>{providers[provider].name}</PanelTitle>}
	>
		<div className="quiet">Loading data…</div>
	</ClosablePanel>
);

const NoData = ({ onClose, provider }: ClosableKnownProviderProps) => (
	<ClosablePanel
		onClose={onClose}
		title={<PanelTitle>{providers[provider].name}</PanelTitle>}
	>
		<div className="quiet">No data found.</div>
	</ClosablePanel>
);

interface ProviderPanelLoaderProps {
	externalId: string;
	onClose: () => void;
	provider: KnownProvider;
}

const ProviderPanelLoader = ({
	externalId,
	onClose,
	provider,
}: ProviderPanelLoaderProps) => {
	const [allProviderData] = useProviderData(externalId);
	if (allProviderData === null) {
		return <Loading onClose={onClose} provider={provider} />;
	}
	const selectedProviderData = allProviderData.find(
		({ platformProvider }) => platformProvider === provider,
	);
	if (selectedProviderData === undefined) {
		return <NoData onClose={onClose} provider={provider} />;
	}
	const { parse, name } = providers[provider];
	const { applicant, url, values } = parse(selectedProviderData.data);
	return (
		<DataPlatformProviderPanel
			provider={name}
			applicant={applicant}
			url={url}
			onClose={onClose}
			values={values}
		/>
	);
};

const DataPlatformProviderLoader = ({
	externalId,
	onClose,
	provider,
}: DataPlatformProviderProps) => {
	if (!isValidProvider(provider)) {
		return <Invalid onClose={onClose} provider={provider} />;
	}
	if (externalId === undefined) {
		return <Loading onClose={onClose} provider={provider} />;
	}
	return (
		<ProviderPanelLoader
			externalId={externalId}
			onClose={onClose}
			provider={provider}
		/>
	);
};

export { DataPlatformProviderLoader };
