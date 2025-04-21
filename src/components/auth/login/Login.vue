<script lang="ts" setup>
import Description from '@/components/common/Description.vue';
import Title from '@/components/common/Title.vue';
import FormInput from '@/components/form/FormInput.vue';
import Button from '@/components/ui/button/Button.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import Label from '@/components/ui/label/Label.vue';
import router from '@/routers';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { loginSchema } from './LoginSchema';
import { ref } from 'vue';
import CallApiButton from '@/components/common/CallApiButton.vue';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Lock from '@/assets/icons/Outline/Lock.svg';

const navigateForgotPassword = () => {
	router.push('/auth/forgot-password');
};

const isLoading = ref(false);

const formSchema = toTypedSchema(loginSchema);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
	isLoading.value = true;
	setTimeout(() => {
		isLoading.value = false;
		router.push('/');
	}, 500);
});
</script>
<template>
	<div class="flex flex-col items-center gap-4">
		<Title class="text-2xl">Welcome to Lutech!</Title>
		<Description class="self-start text-sm">Login with your email and password.</Description>

		<form @submit="onSubmit" class="w-full">
			<FormInput
				name="email"
				label="Email"
				class="w-full"
				:icon="Letter"
				:required="true"
				placeholder="Enter your email address" />
			<FormInput
				type="password"
				name="password"
				label="Password"
				class="w-full"
				:icon="Lock"
				:required="true"
				placeholder="Enter your password" />

			<div class="self-start w-full flex justify-between px-2">
				<div class="flex items-center space-x-2 text-gray-400">
					<Checkbox
						id="remember"
						class="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 border-gray-400" />
					<Label
						for="remember"
						class="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Remember me
					</Label>
				</div>
				<Button
					type="button"
					@click="navigateForgotPassword"
					class="text-blue-500 p-0 text-sm"
					variant="link">
					Forgot password?
				</Button>
			</div>

			<CallApiButton
				class="w-full rounded-xl bg-blue-500 hover:bg-blue-600 h-auto p-3"
				:is-loading="isLoading">
				Login
			</CallApiButton>
		</form>

		<div class="flex items-center gap-1 text-sm">
			<p>Don't have an account.</p>
			<Button variant="link" class="text-blue-500 p-0">Sign up</Button>
		</div>
	</div>
</template>
