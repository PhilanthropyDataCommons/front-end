<script setup lang="ts">
import qs from 'qs';

interface EmailLinkProps {
	/**
	 * Destination email address.
	 */
	to: string;
	/**
	 * Optional subject for the email.
	 */
	subject?: string;
	/**
	 * Optional body for the email.
	 */
	body?: string;
}

const {
	subject = undefined,
	body = undefined,
	to,
} = defineProps<EmailLinkProps>();

let params = '';
if (subject != null || body != null) {
	const paramObj: {
		subject?: string;
		body?: string;
	} = {};
	if (subject != null) {
		paramObj.subject = subject;
	}
	if (body != null) {
		paramObj.body = body;
	}

	params = qs.stringify(paramObj);
}
</script>

<template>
	<a :href="`mailto:${to}${params ? `?${params}` : ''}`">
		<slot v-if="$slots.default"></slot> <span v-else>{{ to }}</span>
	</a>
</template>
