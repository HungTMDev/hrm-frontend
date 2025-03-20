<script lang="ts" setup>
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import { PanelRightClose, PanelRightOpen, Search } from 'lucide-vue-next';
import NotificationPopover from './NotificationPopover.vue';
import UserDropdownMenu from './UserDropdownMenu.vue';
import { useAppStore } from '@/stores/app.store';

const appStore = useAppStore();

const handleSidebar = () => {
	appStore.handleSmallSidebar();
};
</script>
<template>
	<header
		class="bg-white h-20 shadow-sm sticky top-0 flex gap-4 items-center justify-between px-8 z-50">
		<div class="flex gap-4 items-center">
			<button class="p-2 border rounded" @click="handleSidebar">
				<PanelRightOpen v-if="!appStore.isSmallSidebar" :size="18" />
				<PanelRightClose v-else :size="18" />
			</button>
			<InputWithIcon :icon="Search" placeholder="Search..." />
		</div>

		<div class="flex gap-4 items-center">
			<NotificationPopover />
			<UserDropdownMenu />
		</div>
	</header>
</template>
