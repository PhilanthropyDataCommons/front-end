<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
<template>
	<div>
		<h1>Page Not Found</h1>
		<p>
			We do not know the route <code>{{ route.path }}</code>
		</p>
	</div>
</template>
