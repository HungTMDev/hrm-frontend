<script lang="ts" setup>
import FormTextarea from '@/components/form/FormTextarea.vue';
import Button from '@/components/ui/button/Button.vue';
import Editor from 'primevue/editor';
import { ref } from 'vue';

const props = defineProps<{
	step: number;
}>();

const emit = defineEmits<{
	(e: 'update:step', payload: number): void;
}>();

const value = ref('');

const handleBack = () => {
	emit('update:step', props.step - 1);
};
</script>
<template>
	<form class="flex flex-col gap-4">
		<FormTextarea
			label="Job description"
			name="jobDesc"
			placeholder="A detailed job description"
			class="rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 h-72" />
		<div>
			<Editor v-model="value" editorStyle="height: 320px"> </Editor>
		</div>
		<div class="flex gap-2 justify-end">
			<Button
				type="button"
				variant="outline"
				class="rounded-2xl h-auto py-3.5 px-8"
				@click="handleBack">
				Back
			</Button>
			<Button class="bg-blue-500 hover:bg-blue-600 rounded-2xl h-auto py-3.5 px-8">
				Create
			</Button>
		</div>
	</form>
</template>
