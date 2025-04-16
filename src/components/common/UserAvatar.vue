<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

interface Prop {
	url?: string;
	showActive?: boolean;
	class?: HTMLAttributes['class'];
}

const props = defineProps<Prop>();
</script>

<template>
	<div :class="cn('relative', props.class)">
		<Avatar :class="cn('border-2 border-white', props.class)">
			<AvatarImage :src="url || 'https://github.com/unovue.png'" alt="Img" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
		<span
			v-if="showActive"
			class="w-4 h-4 rounded-full bg-green-500 absolute bottom-0 right-0 border-2 border-white z-100">
		</span>
	</div>
</template>
