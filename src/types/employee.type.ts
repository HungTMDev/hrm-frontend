export interface Employee {
	id: number;
	name: string;
	email: string;
	position: string;
	department: string;
	status: string;
}

export interface EmployeePayroll {
	name: string;
	role: string;
	salary: number;
	deduction: number;
	status: string;
}

export interface AttendanceManagement {
	name: string;
	email: string;
	attendance: string;
	date: string;
	time: string;
	status: string;
}

export interface LeaveManagement {
	name: string;
	leaveType: string;
	startDate: string;
	endDate: string;
	totalDays: number;
	leaveReason: string;
	status: string;
}

export interface OvertimeManagement {
	name: string;
	email: string;
	startTime: string;
	endTime: string;
	date: string;
	status: string;
}
