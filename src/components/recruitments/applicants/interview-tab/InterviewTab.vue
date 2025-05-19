<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserSpeak from '@/assets/icons/Outline/User Speak.svg';
import UserSpeakBold from '@/assets/icons/Bold/User Speak.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import { ref } from 'vue';
import Interview1Tab from './interview-1-tab/Interview1Tab.vue';
import Interview2Tab from './interview-2-tab/Interview2Tab.vue';

const activeTab = ref('interview_1');
</script>

<template>
	<Tabs v-model="activeTab">
		<TabsList class="rounded-2xl p-0.5">
			<TabsTrigger
				class="rounded-2xl px-4 py-2 w-40 data-[state=active]:text-blue-500"
				value="interview_1">
				<div class="flex items-center gap-2">
					<IconFromSvg v-if="activeTab === 'interview_1'" :icon="UserSpeakBold" />
					<IconFromSvg v-else :icon="UserSpeak" /> Interview 1
				</div>
			</TabsTrigger>
			<TabsTrigger
				class="rounded-2xl px-4 py-2 w-40 data-[state=active]:text-blue-500"
				value="interview_2">
				<div class="flex items-center gap-2">
					<IconFromSvg v-if="activeTab === 'interview_2'" :icon="UserSpeakBold" />
					<IconFromSvg v-else :icon="UserSpeak" />Interview 2
				</div>
			</TabsTrigger>
		</TabsList>
		<TabsContent value="interview_1"> <Interview1Tab /> </TabsContent>
		<TabsContent value="interview_2"> <Interview2Tab /> </TabsContent>
	</Tabs>
</template>
