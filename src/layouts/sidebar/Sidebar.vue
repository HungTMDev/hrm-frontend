<script lang="ts" setup>
import Logo from '@/assets/images/Lutech-Logo.png';
import SmallLogo from '@/assets/images/SmallLogo.png';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useAppStore } from '@/stores/app.store';
import SidebarItem from './SidebarItem.vue';

const appStore = useAppStore();
</script>
<template>
	<aside
		:class="[
			'w-60 bg-white h-screen flex flex-col  sticky top-0 left-0 transition-all duration-200 ease-linear',
			appStore.isSmallSidebar ? '!w-20' : '',
		]">
		<div class="h-20 grid place-items-center">
			<RouterLink to="/">
				<img v-if="appStore.isSmallSidebar" :src="SmallLogo" alt="Logo" class="w-8 h-8" />
				<img v-else :src="Logo" alt="Logo" />
			</RouterLink>
		</div>
		<Separator class="w-4/5 mx-auto" />
		<ScrollArea class="flex-1 p-4 pr-1">
			<nav class="flex flex-col gap-4 duration-300 transition-all pr-3">
				<template v-for="item in appStore.routeList" :key="item.id">
					<SidebarItem :route="item" :is-small="!appStore.isSmallSidebar" />
				</template>
			</nav>
		</ScrollArea>
	</aside>
</template>
