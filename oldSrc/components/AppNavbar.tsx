import {
	CommandLineIcon as CommandLineIconOutline,
	InformationCircleIcon as InformationCircleIconOutline,
} from '@heroicons/react/24/outline';
import {
	CommandLineIcon as CommandLineIconSolid,
	InformationCircleIcon as InformationCircleIconSolid,
} from '@heroicons/react/24/solid';
import { User } from './User';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownMenuLink,
	DropdownMenuLinkDescription,
} from './Dropdown';

const AppNavbar = () => (
	<nav className="App-navbar">
		<ul>
			<li>
				<Dropdown name="navbar-dropdown">
					<DropdownTrigger type="navbar-item">
						<InformationCircleIconOutline className="closed-only" />
						<InformationCircleIconSolid className="open-only" />
						About
					</DropdownTrigger>
					<DropdownMenu align="right">
						<DropdownMenuLink to="https://www.philanthropydatacommons.org">
							About the PDC project
							<DropdownMenuLinkDescription>
								Read about the history, vision, and mission of the PDC.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
						<DropdownMenuLink to="https://github.com/orgs/PhilanthropyDataCommons/discussions">
							Questions or feedback
							<DropdownMenuLinkDescription>
								Ask a question or start a discussion.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
						<DropdownMenuLink to="https://github.com/PhilanthropyDataCommons/front-end/blob/main/RECENT_CHANGES.md">
							Recent improvements
							<DropdownMenuLinkDescription>
								View recent changes to the PDC.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
					</DropdownMenu>
				</Dropdown>
			</li>
			<li>
				<Dropdown name="navbar-dropdown">
					<DropdownTrigger type="navbar-item">
						<CommandLineIconOutline className="closed-only" />
						<CommandLineIconSolid className="open-only" />
						Developers
					</DropdownTrigger>
					<DropdownMenu align="right">
						<DropdownMenuLink to="https://api.philanthropydatacommons.org">
							API Documentation
							<DropdownMenuLinkDescription>
								Read the Swagger spec to interact with the PDC via our API.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
						<DropdownMenuLink to="https://www.npmjs.com/package/@pdc/sdk">
							TypeScript SDK
							<DropdownMenuLinkDescription>
								Develop with our TypeScript SDK using <code>@pdc/sdk</code> from
								NPM.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
						{import.meta.env.VITE_SHOW_STORYBOOK === 'true' && (
							<DropdownMenuLink to="/storybook/" reloadDocument>
								Storybook
								<DropdownMenuLinkDescription>
									View our UI component library. (Only relevant to PDC front end
									developers.)
								</DropdownMenuLinkDescription>
							</DropdownMenuLink>
						)}
					</DropdownMenu>
				</Dropdown>
			</li>
			<li>
				<User />
			</li>
		</ul>
	</nav>
);

export { AppNavbar };
