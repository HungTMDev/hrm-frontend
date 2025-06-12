<script lang="ts" setup>
import Case from '@/assets/icons/Outline/Case.svg';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import StatusTag from '@/components/common/StatusTag.vue';
import Title from '@/components/common/Title.vue';
import CandidatesOverview from '@/components/recruitments/applicants/CandidatesOverview.vue';
import RecruitmentRequestOverview from '@/components/recruitments/recruitment-request/RecruitmentRequestOverview.vue';
import Button from '@/components/ui/button/Button.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { JOB_STATUS_STYLE } from '@/constants';
import router from '@/routers';

const handleNavigateToJobs = () => {
	router.push('/recruitments/jobs');
};
</script>
<template>
	<div class="grid grid-cols-3 grid-rows-2 gap-4">
		<ContentWrapper class="col-span-2"> <RecruitmentRequestOverview /></ContentWrapper>
		<ContentWrapper>
			<div class="flex justify-between items-center">
				<Title>Jobs</Title>
				<Button variant="link" class="text-blue-500" @click="handleNavigateToJobs">
					View all
				</Button>
			</div>
			<Separator class="my-2" />
			<div class="flex flex-col gap-4">
				<div v-for="item in 5" :key="item" class="flex items-center gap-4">
					<div class="w-10 h-10 rounded-full bg-blue-50 text-blue-500 grid place-items-center">
						<IconFromSvg :icon="Case" />
					</div>
					<div class="w-3/4 flex flex-col">
						<h4>UI/UX Design</h4>
						<p class="truncate text-sm text-gray-400">Description!</p>
					</div>
					<StatusTag status="Close" :class="JOB_STATUS_STYLE['CLOSED']" />
				</div>
			</div>
		</ContentWrapper>
		<ContentWrapper class="col-span-2"><CandidatesOverview /></ContentWrapper>
		<ContentWrapper></ContentWrapper>
	</div>
</template>
