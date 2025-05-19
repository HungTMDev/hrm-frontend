<script lang="ts" setup>
import UserAvatar from '../common/UserAvatar.vue';
import Title from '../common/Title.vue';
import Button from '../ui/button/Button.vue';
import Separator from '../ui/separator/Separator.vue';
import Skeleton from '../ui/skeleton/Skeleton.vue';

defineProps<{
	isLoading?: boolean;
}>();
</script>
<template>
	<div>
		<div class="flex justify-between items-center">
			<Title>Notifications</Title>
			<Button variant="link" class="text-blue-500">View all</Button>
		</div>
		<Separator class="my-2" />
		<div class="flex flex-col gap-4">
			<template v-if="isLoading">
				<div class="flex items-center gap-4" v-for="item in 5" :key="item">
					<Skeleton class="w-10 h-10 rounded-full" />
					<div class="w-[300px] flex flex-col gap-1">
						<Skeleton class="w-full h-5" />
						<Skeleton class="w-full h-4" />
					</div>
					<Skeleton class="w-[100px] h-5" />
				</div>
			</template>

			<template v-else>
				<div class="flex items-center gap-4" v-for="item in 5" :key="item">
					<UserAvatar class="w-10 h-10" />
					<div class="w-3/4 flex flex-col">
						<h4>Birthday Celebration!</h4>
						<p class="truncate text-sm text-gray-400">
							Birthday Celebration!Birthday Celebration!Birthday Celebration!
						</p>
					</div>
					<p class="text-xs text-gray-400">1m ago</p>
				</div>
			</template>
		</div>
	</div>
</template>
