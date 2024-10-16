import React from 'react';
import { useOidc } from '@axa-fr/react-oidc';
import {
	ArrowRightStartOnRectangleIcon,
	CircleStackIcon,
} from '@heroicons/react/24/outline';
import { Changemaker } from '@pdc/sdk';
import {
	Panel,
	PanelActions,
	PanelBody,
	PanelHeader,
	PanelTag,
	PanelTitle,
	PanelTitleTags,
	PanelTitleWrapper,
} from './Panel';
import {
	Dropdown,
	DropdownMenu,
	DropdownMenuLink,
	DropdownMenuText,
	DropdownTrigger,
} from './Dropdown';

interface ChangemakerDetailPanelProps {
	changemaker: Changemaker;
	children?: React.ReactNode;
}

const ChangemakerDetailPanel = ({
	changemaker,
	children = undefined,
}: ChangemakerDetailPanelProps) => {
	const { id, name, taxId } = changemaker;
	const { isAuthenticated } = useOidc();

	const showDataProviderMenu = isAuthenticated;

	return (
		<Panel>
			<PanelHeader>
				<PanelTitleWrapper>
					<PanelTitle>{name}</PanelTitle>
					<PanelTitleTags>
						{taxId && <PanelTag badge="Tax ID">{taxId}</PanelTag>}
					</PanelTitleTags>
				</PanelTitleWrapper>
				<PanelActions>
					{showDataProviderMenu && (
						<Dropdown>
							<DropdownTrigger>
								<CircleStackIcon />
								Data providers
							</DropdownTrigger>
							<DropdownMenu align="right">
								<DropdownMenuText>
									View applicant data from one of the data platform providers:
								</DropdownMenuText>
								<DropdownMenuLink
									to={`/changemakers/${id}/provider/candid`}
									icon={<ArrowRightStartOnRectangleIcon />}
									alignIcon="right"
									key="candid"
								>
									Candid
								</DropdownMenuLink>
								<DropdownMenuLink
									to={`/changemakers/${id}/provider/charity-navigator`}
									icon={<ArrowRightStartOnRectangleIcon />}
									alignIcon="right"
									key="charity-navigator"
								>
									Charity Navigator
								</DropdownMenuLink>
							</DropdownMenu>
						</Dropdown>
					)}
				</PanelActions>
			</PanelHeader>
			<PanelBody>{children}</PanelBody>
		</Panel>
	);
};

export { ChangemakerDetailPanel };
