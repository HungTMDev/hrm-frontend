<script lang="ts" setup>
import Left from '@/assets/icons/Outline/AltArrowLeft.svg';
import Letter from '@/assets/icons/Outline/Letter.svg';
import CallApiButton from '@/components/common/CallApiButton.vue';
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
	z.object({
		email: ZUtils.email(),
	}),
);

const { handleSubmit } = useForm({ validationSchema: formSchema });

const onSubmit = handleSubmit(async (values) => {
	const status = await authStore.forgotPassword(values.email);
	if (status === 200) navigateEnterOTP();
});

const navigateEnterOTP = () => {
	router.push('forgot-password/enter-otp');
};
</script>
<template>
	<div>
		<Button @click="navigateBack" variant="ghost" class="text-slate-600 items-center p-2">
			<IconFromSvg :icon="Left" />
		</Button>
	</div>
	<div class="flex flex-col items-center gap-4 mt-4">
		<Title class="font-semibold">Forgot Password</Title>
		<Description>
			Enter your registered email address. We’ll send you a code to reset your password.
		</Description>
		<form id="form" class="w-full flex flex-col gap-2" @submit="onSubmit">
			<FormInput
				name="email"
				label="Email"
				:icon="Letter"
				class="w-full"
				:required="true"
				placeholder="Enter your email address" />
		</form>
		<CallApiButton
			form="form"
			class="w-full rounded-xl bg-blue-500 hover:bg-blue-600 h-auto p-3">
			Send OTP
		</CallApiButton>
	</div>
</template>
