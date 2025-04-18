<script lang="ts" setup>
import Left from '@/assets/icons/Outline/Alt Arrow Left.svg';
import Lock from '@/assets/icons/Outline/Lock.svg';
import Description from '@/components/common/Description.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Title from '@/components/common/Title.vue';
import FormInput from '@/components/form/FormInput.vue';
import Button from '@/components/ui/button/Button.vue';
import { ZUtils } from '@/lib/validation.utils';
import router from '@/routers';
import { useAuthStore } from '@/stores/auth.store';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';

const authStore = useAuthStore();

const navigateBack = () => {
	router.back();
};

const formSchema = toTypedSchema(
	z
		.object({
			password: ZUtils.password(),
			confirm_password: ZUtils.password(),
		})
		.refine((data) => data.password === data.confirm_password, {
			message: 'Confirm password does not match',
			path: ['confirm_password'],
		}),
);

const { handleSubmit } = useForm({ validationSchema: formSchema });

const onSubmit = handleSubmit(async (values) => {
	const status = await authStore.resetPassword(values.password, values.confirm_password);
	if (status === 204) navigateEnterOTP();
});

const navigateEnterOTP = () => {
	authStore.forgot_password_token = undefined;
	router.push('/auth');
};
</script>
<template>
	<div>
		<Button @click="navigateBack" variant="ghost" class="text-slate-600 items-center p-2">
			<IconFromSvg :icon="Left" />
		</Button>
	</div>
	<form class="flex flex-col items-center gap-4 mt-4" @submit="onSubmit">
		<Title class="font-semibold">Reset your password</Title>
		<Description>
			Your new password must be different from previously used passwords
		</Description>

		<div class="w-full">
			<FormInput
				type="password"
				label="Password"
				name="password"
				:icon="Lock"
				:required="true"
				placeholder="Enter your password"
				class="w-full" />
		</div>

		<div class="w-full">
			<FormInput
				type="password"
				label="Confirm password"
				name="confirm_password"
				:icon="Lock"
				:required="true"
				placeholder="Enter your confirm password"
				class="w-full" />
		</div>

		<Button class="w-full rounded-xl bg-blue-500 hover:bg-blue-600 h-auto p-3">
			Reset password
		</Button>
	</form>
</template>
