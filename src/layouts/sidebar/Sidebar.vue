<script lang="ts" setup>
import Logo from '@/assets/images/Lutech-Logo.png';
import SmallLogo from '@/assets/images/SmallLogo.png';
import { useAppStore } from '@/stores/app.store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const appStore = useAppStore();
</script>
<template>
	<aside
		:class="[
			'w-60 bg-white h-screen  sticky top-0 left-0 transition-all duration-200 ease-linear',
			appStore.isSmallSidebar ? '!w-20' : '',
		]">
		<div class="h-20 grid place-items-center">
			<RouterLink to="/">
				<img v-if="appStore.isSmallSidebar" :src="SmallLogo" alt="Logo" class="w-8 h-8" />
				<img v-else :src="Logo" alt="Logo" />
			</RouterLink>
		</div>
		<div class="flex justify-center">
			<div class="w-4/5 h-[1px] bg-gray-200"></div>
		</div>
		<div class="p-4">
			<nav class="flex flex-col gap-4 duration-300 transition-all">
				<TooltipProvider
					v-for="(item, index) in appStore.routeList"
					:key="index"
					:delay-duration="100"
					:disable-hoverable-content="true">
					<Tooltip>
						<TooltipTrigger as-child>
							<RouterLink
								v-slot="{ isActive }"
								:to="item.path"
								class="flex gap-2 p-3 items-center rounded-r-xl text-sm font-medium"
								active-class="bg-blue-50 text-blue-500 relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-[3px] before:h-full before:bg-blue-500">
								<component v-if="!isActive" :is="item.icon" fill="currentColor" />
								<component v-else :is="item.activeIcon" fill="currentColor" />
								<span v-if="!appStore.isSmallSidebar">{{ item.name }}</span>
							</RouterLink>
						</TooltipTrigger>
						<TooltipContent v-if="appStore.isSmallSidebar" side="right">
							<p>{{ item.name }}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav>
		</div>
	</aside>
</template>
