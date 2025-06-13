<script lang="ts" setup>
import Magnifer from '@/assets/icons/Outline/Magnifer.svg';
import Siderbar from '@/assets/icons/Outline/Siderbar.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import { useAppStore } from '@/stores/app.store';
import NotificationPopover from './NotificationPopover.vue';
import UserDropdownMenu from './UserDropdownMenu.vue';

const appStore = useAppStore();

const handleSidebar = () => {
	appStore.toggleSidebar();
};
</script>
<template>
	<header
		class="bg-white h-20 shadow-sm sticky top-0 flex gap-4 items-center justify-between px-8 z-50">
		<div class="flex gap-4 items-center">
			<button class="p-2 border rounded-full" @click="handleSidebar">
				<IconFromSvg :icon="Siderbar" />
			</button>
			<InputWithIcon :icon="Magnifer" placeholder="Search..." class="rounded-full w-[450px]" />
		</div>

		<div class="flex gap-4 items-center">
			<NotificationPopover />
			<UserDropdownMenu />
		</div>
	</header>
</template>
