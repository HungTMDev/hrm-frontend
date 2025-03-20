<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import Bell from '@/assets/icons/Outline/Bell.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<button class="w-10 h-10 p-2 rounded-full flex items-center justify-center relative">
				<IconFromSvg :icon="Bell" />
				<span
					class="w-3 h-3 bg-red-500 top-1.5 right-2 rounded-full absolute border-2 border-white"></span>
			</button>
		</PopoverTrigger>
		<PopoverContent class="w-80" align="end"> Notification </PopoverContent>
	</Popover>
</template>
