<template>
	<code class="code-text"><slot /></code>
</template>

<style scoped>
.code-text {
	font-family:
		ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas,
		'DejaVu Sans Mono', monospace;
	font-size: 0.875em;
	background-color: #ffffff;
	color: var(--color--gray--dark, #1f2937);
	padding: 0.15em 0.4em;
	white-space: nowrap;
	display: inline-block;
}
</style>
