export interface LeaveRequest {
	id: number;
	name: string;
	leave_type: 'Full day' | 'Half day' | 'Hourly leave';
	leave_shift: 'Morning' | 'Afternoon' | '-' | null;
	start_day: string;
	end_day: string;
	total_days: number;
	status: 'APPROVED' | 'TO_DO' | 'REJECTED' | 'ON_HOLD' | 'DRAFT' | 'CANCELED' | 'CANCELING';
}
