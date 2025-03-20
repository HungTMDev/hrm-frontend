<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import Title from '@/components/common/Title.vue';
import EmployeePayroll from '@/components/payroll/employee-payroll/EmployeePayroll.vue';
import SalaryDefinition from '@/components/payroll/salary-definition/SalaryDefinition.vue';
import SalaryDepartmentChart from '@/components/payroll/salary-department/SalaryDepartmentChart.vue';
import SalaryReview from '@/components/payroll/salary-review/SalaryReview.vue';
import Button from '@/components/ui/button/Button.vue';
</script>
<template>
	<div class="grid grid-cols-3 grid-rows-5 gap-4">
		<ContentWrapper class="col-span-2 row-span-2">
			<div class="flex justify-between items-center">
				<Title>Salary by Department</Title>
				<Button variant="link" class="text-blue-500">More insights</Button>
			</div>
			<div>
				<SalaryDepartmentChart />
			</div>
		</ContentWrapper>
		<ContentWrapper class="row-span-3"><SalaryDefinition /></ContentWrapper>
		<ContentWrapper class="col-span-2 row-span-3"><EmployeePayroll /></ContentWrapper>
		<ContentWrapper><SalaryReview /></ContentWrapper>
	</div>
</template>
