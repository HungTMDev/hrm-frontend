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
import { LogOut, User } from 'lucide-vue-next';
import Down from '@/assets/icons/Outline/Alt Arrow Down.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import { useGetAccount, useLogout } from '@/composables/auth/useAuth';
import { computed } from 'vue';
import type { IUser } from '@/types';

const { data } = useGetAccount();
const { mutate } = useLogout();

const account = computed(
	() => data.value ?? (JSON.parse(localStorage.getItem('account') ?? '{}') as IUser),
);

const handleLogout = async () => {
	mutate();
};
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline" class="border-none hover:bg-white h-auto gap-4 p-0">
				<UserAvatar class="w-12 h-12" />
				<div>
					<p class="text-start text-base font-medium">{{ account?.name }}</p>
					<p class="text-start text-sm font-normal text-slate-600">HR Manager</p>
				</div>
				<IconFromSvg :icon="Down" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56 bg-white border-slate-200 rounded-2xl" align="end">
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem class="rounded-xl py-3">
					<User class="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuItem class="rounded-xl py-3" @click="handleLogout">
				<LogOut class="mr-2 h-4 w-4" />
				<span>Log out</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
