import type { EmployeePayroll, PayrollFileManagement, SalaryDefinition } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePayrollStore = defineStore('payroll-store', () => {
	// define State
	const employeePayrolls = ref<EmployeePayroll[]>([]);
	const payrollFiles = ref<PayrollFileManagement[]>([]);
	const salaryDefinitions = ref<SalaryDefinition[]>([]);
	const isUploading = ref(false);

	// define Action
	const getAllEmployeePayroll = () => {
		employeePayrolls.value = [
			{
				name: 'Trần Song Quỳnh',
				role: 'UI/UX Designer',
				department: 'Design',
				level: 'Senior',
				salary: 25000000,
				deduction: 0,
				status: 'Processed',
			},
			{
				name: 'Nguyễn Đức Phát',
				role: 'UI/UX Designer',
				department: 'Design',
				level: 'Junior',
				salary: 25000000,
				deduction: 0,
				status: 'Pending',
			},
			{
				name: 'Trịnh Minh Hưng',
				role: 'Back-end Developer',
				department: 'Developement',
				level: 'Fresher',
				salary: 25000000,
				deduction: 0,
				status: 'Processed',
			},
			{
				name: 'Ngô Công Linh',
				role: 'Android Developer',
				department: 'Development',
				level: 'Intern',
				salary: 25000000,
				deduction: 0,
				status: 'Pending',
			},
			{
				name: 'Huỳnh Minh Huy',
				role: 'Graphic Designer',
				department: 'Design',
				level: 'Junior',
				salary: 25000000,
				deduction: 0,
				status: 'Pending',
			},
			{
				name: 'Lê Tất Tuấn',
				role: 'Back-end Developer',
				department: 'Development',
				level: 'Intern',
				salary: 25000000,
				deduction: 0,
				status: 'Processed',
			},
			{
				name: 'Nguyễn Thanh Long',
				role: 'Product Owner',
				department: 'Product',
				level: 'Mid-Level',
				salary: 25000000,
				deduction: 0,
				status: 'Processed',
			},
			{
				name: 'Lê Quang Phúc',
				role: 'Graphic Designer',
				department: 'Design',
				level: 'Intern',
				salary: 25000000,
				deduction: 0,
				status: 'Pending',
			},
			{
				name: 'Bùi Thị Hương',
				role: 'Marketing Specialist',
				department: 'Marketing',
				level: 'Mid-Level',
				salary: 25000000,
				deduction: 0,
				status: 'Processed',
			},
			{
				name: 'Trương Văn Phúc',
				role: 'Sales Executive',
				department: 'Sales',
				level: 'Intern',
				salary: 25000000,
				deduction: 0,
				status: 'Processed',
			},
			{
				name: 'Nguyễn Thị Cẩm',
				role: 'Content Writer',
				department: 'Content',
				level: 'Senior',
				salary: 25000000,
				deduction: 0,
				status: 'Processed',
			},
		];
	};

	const getAllPayrollFile = () => {
		payrollFiles.value = [
			{
				fileName: 'payroll_transongquynh_351616',
				payrollOf: 'Trần Song Quỳnh',
				status: 'Confirmed',
				createBy: 'Lê Thị Linh Ly',
				uploadDate: 'May 04, 2025',
				payrollPeroid: 'April 2025',
			},
			{
				fileName: 'payroll_nguyenanh_351617',
				payrollOf: 'Nguyễn An Huy',
				status: 'Sent',
				createBy: 'Lê Thị Linh Ly',
				uploadDate: 'May 04, 2025',
				payrollPeroid: 'April 2025',
			},
			{
				fileName: 'payroll_lehieu_351617',
				payrollOf: 'Lê Hiếu Hòa',
				status: 'Needs Editing',
				createBy: 'Lê Thị Linh Ly',
				uploadDate: 'May 04, 2025',
				payrollPeroid: 'April 2025',
			},
			{
				fileName: 'payroll_voquangsang_351618',
				payrollOf: 'Võ Quang Sáng',
				status: 'Needs Editing',
				createBy: 'Lê Thị Linh Ly',
				uploadDate: 'May 04, 2025',
				payrollPeroid: 'April 2025',
			},
			{
				fileName: 'payroll_bohanh_351619',
				payrollOf: 'Bỗ Hạnh Nhi',
				status: 'Waiting to Send',
				createBy: 'Lê Thị Linh Ly',
				uploadDate: 'May 04, 2025',
				payrollPeroid: 'April 2025',
			},
			{
				fileName: 'payroll_doanlam_351620',
				payrollOf: 'Đoàn Lâm An',
				status: 'Waiting to Send',
				createBy: 'Lê Thị Linh Ly',
				uploadDate: 'May 04, 2025',
				payrollPeroid: 'April 2025',
			},
			{
				fileName: 'payroll_hoangphuchai_351621',
				payrollOf: 'Hoàng Phúc Hải',
				status: 'Needs Editing',
				createBy: 'Lê Thị Linh Ly',
				uploadDate: 'May 04, 2025',
				payrollPeroid: 'April 2025',
			},
			{
				fileName: 'payroll_ngocduong_351622',
				payrollOf: 'Ngọc Dương Minh',
				status: 'Confirmed',
				createBy: 'Lê Thị Linh Ly',
				uploadDate: 'May 04, 2025',
				payrollPeroid: 'April 2025',
			},
			{
				fileName: 'payroll_trangthao_351623',
				payrollOf: 'Trần Thảo Nguyên',
				status: 'Confirmed',
				createBy: 'Lê Thị Linh Ly',
				uploadDate: 'May 04, 2025',
				payrollPeroid: 'April 2025',
			},
			{
				fileName: 'payroll_phucnhat_351624',
				payrollOf: 'Phúc Nhật Thắng',
				status: 'Sent',
				createBy: 'Lê Thị Linh Ly',
				uploadDate: 'May 04, 2025',
				payrollPeroid: 'April 2025',
			},
			{
				fileName: 'payroll_linhchi_351626',
				payrollOf: 'Linh Chi Hà',
				status: 'Sent',
				createBy: 'Lê Thị Linh Ly',
				uploadDate: 'May 04, 2025',
				payrollPeroid: 'April 2025',
			},
		];
	};

	const getAllSalaryDefinition = () => {
		salaryDefinitions.value = [
			{
				jobTitle: 'UX/UI Designer',
				level: 'Mid-Level',
				averageSalary: 18000000,
				department: 'Design',
				lastUpdate: '2025-05-02',
				quarter: 'Q2 2025',
				createdBy: 'Lê Thị Linh Ly',
			},
			{
				jobTitle: 'iOS Developer',
				level: 'Junior',
				averageSalary: 15000000,
				department: 'Development',
				lastUpdate: '2025-05-03',
				quarter: 'Q2 2025',
				createdBy: 'Lê Thị Linh Ly',
			},
			{
				jobTitle: 'Data Scientist',
				level: 'Senior',
				averageSalary: 30000000,
				department: 'Data',
				lastUpdate: '2025-05-03',
				quarter: 'Q2 2025',
				createdBy: 'Lê Thị Linh Ly',
			},
			{
				jobTitle: 'Android Developer',
				level: 'Junior',
				averageSalary: 15000000,
				department: 'Development',
				lastUpdate: '2025-05-04',
				quarter: 'Q2 2025',
				createdBy: 'Lê Thị Linh Ly',
			},
		];
	};

	const uploadPayrollFile = async (files: File[]) => {
		isUploading.value = true;
		try {
			const res = await new Promise<{ fileName: string; error: boolean }[]>((resolve) => {
				setTimeout(() => {
					const mapped = files.map((file) => ({
						fileName: file.name,
						error: true,
					}));
					resolve(mapped);
				}, 2000);
			});

			return res;
		} finally {
			isUploading.value = false;
		}
	};

	return {
		employeePayrolls,
		payrollFiles,
		isUploading,
		salaryDefinitions,
		getAllEmployeePayroll,
		getAllPayrollFile,
		uploadPayrollFile,
		getAllSalaryDefinition,
	};
});
