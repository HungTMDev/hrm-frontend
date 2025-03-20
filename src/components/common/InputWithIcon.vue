<script setup lang="ts">
import { ref, type HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '@/lib/utils';
import { Eye, EyeClosed } from 'lucide-vue-next';

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
	<div :class="cn('flex gap-2 border p-3 rounded-full w-[450px] items-center', props.class)">
		<span v-if="icon" class="text-gray-400"><component :is="icon" :size="18" /></span>
		<input
			:type="showPassword ? 'text' : type"
			v-model="modelValue"
			:placeholder="placeholder"
			class="focus:outline-none placeholder:text-sm w-full text-sm"
			autocomplete="off" />
		<button
			type="button"
			@click="handleShowPassword"
			v-if="type === 'password'"
			class="text-gray-300">
			<EyeClosed v-if="!showPassword" :size="18" /><Eye v-else :size="18" />
		</button>
	</div>
</template>
