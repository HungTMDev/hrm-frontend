<script lang="ts" setup>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { onMounted, ref } from 'vue';

const props = defineProps<{
	modelValue?: string[];
	placeholder: string;
	type?: 'ordered' | 'bullet';
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: string[] | undefined): void;
}>();

const editorRef = ref();
let quill: Quill;

onMounted(() => {
	quill = new Quill(editorRef.value, {
		theme: 'snow',
		placeholder: props.placeholder,
		modules: {
			toolbar: [
				['bold', 'italic', 'underline'],
				[{ list: 'ordered' }, { list: 'bullet' }],
				['link', 'image'],
			],
		},
	});

	const type = props.type ?? 'ordered';

	if (props.modelValue && props.modelValue.length > 0) {
		const htmlList = `<ol>${props.modelValue.map((item) => `<li data-list="${type}">${item}</li>`).join('')}</ol>`;
		quill.root.innerHTML = htmlList;
	}

	quill.on('text-change', () => {
		const data = quill.getText().trim().split('\n');
		if (data[0] === '') {
			emit('update:modelValue', undefined);
			return;
		}
		emit('update:modelValue', data);
	});
});
</script>
<template>
	<div class="mt-2">
		<div ref="editorRef" class="min-h-[300px] w-full" />
	</div>
</template>

<style>
.ql-toolbar {
	border-radius: 16px 16px 0px 0px;
	border: 1px solid #f0f0f0 !important;
}

.ql-container {
	border-radius: 0px 0px 16px 16px;
	border: 1px solid #f0f0f0 !important;
	border-top: none !important;
	font-size: 14px;
}

.ql-editor {
	height: 300px;
}

.ql-editor.ql-blank::before {
	font-family: 'Inter', sans-serif;
	font-style: normal;
	color: #bfbfbf;
	font-size: 14px;
}
</style>
