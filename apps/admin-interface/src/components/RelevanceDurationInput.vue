<template>
	<div class="radio-input-container">
		<InputHeader>
			<template #header><slot name="header"></slot></template>
		</InputHeader>

		<InputInstructions>
			<template #instructions><slot name="instructions"></slot></template>
		</InputInstructions>

		<fieldset>
			<div class="radio-input-container">
				<div class="radio-input-option">
					<input
						id="relevance-permanent"
						v-model="selectedValue"
						type="radio"
						name="relevanceDuration"
						value="permanent"
					/>
					<label for="relevance-permanent">
						Values do not lose relevance over time
					</label>
				</div>
			</div>

			<div class="radio-input-container">
				<div class="radio-input-option">
					<input
						id="relevance-temporary"
						v-model="selectedValue"
						type="radio"
						name="relevanceDuration"
						value="temporary"
					/>
					<label for="relevance-temporary">
						Values lose relevance after:
					</label>
				</div>
				<div
					class="duration-selectors"
					:class="{ disabled: selectedValue !== 'temporary' }"
				>
					<input
						v-model="durationNumber"
						type="number"
						min="1"
						max="1000"
						class="duration-number-input"
						:disabled="selectedValue !== 'temporary'"
						@input="updateValue"
					/>
					<select
						v-model="durationUnit"
						class="duration-unit-select"
						:disabled="selectedValue !== 'temporary'"
						@change="updateValue"
					>
						<option value="hours">hours</option>
						<option value="days">days</option>
						<option value="months">months</option>
					</select>
				</div>
			</div>
		</fieldset>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Duration } from 'luxon';
import { InputHeader, InputInstructions } from '@pdc/components';

const modelValue = defineModel<number | null>();

const DEFAULT_DURATION = 1;
const DEFAULT_MONTH_DURATION = 1;
const DEFAULT_DAY_DURATION = 1;
const MINIMUM_DURATION = 0;

const selectedValue = ref<string | null>(null);
const durationNumber = ref<number>(DEFAULT_DURATION);
const durationUnit = ref<string>('hours');

const initializeFromModelValue = (): void => {
	if (modelValue.value === null) {
		selectedValue.value = 'permanent';
		return;
	}

	selectedValue.value = 'temporary';
	const duration = Duration.fromObject({ hours: modelValue.value });

	const months = duration.as('months');
	const days = duration.as('days');
	const minMonths = Duration.fromObject({ months: DEFAULT_MONTH_DURATION }).as(
		'months',
	);
	const minDays = Duration.fromObject({ days: DEFAULT_DAY_DURATION }).as(
		'days',
	);

	if (months >= minMonths && Number.isInteger(months)) {
		durationNumber.value = Math.round(months);
		durationUnit.value = 'months';
	} else if (days >= minDays && Number.isInteger(days)) {
		durationNumber.value = Math.round(days);
		durationUnit.value = 'days';
	} else {
		durationNumber.value = duration.as('hours');
		durationUnit.value = 'hours';
	}
};

const updateValue = (): void => {
	if (selectedValue.value === 'permanent') {
		modelValue.value = null;
	} else if (selectedValue.value === 'temporary') {
		const { value: num } = durationNumber;
		if (num > MINIMUM_DURATION) {
			const { value: unit } = durationUnit;
			if (unit === 'hours' || unit === 'days' || unit === 'months') {
				const duration = Duration.fromObject({ [unit]: num });
				modelValue.value = Math.round(duration.as('hours'));
			}
		}
	}
};

watch(selectedValue, updateValue);
watch(modelValue, initializeFromModelValue, { immediate: true });
</script>

<style scoped>
fieldset {
	border: none;
	padding: 0;
	margin-top: 10px;
}

.radio-input-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.radio-input-option {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--1x);
}

.duration-selectors {
	display: flex;
	gap: var(--fixed-spacing--halfx);
	align-items: center;
	margin-top: var(--fixed-spacing--halfx);
}

.duration-selectors.disabled {
	opacity: 0.5;
}

.duration-number-input,
.duration-unit-select {
	border: 2px solid var(--color--gray--light);
	border-radius: var(--fixed-spacing--halfx);
	background: white;
	padding: 8px;
	transition: 0.4s;
	font-size: var(--font-size);
}

.duration-number-input {
	width: 80px;
	text-align: center;
}

.duration-number-input::-webkit-outer-spin-button,
.duration-number-input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

.duration-number-input[type='number'] {
	-moz-appearance: textfield;
	appearance: textfield;
}

.duration-number-input:disabled,
.duration-unit-select:disabled {
	background: var(--color--gray--light);
	cursor: not-allowed;
}
</style>
