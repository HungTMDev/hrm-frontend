<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Checklist from '@/assets/icons/Outline/ChecklistMinimalistic.svg';
import ChecklistBold from '@/assets/icons/Bold/ChecklistMinimalistic.svg';
import CheckCircle from '@/assets/icons/Outline/CheckCircle.svg';
import CheckCircleBold from '@/assets/icons/Bold/CheckCircle.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import { computed, onMounted, ref } from 'vue';
import AppliedTab from './applied-tab/AppliedTab.vue';
import PassedTab from './passed-tab/PassedTab.vue';
import { useRoute } from 'vue-router';
import router from '@/routers';

const route = useRoute();

const query = computed(() => route.query);

const activeTab = ref('applied');

const handleUpdate = (value: any) => {
	activeTab.value = value;
	router.push({ query: { ...query.value, subTab: activeTab.value } });
};

onMounted(() => {
	activeTab.value = ['applied', 'passed'].includes(query.value.subTab as string)
		? (query.value.subTab as string)
		: 'applied';
});
</script>

<template>
	<Tabs :model-value="activeTab" @update:model-value="handleUpdate">
		<TabsList class="rounded-2xl p-0.5">
			<TabsTrigger
				class="rounded-2xl px-4 py-2 w-40 data-[state=active]:text-blue-500"
				value="applied">
				<div class="flex items-center gap-2">
					<IconFromSvg v-if="activeTab === 'applied'" :icon="ChecklistBold" />
					<IconFromSvg v-else :icon="Checklist" /> Applied
				</div>
			</TabsTrigger>
			<TabsTrigger
				class="rounded-2xl px-4 py-2 w-40 data-[state=active]:text-blue-500"
				value="passed">
				<div class="flex items-center gap-2">
					<IconFromSvg v-if="activeTab === 'passed'" :icon="CheckCircleBold" />
					<IconFromSvg v-else :icon="CheckCircle" />Passed
				</div>
			</TabsTrigger>
		</TabsList>
		<TabsContent value="applied"> <AppliedTab /> </TabsContent>
		<TabsContent value="passed"> <PassedTab /> </TabsContent>
	</Tabs>
</template>
