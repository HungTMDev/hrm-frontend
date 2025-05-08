<script setup lang="ts">
import UserSpeakBold from '@/assets/icons/Bold/User Speak.svg';
import UserSpeak from '@/assets/icons/Outline/User Speak.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import FormCalendar from '@/components/form/FormCalendar.vue';
import FormSelectArray from '@/components/form/FormSelectArray.vue';
import FormTime from '@/components/form/FormTime.vue';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { interviewSchema } from './schema';

defineProps<{
	open: boolean;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
}>();

const activeTab = ref('interview1');

const formSchema = toTypedSchema(interviewSchema);

const { handleSubmit, setFieldValue } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	console.log(values);
});

const handleOpen = (isOpen: boolean) => {
	emits('update:open', isOpen);
};

const setValue = (payload: { fieldName: any; data: any }) => {
	setFieldValue(payload.fieldName, payload.data);
};
</script>

<template>
	<Dialog :open="open" @update:open="handleOpen">
		<DialogContent class="w-96">
			<DialogHeader>
				<DialogTitle class="text-base font-medium">Schedule interview</DialogTitle>
				<DialogDescription> </DialogDescription>
			</DialogHeader>
			<form id="form" @submit="onSubmit">
				<Tabs v-model="activeTab" class="flex flex-col gap-2 items-center">
					<TabsList class="rounded-2xl p-0.5 mx-auto">
						<TabsTrigger
							class="w-40 px-3 py-2 rounded-2xl data-[state=active]:text-blue-500"
							value="interview1">
							<div class="flex items-center gap-2">
								<IconFromSvg
									v-if="activeTab === 'interview1'"
									:icon="UserSpeakBold" />
								<IconFromSvg v-else :icon="UserSpeak" />
								Interview 1
							</div>
						</TabsTrigger>
						<TabsTrigger
							class="w-40 px-3 py-2 rounded-2xl data-[state=active]:text-blue-500"
							value="interview2">
							<div class="flex items-center gap-2">
								<IconFromSvg
									v-if="activeTab === 'interview2'"
									:icon="UserSpeakBold" />
								<IconFromSvg v-else :icon="UserSpeak" />
								Interview 2
							</div>
						</TabsTrigger>
					</TabsList>
					<TabsContent
						v-show="activeTab === 'interview1'"
						class="w-full"
						value="interview1"
						:force-mount="true">
						<div class="grid gap-2">
							<FormCalendar
								name="interview_1.interview_date"
								label="Interview date"
								class="w-full"
								@update:value="setValue" />
							<FormTime
								name="interview_1.interview_time"
								label="Interview time"
								class="w-full"
								:required="true"
								@update:value="setValue" />
							<FormSelectArray
								name="interview_1.interviewer"
								label="Interviewer"
								class="w-full"
								:required="true"
								:list="[
									{
										label: 'Tuan',
										value: '01',
									},
								]"
								@update:select="setValue" />
						</div>
					</TabsContent>
					<TabsContent
						v-show="activeTab === 'interview2'"
						class="w-full"
						value="interview2"
						:force-mount="true">
						<div class="grid gap-2">
							<FormCalendar
								name="interview_2.interview_date"
								label="Interview date"
								class="w-full"
								@update:value="setValue" />
							<FormTime
								name="interview_2.interview_time"
								label="Interview time"
								class="w-full"
								:required="true"
								@update:value="setValue" />
							<FormSelectArray
								name="interview_2.interviewer"
								label="Interviewer"
								class="w-full"
								:required="true"
								:list="[
									{
										label: 'Tuan',
										value: '01',
									},
								]"
								@update:select="setValue" />
						</div>
					</TabsContent>
				</Tabs>
			</form>

			<DialogFooter> <Button form="form">Submit</Button> </DialogFooter>
		</DialogContent>
	</Dialog>
</template>
