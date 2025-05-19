<script lang="ts" setup>
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import type { RouteType } from '@/types';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import AccordionTriggerCustom from '@/components/custom/AccordionTriggerCustom.vue';

const props = defineProps<{
	route: RouteType;
	isSmall?: boolean;
}>();

const currentRoute = useRoute();

const hasActiveChild = computed(() => {
	return props.route.children?.some((child) => currentRoute.path.startsWith(child.path));
});
</script>
<template>
	<TooltipProvider
		v-if="!route.children || route.children.length === 0"
		:delay-duration="100"
		:disable-hoverable-content="true">
		<Tooltip>
			<TooltipTrigger as-child>
				<RouterLink
					v-slot="{ isActive }"
					:to="route.path"
					class="flex gap-2 p-3 items-center rounded-r-xl text-sm font-medium"
					active-class="bg-blue-50 text-blue-500 relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-[3px] before:h-full before:bg-blue-500">
					<component v-if="!isActive" :is="route.icon" fill="currentColor" />
					<component v-else :is="route.activeIcon" fill="currentColor" />
					<span v-if="isSmall">{{ route.name }}</span>
				</RouterLink>
			</TooltipTrigger>
			<TooltipContent v-if="!isSmall" side="right">
				<p>{{ route.name }}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>

	<Accordion
		v-else
		type="single"
		class="w-full"
		collapsible
		:default-value="hasActiveChild ? route.id : undefined">
		<AccordionItem :value="route.id" class="border-none">
			<TooltipProvider :delay-duration="100" :disable-hoverable-content="isSmall">
				<Tooltip>
					<TooltipTrigger as-child>
						<AccordionTriggerCustom
							:is-small="isSmall"
							class="p-3 justify-start gap-2 hover:no-underline rounded-r-xl"
							:class="
								hasActiveChild &&
								`relative bg-blue-50 text-blue-500 before:content-[''] before:absolute before:left-0 before:top-0 before:w-[3px] before:h-full before:bg-blue-500`
							">
							<component
								v-if="!hasActiveChild"
								:is="route.icon"
								fill="currentColor"
								class="!rotate-0" />
							<component
								v-else
								:is="route.activeIcon"
								fill="currentColor"
								class="!rotate-0" />
							<span v-if="isSmall" class="flex-1 text-start">{{ route.name }}</span>
						</AccordionTriggerCustom>
					</TooltipTrigger>
					<TooltipContent v-if="!isSmall" side="right" align="start">
						<h3 class="text-base font-semibold px-2 my-2">{{ route.name }}</h3>
						<RouterLink
							v-for="item in route.children"
							:key="item.id"
							v-slot="{ isActive }"
							:to="item.path"
							class="flex gap-4 p-3 items-center rounded-xl text-sm font-medium hover:bg-slate-50 group">
							<div
								class="w-4 h-4 rounded-full border-4 group-hover:border-slate-50"
								:class="
									isActive
										? 'bg-blue-500 !border-blue-50'
										: 'bg-slate-200 border-white'
								"></div>
							<span>{{ item.name }}</span>
						</RouterLink>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<AccordionContent v-if="isSmall" class="ml-1 pb-0">
				<template v-for="item in route.children" :key="item.id">
					<TooltipProvider :delay-duration="100" :disable-hoverable-content="true">
						<Tooltip>
							<TooltipTrigger as-child>
								<RouterLink
									v-slot="{ isActive }"
									:to="item.path"
									class="flex gap-4 p-3 items-center rounded-r-xl text-sm font-medium">
									<div
										class="w-4 h-4 rounded-full border-4"
										:class="
											isActive
												? 'bg-blue-500 border-blue-50'
												: 'bg-slate-200 border-white'
										"></div>
									<span v-if="isSmall">{{ item.name }}</span>
								</RouterLink>
							</TooltipTrigger>
							<TooltipContent v-if="!isSmall" side="right">
								<p>{{ item.name }}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</template>
			</AccordionContent>
		</AccordionItem>
	</Accordion>
</template>
