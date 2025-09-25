<template>
	<div class="radio-input-container">
		<div class="radio-input-header">
			<slot name="radio-input-header"></slot>
		</div>

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

		<div class="radio-input-instructions">
			<slot name="radio-input-instructions"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const modelValue = defineModel<number | null>();

const HOURS_IN_DAY = 24;
const HOURS_IN_MONTH = 720; 
const DEFAULT_DURATION = 1;
const MIN_VALID_HOURS = 0;

const selectedValue = ref<string | null>(null);
const durationNumber = ref<number>(DEFAULT_DURATION);
const durationUnit = ref<string>('hours');

const hoursMultiplier = {
	hours: DEFAULT_DURATION,
	days: HOURS_IN_DAY,
	months: HOURS_IN_MONTH,
} as const;

const initializeFromModelValue = (): void => {
	if (modelValue.value === null || modelValue.value === MIN_VALID_HOURS) {
		selectedValue.value = 'permanent';
	} else {
		selectedValue.value = 'temporary';
		const { value: hours } = modelValue;
		if (hours !== undefined) {
			if (
				hours >= HOURS_IN_MONTH &&
				hours % HOURS_IN_MONTH === MIN_VALID_HOURS
			) {
				durationNumber.value = hours / HOURS_IN_MONTH;
				durationUnit.value = 'months';
			} else if (
				hours >= HOURS_IN_DAY &&
				hours % HOURS_IN_DAY === MIN_VALID_HOURS
			) {
				durationNumber.value = hours / HOURS_IN_DAY;
				durationUnit.value = 'days';
			} else {
				durationNumber.value = hours;
				durationUnit.value = 'hours';
			}
		}
	}
};

const updateValue = (): void => {
	if (selectedValue.value === 'permanent') {
		modelValue.value = null;
	} else if (selectedValue.value === 'temporary') {
		const { value: number } = durationNumber;
		if (number > MIN_VALID_HOURS) {
			const { value: unit } = durationUnit;
			if (unit === 'hours' || unit === 'days' || unit === 'months') {
				modelValue.value = number * hoursMultiplier[unit];
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

.text-color-gray-medium-dark {
	color: var(--color--gray--medium-dark);
}
</style>
