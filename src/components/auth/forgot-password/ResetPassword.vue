<script lang="ts" setup>
import Description from '@/components/common/Description.vue';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import Title from '@/components/common/Title.vue';
import Button from '@/components/ui/button/Button.vue';
import Label from '@/components/ui/label/Label.vue';
import router from '@/routers';
import { ChevronLeft, Lock } from 'lucide-vue-next';

const navigateBack = () => {
	router.back();
};

const navigateEnterOTP = () => {
	router.push('/auth');
};
</script>
<template>
	<div>
		<Button @click="navigateBack" variant="link" class="text-blue-500 items-center p-0">
			<ChevronLeft />
			Back
		</Button>
	</div>
	<div class="flex flex-col items-center gap-4 mt-4">
		<Title class="font-semibold">Reset your password</Title>
		<Description>
			Your new password must be different from previously used passwords
		</Description>

		<div class="w-full flex flex-col gap-2">
			<Label>Password</Label>
			<InputWithIcon
				type="password"
				class="rounded-2xl p-3 w-full"
				:icon="Lock"
				placeholder="Enter your email address" />
		</div>
		<div class="w-full flex flex-col gap-2">
			<Label>Confirm password</Label>
			<InputWithIcon
				type="password"
				class="rounded-2xl p-3 w-full"
				:icon="Lock"
				placeholder="Enter your email address" />
		</div>

		<Button
			@click="navigateEnterOTP"
			class="w-full rounded-xl bg-blue-500 hover:bg-blue-600 h-auto p-3">
			Reset password
		</Button>
	</div>
</template>
