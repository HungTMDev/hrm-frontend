<script lang="ts" setup>
import IconFromSvg from './IconFromSvg.vue';

defineProps<{
	label: string;
	value: string;
	icon: any;
}>();
</script>
<template>
	<div class="grid grid-cols-2 items-center">
		<div class="flex gap-2 items-center">
			<IconFromSvg :icon="icon" />
			{{ label }}
		</div>
		<span class="text-black">{{ value }}</span>
	</div>
</template>
