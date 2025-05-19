<script setup lang="ts">
import { ref, type HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '@/lib/utils';
import IconFromSvg from './IconFromSvg.vue';
import Eye from '@/assets/icons/Outline/Eye.svg';
import EyeClosed from '@/assets/icons/Outline/Eye Closed.svg';

const props = defineProps<{
	defaultValue?: string | number;
	modelValue?: string | number;
	class?: HTMLAttributes['class'];
	placeholder?: string;
	icon?: any;
	type?: string;
}>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string | number): void;
}>();

const showPassword = ref(false);

const modelValue = useVModel(props, 'modelValue', emits, {
	passive: true,
	defaultValue: props.defaultValue,
});

const handleShowPassword = () => {
	showPassword.value = !showPassword.value;
};
</script>

<template>
	<div
		:class="
			cn('flex gap-2 border border-input p-3 rounded-2xl w-fit items-center ', props.class)
		">
		<span v-if="icon" class="text-gray-200"><IconFromSvg :icon="icon" /></span>
		<input
			:type="showPassword ? 'text' : type"
			v-model="modelValue"
			:placeholder="placeholder"
			class="focus:outline-none placeholder:text-sm placeholder:text-gray-200 w-full text-sm bg-[--backgorund]"
			autocomplete="off" />
		<button
			type="button"
			@click="handleShowPassword"
			v-if="type === 'password'"
			class="text-gray-300">
			<IconFromSvg :icon="EyeClosed" v-if="!showPassword" /><IconFromSvg v-else :icon="Eye" />
		</button>
	</div>
</template>
