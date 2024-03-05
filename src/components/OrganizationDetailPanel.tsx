import React from 'react';
import { Organization } from '@pdc/sdk';
import {
	Panel,
	PanelHeader,
	PanelTag,
	PanelTitle,
	PanelTitleTags,
	PanelTitleWrapper,
} from './Panel';

interface OrganizationDetailPanelProps {
	organization: Organization;
}

const OrganizationDetailPanel = ({
	organization,
}: OrganizationDetailPanelProps) => {
	const { name, employerIdentificationNumber } = organization;
	return (
		<Panel>
			<PanelHeader>
				<PanelTitleWrapper>
					<PanelTitle>{name}</PanelTitle>
					<PanelTitleTags>
						{employerIdentificationNumber && (
							<PanelTag badge="EIN">{employerIdentificationNumber}</PanelTag>
						)}
					</PanelTitleTags>
				</PanelTitleWrapper>
			</PanelHeader>
		</Panel>
	);
};

export { OrganizationDetailPanel };
