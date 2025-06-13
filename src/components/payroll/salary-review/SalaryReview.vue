<script lang="ts" setup>
import AvatarGroup from '@/components/common/AvatarGroup.vue';
import Title from '@/components/common/Title.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { ChevronRight } from 'lucide-vue-next';

const users = [
	{ name: 'Nguyễn Văn A', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
	{ name: 'Trần Thị B', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
	{ name: 'Lê Văn C', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
	{ name: 'Hoàng D', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
	{ name: 'Phạm E', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
];
</script>
<template>
	<div>
		<div class="flex justify-between items-center">
			<Title>Salary Review Reminder</Title>
			<span class="w-5 h-5 rounded-full text-sm bg-red-500 text-white grid place-items-center">
				6
			</span>
		</div>
		<Separator class="my-4" />
		<div class="flex items-center">
			<div class="flex-1">
				<p class="text-xs mb-2">Incoming Salary Review</p>
				<AvatarGroup :users="users" :maxVisible="3" />
			</div>
			<ChevronRight />
		</div>
	</div>
</template>
