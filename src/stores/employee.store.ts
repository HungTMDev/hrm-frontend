import type { AttendanceManagement, LeaveManagement, OvertimeManagement } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEmployeeStore = defineStore('employee-store', () => {
	// define State
	const attendances = ref<AttendanceManagement[]>([]);
	const leaves = ref<LeaveManagement[]>([]);
	const overtimes = ref<OvertimeManagement[]>([]);

	// attendances management action (start)
	const getAllAttendances = () => {
		attendances.value = [
			{
				name: 'John Doe',
				email: 'oBk0q@example.com',
				attendance: 'Late Arrival',
				date: '2023-08-01',
				time: '10:00 AM',
				status: 'To-do',
			},
			{
				name: 'John Doe',
				email: 'oBk0q@example.com',
				attendance: 'Early Leave',
				date: '2023-08-01',
				time: '10:00 AM',
				status: 'Approved',
			},
			{
				name: 'John Doe',
				email: 'oBk0q@example.com',
				attendance: 'Late Arrival',
				date: '2023-08-01',
				time: '10:00 AM',
				status: 'Rejected',
			},
			{
				name: 'John Doe',
				email: 'oBk0q@example.com',
				attendance: 'Early Leave',
				date: '2023-08-01',
				time: '10:00 AM',
				status: 'Rejected',
			},
		];
	};
	// attendances management action (end)

	// leave management action (start)
	const getAllLeave = () => {
		leaves.value = [
			{
				name: 'Trần Song Quỳnh',
				leaveType: 'Annual Leave',
				startDate: '2025-03-14',
				endDate: '2025-03-15',
				totalDays: 1,
				leaveReason: '',
				status: 'Approved',
			},
			{
				name: 'Nguyễn Đức Phát',
				leaveType: 'Sick Leave',
				startDate: '2025-03-15',
				endDate: '2025-03-16',
				totalDays: 1,
				leaveReason: '',
				status: 'To-do',
			},
			{
				name: 'Trịnh Minh Hưng',
				leaveType: 'Unpaid Leave',
				startDate: '2025-03-17',
				endDate: '2025-03-20',
				totalDays: 3,
				leaveReason: '',
				status: 'Rejected',
			},
			{
				name: 'Ngô Công Linh',
				leaveType: 'Business Leave',
				startDate: '2025-03-21',
				endDate: '2025-03-23',
				totalDays: 2,
				leaveReason: '',
				status: 'To-do',
			},
			{
				name: 'Huỳnh Minh Huy',
				leaveType: 'Other',
				startDate: '2025-03-24',
				endDate: '2025-03-28',
				totalDays: 4,
				leaveReason: '',
				status: 'Approved',
			},
			{
				name: 'Lê Tất Tuấn',
				leaveType: 'Annual Leave',
				startDate: '2025-03-29',
				endDate: '2025-04-02',
				totalDays: 3,
				leaveReason: '',
				status: 'To-do',
			},
			{
				name: 'Nguyễn Thanh Long',
				leaveType: 'Annual Leave',
				startDate: '2025-04-03',
				endDate: '2025-04-05',
				totalDays: 2,
				leaveReason: '',
				status: 'Approved',
			},
			{
				name: 'Lê Quang Phúc',
				leaveType: 'Sick Leave',
				startDate: '2025-04-06',
				endDate: '2025-04-10',
				totalDays: 4,
				leaveReason: '',
				status: 'To-do',
			},
			{
				name: 'Bùi Thị Hương',
				leaveType: 'Maternity Leave',
				startDate: '2025-04-11',
				endDate: '2025-04-15',
				totalDays: 4,
				leaveReason: '',
				status: 'Rejected',
			},
			{
				name: 'Trương Văn Phúc',
				leaveType: 'Sick Leave',
				startDate: '2025-04-16',
				endDate: '2025-04-20',
				totalDays: 4,
				leaveReason: '',
				status: 'To-do',
			},
			{
				name: 'Nguyễn Thị Cẩm',
				leaveType: 'Holiday Leave',
				startDate: '2025-04-21',
				endDate: '2025-04-23',
				totalDays: 2,
				leaveReason: '',
				status: 'To-do',
			},
		];
	};
	// leave management action (end)

	// overtime management action (start)
	const getAllOvertime = () => {
		overtimes.value = [
			{
				name: 'Trần Song Quỳnh',
				email: 'songquynh@lutech.ltd',
				date: '2025-03-14',
				startTime: '05:45 PM',
				endTime: '09:00 PM',
				status: 'Approved',
			},
			{
				name: 'Nguyễn Đức Phát',
				email: 'ducphat@lutech.ltd',
				date: '2025-03-15',
				startTime: '05:45 PM',
				endTime: '09:00 PM',
				status: 'To-do',
			},
			{
				name: 'Trịnh Minh Hưng',
				email: 'minhhung@lutech.ltd',
				date: '2025-03-17',
				startTime: '05:45 PM',
				endTime: '08:30 PM',
				status: 'Rejected',
			},
			{
				name: 'Ngô Công Linh',
				email: 'conglinh@lutech.ltd',
				date: '2025-03-21',
				startTime: '08:00 AM',
				endTime: '05:00 PM',
				status: 'To-do',
			},
			{
				name: 'Huỳnh Minh Huy',
				email: 'minhhuy@lutech.ltd',
				date: '2025-03-24',
				startTime: '09:00 AM',
				endTime: '07:30 PM',
				status: 'Approved',
			},
			{
				name: 'Lê Tất Tuấn',
				email: 'tattuan@lutech.ltd',
				date: '2025-03-29',
				startTime: '08:15 AM',
				endTime: '04:45 PM',
				status: 'To-do',
			},
			{
				name: 'Nguyễn Thanh Long',
				email: 'thanhlong@lutech.ltd',
				date: '2025-04-03',
				startTime: '08:30 AM',
				endTime: '09:15 AM',
				status: 'Approved',
			},
			{
				name: 'Lê Quang Phúc',
				email: 'quangphuc@lutech.ltd',
				date: '2025-04-06',
				startTime: '05:00 PM',
				endTime: '07:00 PM',
				status: 'To-do',
			},
			{
				name: 'Bùi Thị Hương',
				email: 'thuong@lutech.ltd',
				date: '2025-04-11',
				startTime: '08:00 AM',
				endTime: '05:00 PM',
				status: 'Rejected',
			},
			{
				name: 'Trương Văn Phúc',
				email: 'vanphuc@lutech.ltd',
				date: '2025-04-16',
				startTime: '09:00 AM',
				endTime: '08:00 PM',
				status: 'To-do',
			},
			{
				name: 'Nguyễn Thị Cẩm',
				email: 'thicam@lutech.ltd',
				date: '2025-04-21',
				startTime: '05:45 PM',
				endTime: '09:00 PM',
				status: 'To-do',
			},
		];
	};
	// overtime management action (end)

	return {
		attendances,
		leaves,
		overtimes,
		getAllOvertime,
		getAllAttendances,
		getAllLeave,
	};
});
