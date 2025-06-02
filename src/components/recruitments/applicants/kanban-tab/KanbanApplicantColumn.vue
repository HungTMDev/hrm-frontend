<script lang="ts" setup>
import UserAvatar from '@/components/common/UserAvatar.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatISOStringToLocalDateTime } from '@/lib/utils';
import draggable from 'vuedraggable';
import type { KanbanApplicantItem } from './type';
import { Skeleton } from '@/components/ui/skeleton';

defineProps<{
	list: KanbanApplicantItem[];
	label: string;
	group: string;
	columnName: string;
	isLoading?: boolean;
}>();

const emits = defineEmits<{
	(e: 'add', event: any): void;
	(e: 'item:click', id: string): void;
}>();

const onAdd = (event: any) => {
	emits('add', event);
};

const handleClickItem = (id: string) => {
	emits('item:click', id);
};
</script>
<template>
	<div class="bg-slate-100 rounded-2xl p-4 pr-1 w-[340px]">
		<h3 class="text-base font-semibold">{{ label }} ({{ list?.length ?? 0 }})</h3>
		<ScrollArea class="mt-2 h-[calc(100vh-390px)] pr-3">
			<div v-if="isLoading" class="flex flex-col gap-2">
				<div class="bg-white flex flex-col gap-2 rounded-2xl p-3">
					<div class="flex items-center gap-2">
						<Skeleton class="h-10 w-10 rounded-full" />
						<div class="flex flex-col gap-1">
							<Skeleton class="h-5 w-60" />
							<Skeleton class="h-4 w-60" />
						</div>
					</div>
					<Skeleton class="h-5 w-[284px]" />
					<Skeleton class="h-5 w-[284px]" />
				</div>
				<div class="bg-white flex flex-col gap-2 rounded-2xl p-3">
					<div class="flex items-center gap-2">
						<Skeleton class="h-10 w-10 rounded-full" />
						<div class="flex flex-col gap-1">
							<Skeleton class="h-5 w-60" />
							<Skeleton class="h-4 w-60" />
						</div>
					</div>
					<Skeleton class="h-5 w-[284px]" />
					<Skeleton class="h-5 w-[284px]" />
				</div>
				<div class="bg-white flex flex-col gap-2 rounded-2xl p-3">
					<div class="flex items-center gap-2">
						<Skeleton class="h-10 w-10 rounded-full" />
						<div class="flex flex-col gap-1">
							<Skeleton class="h-5 w-60" />
							<Skeleton class="h-4 w-60" />
						</div>
					</div>
					<Skeleton class="h-5 w-[284px]" />
					<Skeleton class="h-5 w-[284px]" />
				</div>
				<div class="bg-white flex flex-col gap-2 rounded-2xl p-3">
					<div class="flex items-center gap-2">
						<Skeleton class="h-10 w-10 rounded-full" />
						<div class="flex flex-col gap-1">
							<Skeleton class="h-5 w-60" />
							<Skeleton class="h-4 w-60" />
						</div>
					</div>
					<Skeleton class="h-5 w-[284px]" />
					<Skeleton class="h-5 w-[284px]" />
				</div>
				<div class="bg-white flex flex-col gap-2 rounded-2xl p-3">
					<div class="flex items-center gap-2">
						<Skeleton class="h-10 w-10 rounded-full" />
						<div class="flex flex-col gap-1">
							<Skeleton class="h-5 w-60" />
							<Skeleton class="h-4 w-60" />
						</div>
					</div>
					<Skeleton class="h-5 w-[284px]" />
					<Skeleton class="h-5 w-[284px]" />
				</div>
			</div>
			<draggable
				v-else
				:list="list"
				:group="group"
				:animation="200"
				:data-name="columnName"
				item-key="id"
				:disabled="isLoading"
				@add="onAdd"
				class="flex flex-col gap-2 h-[calc(100vh-390px)]">
				<template #item="{ element }">
					<div
						class="bg-white flex flex-col gap-2 rounded-2xl p-3 hover:cursor-pointer"
						@click="handleClickItem(element.id)">
						<div class="flex items-center gap-2">
							<UserAvatar class="w-8 h-8" />
							<div>
								<p class="font-medium">{{ element.name }}</p>
								<span class="text-xs">{{ element.email }}</span>
							</div>
						</div>
						<div class="text-base font-medium">{{ element.position }}</div>
						<span class="text-xs text-slate-400">{{
							formatISOStringToLocalDateTime(element.applied_at).date
						}}</span>
					</div>
				</template>
			</draggable>
		</ScrollArea>
	</div>
</template>
