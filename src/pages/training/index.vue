<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import FormCombobox from '@/components/form/FormCombobox.vue';
import FormSelectCalendar from '@/components/form/FormSelectCalendar.vue';
import FormTime from '@/components/form/FormTime.vue';
import { Button } from '@/components/ui/button';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { z } from 'zod';
import Down from '@/assets/icons/Outline/Alt Arrow Down.svg';
import FormSelect from '@/components/form/FormSelect.vue';

const value = ref('2025-05-05T22:00:00.000Z');

const formSchema = toTypedSchema(
	z.object({
		date: z.string(),
		time: z.string(),
		framework: z.array(z.string()),
	}),
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	console.log(values);
});
</script>
<template>
	<ContentWrapper>
		<form @submit="onSubmit">
			<FormSelectCalendar :model-value="value" name="date" label="Date" :required="true" />
			<FormTime :model-value="value" name="time" label="Time" :required="true" />
			<FormSelect
				name="framework"
				label="Framework"
				:required="true"
				:multiple="true"
				:icon="Down"
				:list="[
					{ label: 'English', value: 'en' },
					{ label: 'French', value: 'fr' },
					{ label: 'German', value: 'de' },
					{ label: 'Spanish', value: 'es' },
					{ label: 'Portuguese', value: 'pt' },
					{ label: 'Russian', value: 'ru' },
					{ label: 'Japanese', value: 'ja' },
					{ label: 'Korean', value: 'ko' },
					{ label: 'Chinese', value: 'zh' },
				]" />
			<Button>Submit</Button>
		</form>
	</ContentWrapper>
</template>
