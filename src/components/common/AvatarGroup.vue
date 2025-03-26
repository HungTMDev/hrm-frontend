<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { computed } from 'vue';
import UserAvatar from './UserAvatar.vue';

interface Prop {
	users: any;
	maxVisible: number;
}

const props = withDefaults(defineProps<Prop>(), {
	maxVisible: 5,
});

const visibleUsers = computed(() => props.users?.slice(0, props.maxVisible));
const remainingCount = computed(() => props.users?.length! - props.maxVisible);
</script>

<template>
	<div class="flex items-center -space-x-3 rtl:space-x-reverse">
		<div v-for="(item, index) in visibleUsers" :key="index" class="relative">
			<TooltipProvider>
				<Tooltip :delay-duration="100">
					<TooltipTrigger as-child>
						<UserAvatar class="w-10 h-10" />
					</TooltipTrigger>
					<TooltipContent>
						<p>{{ item.name }}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
		<div
			v-if="remainingCount > 0"
			class="w-10 h-10 grid place-items-center relative z-10 bg-slate-50 rounded-full text-sm">
			+{{ remainingCount }}
		</div>
	</div>
</template>
