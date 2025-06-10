<script lang="ts" setup>
import type { FormFieldCommon, IUploadFileResponse } from '@/types';
import { FormField } from '../ui/form';
import FormControl from '../ui/form/FormControl.vue';
import FormItem from '../ui/form/FormItem.vue';
import FormLabel from '../ui/form/FormLabel.vue';
import FormErrorCustom from './FormErrorCustom.vue';
import CommonUpload from '../common/CommonUpload.vue';

interface Prop extends Omit<FormFieldCommon, 'modelValue'> {
	modelValue?: File;
	type: 'file' | 'photo';
	allowedTypes?: string[];
	previewUrl?: string;
	dataResponse?: IUploadFileResponse;
}
defineProps<Prop>();
</script>
<template>
	<FormField :model-value="modelValue" v-slot="{ componentField }" :name="name">
		<FormItem class="flex flex-col gap-2">
			<FormLabel>
				{{ label }}
				<span v-if="!required" class="text-slate-400 font-light">(optional)</span>
			</FormLabel>
			<FormControl>
				<CommonUpload
					:type="type"
					:preview-url="previewUrl"
					:allowed-types="allowedTypes"
					:data-response="dataResponse"
					v-bind="componentField" />
			</FormControl>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
