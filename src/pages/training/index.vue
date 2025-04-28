<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import DateRangePicker from '@/components/common/DateRangePicker.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import UserAvatar from '@/components/common/UserAvatar.vue';
import Sheet from '@/components/training/Sheet.vue';
import Button from '@/components/ui/button/Button.vue';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { APPLICANT_STAGE_STYLE, applicantStages } from '@/constants';
import { useCustomToast } from '@/lib/customToast';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/app.store';
import { onBeforeMount, ref } from 'vue';
import draggable from 'vuedraggable';

export interface KanbanItem {
	id: number;
	name: string;
	status: string;
}

export interface KanbanData {
	id: number;
	stage: string;
	list: KanbanItem[];
}

const appStore = useAppStore();
const { showToast } = useCustomToast();

const data = ref<KanbanData[]>([]);
const isOpenSheet = ref(false);

onBeforeMount(() => {
	data.value = applicantStages.map((item, index) => {
		const itemCount = Math.floor(Math.random() * 10);
		const list = [];

		for (let i = 0; i < itemCount; i++) {
			list.push({
				id: Math.floor(Math.random() * 1000000),
				name: item.label + i,
				status: item.value,
			});
		}

		return {
			id: index,
			stage: item.label,
			list,
		};
	});
});

const handleOpenSheet = () => {
	isOpenSheet.value = true;
};

const handleCloseSheet = (open: boolean) => {
	isOpenSheet.value = open;
};

const onAdd = (event: any, stage: string) => {
	const currentItem = event.item.__draggable_context.element as KanbanItem;
	currentItem.status = stage;
	showToast({
		message: 'Success!',
		type: 'success',
	});
};
</script>
<template>
	<ContentWrapper
		:class="
			cn(appStore.isSmallSidebar ? 'max-w-[calc(100vw-115px)]' : 'max-w-[calc(100vw-270px)]')
		">
		<div class="text-end">
			<DateRangePicker />
		</div>
		<ScrollArea class="w-full pb-3 mt-4">
			<div class="flex flex-row gap-4 w-fit">
				<div
					v-for="item in data"
					:key="item.id"
					class="p-4 pr-1 bg-slate-100 rounded-2xl w-[350px]">
					<h3 class="text-base font-semibold mb-4">
						{{ item.stage }} ({{ item.list.length }})
					</h3>
					<ScrollArea class="h-[calc(100vh-336px)] pr-3">
						<draggable
							:list="item.list"
							item-key="id"
							:animation="200"
							group="recruitments"
							class="flex flex-col gap-2 h-[calc(100vh-336px)]"
							@add="(event) => onAdd(event, item.stage)">
							<template #item="{ element }">
								<Button
									@click="handleOpenSheet"
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
										<StatusTag
											:status="element.status"
											class="w-24"
											:class="APPLICANT_STAGE_STYLE[element.status]" />
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
	<Sheet :open="isOpenSheet" @update:open="handleCloseSheet" />
</template>
