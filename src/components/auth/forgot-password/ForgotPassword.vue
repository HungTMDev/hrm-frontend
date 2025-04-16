<script lang="ts" setup>
import CallApiButton from '@/components/common/CallApiButton.vue';
import Description from '@/components/common/Description.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import Button from '@/components/ui/button/Button.vue';
import Label from '@/components/ui/label/Label.vue';
import router from '@/routers';
import Letter from '@/assets/icons/Outline/Letter.svg';
import Left from '@/assets/icons/Outline/Alt Arrow Left.svg';
import IconFromSvg from '@/components/common/IconFromSvg.vue';

const navigateBack = () => {
	router.back();
};

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
		<div class="w-full flex flex-col gap-2">
			<Label>Email</Label>
			<InputWithIcon
				class="rounded-2xl p-3 w-full"
				:icon="Letter"
				placeholder="Enter your email address" />
		</div>
		<CallApiButton
			@click="navigateEnterOTP"
			class="w-full rounded-xl bg-blue-500 hover:bg-blue-600 h-auto p-3">
			Send OTP
		</CallApiButton>
	</div>
</template>
