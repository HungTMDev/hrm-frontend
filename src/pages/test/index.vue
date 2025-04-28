<script setup lang="ts">
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import AppliedTab from '@/components/test/applied-tab/AppliedTab.vue';
import DoneTab from '@/components/test/done-tab/DoneTab.vue';
import ProcessingTab from '@/components/test/processing-tab/ProcessingTab.vue';
import WaitingTab from '@/components/test/waiting-tab/WaitingTab.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
</script>

<template>
	<Tabs default-value="applied" class="">
		<TabsList class="w-full p-0 justify-start gap-1 bg-slate-100">
			<TabsTrigger
				class="rounded-xl rounded-b-none py-3.5 w-28 bg-gray-50 data-[state=active]:shadow-none"
				value="applied">
				Applied
			</TabsTrigger>
			<TabsTrigger
				class="rounded-xl rounded-b-none py-3.5 w-28 bg-gray-50 data-[state=active]:shadow-none"
				value="processing">
				Processing
			</TabsTrigger>
			<TabsTrigger
				class="rounded-xl rounded-b-none py-3.5 w-28 bg-gray-50 data-[state=active]:shadow-none"
				value="waiting">
				Waiting
			</TabsTrigger>
			<TabsTrigger
				class="rounded-xl rounded-b-none py-3.5 w-28 bg-gray-50 data-[state=active]:shadow-none"
				value="done">
				Done
			</TabsTrigger>
		</TabsList>
		<TabsContent value="applied" class="mt-0">
			<AppliedTab />
		</TabsContent>
		<TabsContent value="processing" class="mt-0">
			<ProcessingTab />
		</TabsContent>
		<TabsContent value="waiting" class="mt-0"><WaitingTab /> </TabsContent>
		<TabsContent value="done" class="mt-0"> <DoneTab /></TabsContent>
	</Tabs>
</template>
