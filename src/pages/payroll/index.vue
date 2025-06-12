<script lang="ts" setup>
import BarChart from '@/components/common/chart/BarChart.vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import Title from '@/components/common/Title.vue';
import EmployeePayrollOverview from '@/components/payroll/employee-payroll/EmployeePayrollOverview.vue';
import SalaryDefinitionOverview from '@/components/payroll/payroll-management/salary-definition/SalaryDefinitionOverview.vue';
import SalaryDepartmentChart from '@/components/payroll/salary-department/SalaryDepartmentChart.vue';
import SalaryReview from '@/components/payroll/salary-review/SalaryReview.vue';
import Button from '@/components/ui/button/Button.vue';
import router from '@/routers';

const handleNavigateToPayrollManagement = () => {
	router.push('/payroll/payroll-management');
};
</script>
<template>
	<div class="grid grid-cols-3 grid-rows-5 gap-4">
		<ContentWrapper class="col-span-2 row-span-2">
			<div class="flex justify-between items-center">
				<Title>Salary by Department</Title>
				<Button variant="link" class="text-blue-500" @click="handleNavigateToPayrollManagement"
					>More insights</Button
				>
			</div>
			<div>
				<SalaryDepartmentChart />
			</div>
		</ContentWrapper>
		<ContentWrapper class="row-span-2">
			<div class="flex justify-between items-center">
				<Title>Payroll History </Title>
				<Button variant="link" class="text-blue-500">View all</Button>
			</div>
			<div>
				<BarChart
					:chart-data="{
						labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'],
						datasets: [
							{
								label: 'Doanh thu (triệu VND)',
								data: [10, 20, 15, 25],
								backgroundColor: '#C7D2FE',
								hoverBackgroundColor: '#6366F1',
								barThickness: 12,
								borderSkipped: false,
								borderRadius: 10,
							},
						],
					}"
					:chart-options="{
						responsive: true,
					}" />
			</div>
		</ContentWrapper>
		<ContentWrapper class="col-span-2 row-span-3"><EmployeePayrollOverview /></ContentWrapper>
		<ContentWrapper class="row-span-2"><SalaryDefinitionOverview /></ContentWrapper>
		<ContentWrapper><SalaryReview /></ContentWrapper>
	</div>
</template>
