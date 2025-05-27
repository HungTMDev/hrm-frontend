<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import FormArray from '@/components/form/FormArray.vue';
import FormInput from '@/components/form/FormInput.vue';
import Button from '@/components/ui/button/Button.vue';
import { FormControl } from '@/components/ui/form';
import Input from '@/components/ui/input/Input.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { z } from 'zod';

const formSchema = toTypedSchema(
	z.object({
		users: z.array(z.string()),
	}),
);

const initValue = ref({
	users: ['sdfsdf', 'âfasdasd'],
});

const initialValues = ref('');

const { handleSubmit } = useForm({
	validationSchema: formSchema,
	initialValues: initValue.value,
});

const onSubmit = handleSubmit((values) => {
	console.log(values);
});
</script>
<template>
	<ContentWrapper>
		<form @submit.prevent="onSubmit" class="space-y-6">
			<FormArray name="users" label="User" :init-value="initialValues">
				<template #default="{ baseName }">
					<FormInput :name="`${baseName}`" label="Name" />
				</template>
			</FormArray>

			<Button type="submit">Submit</Button>
		</form>
	</ContentWrapper>
</template>
