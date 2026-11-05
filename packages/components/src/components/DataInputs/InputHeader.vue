<template>
	<div class="input-header" :class="{ 'input-header--with-help': $slots.help }">
		<h4><slot name="header"></slot></h4>
		<slot name="help"></slot>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.input-header--with-help {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--1x);
}
</style>
