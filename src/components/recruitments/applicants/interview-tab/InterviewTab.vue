<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Checklist from '@/assets/icons/Outline/Checklist Minimalistic.svg';
import ChecklistBold from '@/assets/icons/Bold/Checklist Minimalistic.svg';
import CheckCircle from '@/assets/icons/Outline/Check Circle.svg';
import CheckCircleBold from '@/assets/icons/Bold/Check Circle.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import { ref } from 'vue';

const activeTab = ref('applied');
</script>

<template>
	<Tabs v-model="activeTab">
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
		<TabsContent value="applied"> Make changes to your account here. </TabsContent>
		<TabsContent value="passed"> Change your password here. </TabsContent>
	</Tabs>
</template>
