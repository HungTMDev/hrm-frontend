<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate';
import { toValue } from 'vue';
import { useFormField } from '../ui/form/useFormField';
import { Info } from 'lucide-vue-next';

const { name, formMessageId, error } = useFormField();
</script>

<template>
	<div v-if="error" class="flex gap-1">
		<div class="text-destructive mt-0.5">
			<Info :size="16" />
		</div>
		<ErrorMessage
			:id="formMessageId"
			as="p"
			:name="toValue(name)"
			class="text-sm font-medium text-destructive" />
	</div>
</template>
