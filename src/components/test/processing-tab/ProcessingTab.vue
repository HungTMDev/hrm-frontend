<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { KanbanData } from '@/pages/training/index.vue';
import { useAppStore } from '@/stores/app.store';
import { ref } from 'vue';
import draggable from 'vuedraggable';

const appStore = useAppStore();

const data = ref<KanbanData[]>([
	{
		id: 1,
		stage: 'Testing',
		list: [
			{
				id: 10000,
				name: 'Nguyen Van An',
				status: 'Testing',
			},
		],
	},
	{
		id: 2,
		stage: 'Interview 1',
		list: [],
	},
	{
		id: 3,
		stage: 'Interview 2',
		list: [],
	},
	{
		id: 4,
		stage: 'Passed',
		list: [],
	},
	{
		id: 5,
		stage: 'Failed',
		list: [],
	},
]);
</script>
<template>
	<ContentWrapper
		class="rounded-tl-none"
		:class="
			cn(appStore.isSmallSidebar ? 'max-w-[calc(100vw-115px)]' : 'max-w-[calc(100vw-270px)]')
		">
		<ScrollArea class="w-full pb-3 mt-4">
			<div class="flex flex-row gap-4 w-fit mx-auto">
				<div
					v-for="item in data"
					:key="item.id"
					class="p-4 pr-1 bg-slate-100 rounded-2xl w-[300px]">
					<h3 class="text-base font-semibold mb-4">
						{{ item.stage }} ({{ item.list.length }})
					</h3>
					<ScrollArea class="h-[calc(100vh-350px)] pr-3">
						<draggable
							:list="item.list"
							item-key="id"
							:animation="200"
							group="recruitments"
							class="flex flex-col gap-2 h-[calc(100vh-350px)]">
							<template #item="{ element }">
								<Button
									variant="outline"
									class="p-3 h-auto bg-white hover:bg-white items-start rounded-xl border flex flex-col gap-3 hover:cursor-pointer">
									<div class="flex gap-2 items-center w-full">
										<UserAvatar />
										<div class="flex-1">
											<p class="font-medium text-start">Nguyen Van An</p>
											<span class="text-xs text-slate-600 text-start block"
												>annguyen@gmail.com</span
											>
										</div>
										<!-- <StatusTag :status="element.status" class="w-24" /> -->
									</div>

									<h3 class="font-medium text-base">{{ element.name }}</h3>

									<span class="text-xs text-slate-600">March 20, 2025</span>
								</Button>
							</template>
						</draggable>
					</ScrollArea>
				</div>
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	</ContentWrapper>
</template>
