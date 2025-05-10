<script setup lang="ts">
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
if (subject || body) {
	const paramObj: {
		subject?: string;
		body?: string;
	} = {};
	if (subject) {
		paramObj.subject = subject;
	}
	if (body) {
		paramObj.body = body;
	}
	// The following line encodes both the key and value of the object using `encodeURIComponent`
	// and joins it into a query param string. It's like `URLSearchParams` except spaces are
	// encoded as `%20` instead of `+`, which is necessary for email clients to decode them.
	// TODO: Extract this out to a utils file so we can document and test it.
	params = Object.entries(paramObj)
		.map((kv) => kv.map(encodeURIComponent).join('='))
		.join('&');
}
</script>

<template>
	<a :href="`mailto:${to}${params ? `?${params}` : ''}`">
		<slot v-if="$slots.default"></slot> <span v-else>{{ to }}</span>
	</a>
</template>
