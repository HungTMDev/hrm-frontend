<script setup lang="ts">
import UserAvatar from '@/components/common/UserAvatar.vue';
import { Button } from '@/components/ui/button';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import router from '@/routers';
import { LogOut, User } from 'lucide-vue-next';
import Down from '@/assets/icons/Outline/Alt Arrow Down.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';

const handleLogout = () => {
	router.push('/auth');
};
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline" class="border-none hover:bg-white h-auto gap-4 p-0">
				<UserAvatar class="w-12 h-12" />
				<div>
					<p class="text-start text-base font-medium">Le Thi Linh Ly</p>
					<p class="text-start text-sm font-normal">HR Manager</p>
				</div>
				<IconFromSvg :icon="Down" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56 bg-white border-slate-200" align="end">
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem>
					<User class="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="handleLogout">
				<LogOut class="mr-2 h-4 w-4" />
				<span>Log out</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
