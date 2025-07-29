<script setup lang="ts">
import {
	CommandLineIcon as CommandLineIconOutline,
	InformationCircleIcon as InformationCircleIconOutline,
} from '@heroicons/vue/24/outline';
import {
	CommandLineIcon as CommandLineIconSolid,
	InformationCircleIcon as InformationCircleIconSolid,
} from '@heroicons/vue/24/solid';
import {
	DropdownComponent,
	DropdownTrigger,
	DropdownMenu,
	DropdownMenuLink,
	DropdownMenuLinkDescription,
} from './Dropdown';
import UserComponent from './UserComponent.vue';
</script>

<template>
	<nav class="App-navbar">
		<ul>
			<li>
				<DropdownComponent name="navbar-dropdown">
					<DropdownTrigger type="navbar-item">
						<InformationCircleIconOutline class="closed-only" />
						<InformationCircleIconSolid class="open-only" />
						About
					</DropdownTrigger>
					<DropdownMenu align="right">
						<DropdownMenuLink to="https://www.philanthropydatacommons.org">
							About the PDC project
							<DropdownMenuLinkDescription>
								Read about the history, vision, and mission of the PDC.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
						<DropdownMenuLink
							to="https://github.com/orgs/PhilanthropyDataCommons/discussions"
						>
							Questions or feedback
							<DropdownMenuLinkDescription>
								Ask a question or start a discussion.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
						<DropdownMenuLink
							to="https://github.com/PhilanthropyDataCommons/front-end/blob/main/RECENT_CHANGES.md"
						>
							Recent improvements
							<DropdownMenuLinkDescription>
								View recent changes to the PDC.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
					</DropdownMenu>
				</DropdownComponent>
			</li>
			<li>
				<DropdownComponent name="navbar-dropdown">
					<DropdownTrigger type="navbar-item">
						<CommandLineIconOutline class="closed-only" />
						<CommandLineIconSolid class="open-only" />
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
								Develop with our TypeScript SDK using <code>@pdc/sdk</code>{' '}
								from NPM.
							</DropdownMenuLinkDescription>
						</DropdownMenuLink>
					</DropdownMenu>
				</DropdownComponent>
			</li>
			<li>
				<UserComponent />
			</li>
		</ul>
	</nav>
</template>
