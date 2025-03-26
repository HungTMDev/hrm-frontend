<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import ApprovalOverview from '@/components/dashboard/approval-overview/ApprovalOverview.vue';
import AttendanceOverview from '@/components/dashboard/attendance-overview/AttendanceOverview.vue';
import CalendarOnlyWeek from '@/components/dashboard/CalendarOnlyWeek.vue';
import NotificationOverview from '@/components/dashboard/NotificationOverview.vue';
import Overview from '@/components/dashboard/Overview.vue';
import { onMounted, ref } from 'vue';
import UserGroup from '@/assets/icons/Outline/Users Group Two Rounded.svg';
import UserCheck from '@/assets/icons/Outline/User Check.svg';
import Case from '@/assets/icons/Outline/Case.svg';
import CalendarSearch from '@/assets/icons/Outline/Calendar Search.svg';

const isLoading = ref(true);

onMounted(() => {
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);
});
</script>
<template>
	<div class="grid gap-4 grid-cols-3 grid-rows-6">
		<ContentWrapper>
			<Overview
				title="Total Employee"
				:quantity="120"
				:percentage="12"
				updated_date="March 4, 2025"
				:icon="UserGroup" />
		</ContentWrapper>
		<ContentWrapper>
			<Overview
				title="New Employee"
				:quantity="120"
				:percentage="-12"
				updated_date="March 4, 2025"
				:icon="UserCheck" />
		</ContentWrapper>

		<ContentWrapper> <CalendarOnlyWeek /> </ContentWrapper>

		<ContentWrapper>
			<Overview
				title="Total Applicant"
				:quantity="120"
				:percentage="12"
				updated_date="March 4, 2025"
				:icon="Case" />
		</ContentWrapper>
		<ContentWrapper>
			<Overview
				title="Total Attendance"
				:quantity="120"
				:percentage="12"
				updated_date="March 4, 2025"
				:icon="CalendarSearch" />
		</ContentWrapper>

		<ContentWrapper class="row-span-3"><AttendanceOverview /> </ContentWrapper>
		<ContentWrapper class="col-span-2 row-span-4">
			<ApprovalOverview :is-loading="isLoading" />
		</ContentWrapper>
		<ContentWrapper class="row-span-2">
			<NotificationOverview :is-loading="isLoading" />
		</ContentWrapper>
	</div>
</template>
