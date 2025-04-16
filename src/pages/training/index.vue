<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import Button from '@/components/ui/button/Button.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import Input from '@/components/ui/input/Input.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { z } from 'zod';

const schema = [
	z.object({
		name: z.string().min(1),
		age: z.number().min(0),
	}),
	z.object({
		address: z.string().min(1),
	}),
];

const step = ref(1);

const onSubmit = (values: any) => {
	console.log(values);
};
</script>
<template>
	<ContentWrapper>
		<Form
			v-slot="{ meta, values, validate }"
			as=""
			keep-values
			:validation-schema="toTypedSchema(schema[step - 1])">
			<form
				@submit="
					async (e) => {
						e.preventDefault();
						await validate();

						if (step === 2 && meta.valid) {
							onSubmit(values);
						}

						if (meta.valid && step < 2) {
							step++;
						}
					}
				">
				<div v-if="step === 1">
					<FormField v-slot="{ componentField }" name="name">
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input type="text" v-bind="componentField" />
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="age">
						<FormItem>
							<FormLabel>Age</FormLabel>
							<FormControl>
								<Input type="number" v-bind="componentField" />
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<Button>Next</Button>
				</div>
				<div v-if="step === 2">
					<FormField v-slot="{ componentField }" name="address">
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Input type="text" v-bind="componentField" />
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<Button>Submit</Button>
				</div>
			</form>
		</Form>
	</ContentWrapper>
</template>
