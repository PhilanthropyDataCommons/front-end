<script setup lang="ts">
interface ToggleSwitchProps {
	checked?: boolean;
	onChange?: () => void;
}

const { checked = false, onChange = undefined } =
	defineProps<ToggleSwitchProps>();
</script>

<!-- Without an onChange handler, this can't be a controlled component, so we use
`defaultChecked` instead. -->
<template>
	<label className="toggle-switch">
		<input
			type="checkbox"
			:onChange="onChange"
			:checked="onChange ? checked : undefined"
			:defaultChecked="onChange ? undefined : checked"
		/>
		<span><slot></slot></span>
	</label>
</template>

<style>
:root {
	--toggle-switch--width: 2.5em;
	--toggle-switch--height: calc(1em * var(--line-height) * 1px);
	--toggle-switch--inset: 0.15em;
	--toggle-switch--background-color--off: var(--color--gray);
	--toggle-switch--background-color--on: var(--color--blue);
	--toggle-switch--indicator-size: calc(
		100% - (var(--toggle-switch--inset) * 2)
	);
}

.toggle-switch {
	display: inline-flex;
	gap: 1ch;
	cursor: pointer;

	font-weight: var(--font-weight--medium);

	> input[type='checkbox'] {
		all: unset;
		box-sizing: border-box;

		--toggle-switch--background-color: var(
			--toggle-switch--background-color--off
		);
		--toggle-switch--indicator-position: var(--toggle-switch--inset);

		display: block;
		position: relative;
		width: var(--toggle-switch--width);
		height: var(--toggle-switch--height);
		border-radius: 5em;
		background-color: var(--toggle-switch--background-color);

		transition: var(--transition-duration) background-color;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: var(--toggle-switch--inset);
			height: var(--toggle-switch--indicator-size);
			aspect-ratio: 1;
			border-radius: 5em;
			background-color: white;
			transform: translateX(var(--toggle-switch--indicator-position));

			transition: var(--transition-duration) transform;
		}

		&:checked {
			--toggle-switch--background-color: var(
				--toggle-switch--background-color--on
			);
			--toggle-switch--indicator-position: calc(
				var(--toggle-switch--width) - var(--toggle-switch--indicator-size) -
					(var(--toggle-switch--inset) * 3)
			);
		}

		&:focus,
		&:active {
			outline: var(--outline);
			outline-offset: 1px;
		}
	}
}
</style>
