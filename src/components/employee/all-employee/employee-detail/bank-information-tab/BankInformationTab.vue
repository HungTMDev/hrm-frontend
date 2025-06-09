<script lang="ts" setup>
import Building3 from '@/assets/icons/Outline/Buildings3.svg';
import Card from '@/assets/icons/Outline/Card.svg';
import HomeAdd from '@/assets/icons/Outline/HomeAdd.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import UserId from '@/assets/icons/Outline/UserId.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import InformationItem from '@/components/common/InformationItem.vue';
import Title from '@/components/common/Title.vue';
import FormInput from '@/components/form/FormInput.vue';
import Button from '@/components/ui/button/Button.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { bankInformationSchema } from './schema';

const isEdit = ref(false);

const formSchema = toTypedSchema(bankInformationSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	console.log(values);
});

const handleEdit = () => {
	isEdit.value = true;
};

const handleCancel = () => {
	isEdit.value = false;
};
</script>
<template>
	<div class="flex flex-col gap-6 h-full">
		<Title>Insurance information</Title>
		<ScrollArea class="text-slate-600 pr-3 flex-1">
			<form v-if="isEdit" id="form" @submit="onSubmit">
				<div class="grid grid-cols-2 gap-y-4 gap-x-6">
					<FormInput
						:required="true"
						name="bank_name"
						label="Bank name"
						placeholder="Enter Bank name"
						:icon="Building3"
						class="w-full" />
					<FormInput
						:required="true"
						name="account_number"
						label="Account number"
						placeholder="Enter account number"
						class="w-full"
						:icon="Card" />
					<FormInput
						:required="true"
						name="account_holder_name"
						label="Account holder name"
						class="w-full"
						placeholder="Enter account holder name"
						:icon="UserId" />
					<FormInput
						:required="true"
						name="bank_branch"
						label="Bank branch"
						class="w-full"
						placeholder="Enter bank branch"
						:icon="HomeAdd" />
				</div>
			</form>
			<div v-else>
				<div class="grid items-start grid-cols-2 gap-6">
					<InformationItem :icon="Building3" label="Bank name" value="Techcombank" />
					<InformationItem :icon="Card" label="Account number" value="889921246126" />
					<InformationItem
						:icon="UserId"
						label="Account holder name"
						value="Lê Minh Tâm" />
					<InformationItem
						:icon="HomeAdd"
						label="Bank branch"
						value="Chi nhánh Điện Biên Phủ" />
				</div>
			</div>
		</ScrollArea>
		<div class="flex justify-end gap-3">
			<Button
				v-if="!isEdit"
				class="bg-blue-50 text-blue-500 hover:bg-blue-50 h-auto py-3 rounded-2xl px-6"
				@click="handleEdit">
				<IconFromSvg :icon="Pen2" />Edit
			</Button>
			<Button
				v-if="isEdit"
				variant="outline"
				class="h-auto py-3 px-6 rounded-2xl"
				@click="handleCancel">
				Cancel
			</Button>
			<Button
				form="form"
				v-if="isEdit"
				class="h-auto py-3 px-6 hover:bg-blue-600 rounded-2xl">
				Save
			</Button>
		</div>
	</div>
</template>
