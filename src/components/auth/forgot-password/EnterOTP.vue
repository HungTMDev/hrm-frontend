<script lang="ts" setup>
import Description from '@/components/common/Description.vue';
import Title from '@/components/common/Title.vue';
import Button from '@/components/ui/button/Button.vue';
import router from '@/routers';
import { ChevronLeft } from 'lucide-vue-next';
import PinInput from './PinInput.vue';
import { onUnmounted, ref } from 'vue';

const otp = ref('');
const countdown = ref(0);
const isDisabled = ref(false);
let intervalId: any = null;

const startCountdown = () => {
	countdown.value = 30;
	isDisabled.value = true;

	intervalId = setInterval(() => {
		countdown.value--;

		if (countdown.value <= 0) {
			clearInterval(intervalId);
			intervalId = null;
			isDisabled.value = false;
		}
	}, 1000);
};

const resendOTP = () => {
	console.log('Resend OTP...');
	startCountdown();
};

onUnmounted(() => {
	if (intervalId) {
		clearInterval(intervalId);
	}
});

const handleOTP = (value: string) => {
	otp.value = value;
};

const navigateBack = () => {
	router.back();
};

const navigateResetPasword = () => {
	router.push('reset-password');
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
		<Title class="font-semibold">Enter OTP</Title>
		<Description>
			We have send a code to your registered email address songquynh@lutech.ltd
		</Description>
		<div>
			<PinInput @update:data="handleOTP" />
		</div>
		<Button
			:disabled="otp.length < 6"
			class="w-full rounded-xl bg-blue-500 hover:bg-blue-600 h-auto p-3"
			@click="navigateResetPasword">
			Verify
		</Button>
		<div class="flex items-center gap-2">
			<p class="text-sm">Didn't get the code.</p>
			<Button
				@click="resendOTP"
				class="p-0 text-blue-500 gap-1"
				variant="link"
				:disabled="isDisabled">
				Resend<span v-if="countdown > 0" class="text-sm">({{ countdown }})</span>
			</Button>
		</div>
	</div>
</template>
