interface RouteType {
	path: string;
	name: string;
	component?: any;
	redirect: any;
	children?: any;
}

export const webRoutes: RouteType[] = [
	{
		path: '/auth',
		name: 'Auth',
		redirect: '/auth/login',
		component: () => import('@/pages/auth/index.vue'),
		children: [
			{
				path: 'login',
				name: 'Login',
				component: () => import('@/components/auth/login/Login.vue'),
			},
			{
				path: 'forgot-password',
				name: 'Forgot Password',
				children: [
					{
						path: '',
						name: 'Enter email',
						component: () =>
							import('@/components/auth/forgot-password/ForgotPassword.vue'),
					},
					{
						path: 'enter-otp',
						name: 'Enter otp',
						component: () => import('@/components/auth/forgot-password/EnterOTP.vue'),
					},
					{
						path: 'reset-password',
						name: 'Reset password',
						component: () =>
							import('@/components/auth/forgot-password/ResetPassword.vue'),
					},
				],
			},
		],
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/dashboard',
		component: () => import('@/layouts/MainLayout.vue'),
		children: [
			{
				path: '/dashboard',
				name: 'Dashboard',
				component: () => import('@/pages/dashboard/index.vue'),
			},
			{
				path: '/recruitments',
				name: 'Recruitments',
				children: [
					{
						path: '',
						name: 'Recruitments Overview',
						component: () => import('@/pages/recruitments/index.vue'),
					},
					{
						path: 'requests',
						name: 'Recruitment requests',
						component: () =>
							import('@/pages/recruitments/recruitment-requests/index.vue'),
					},
					{
						path: 'jobs',
						name: 'Jobs',
						component: () => import('@/pages/recruitments/jobs/index.vue'),
					},
					{
						path: 'candidates',
						name: 'Candidates',
						component: () => import('@/pages/recruitments/candidates/index.vue'),
					},
				],
			},
			{
				path: '/employees',
				name: 'Employees',
				children: [
					{
						path: '',
						name: 'Overview',
						component: () => import('@/pages/employees/index.vue'),
					},
					{
						path: 'employee-overview',
						name: 'Employee Overview',
						component: () => import('@/pages/employees/employee-overview/index.vue'),
					},
					{
						path: 'all-employee',
						name: 'All Employee',
						component: () => import('@/pages/employees/all-employee/index.vue'),
					},
					{
						path: 'work-hours-management',
						name: 'Work hours management',
						children: [
							{
								path: '',
								name: 'Work hours overview',
								component: () =>
									import('@/pages/employees/work-hours-management/index.vue'),
							},
							{
								path: 'attendance-management',
								name: 'Attendance management',
								component: () =>
									import(
										'@/pages/employees/work-hours-management/attendance-management/index.vue'
									),
							},
							{
								path: 'leave-management',
								name: 'Leave management',
								component: () =>
									import(
										'@/pages/employees/work-hours-management/leave-management/index.vue'
									),
							},
							{
								path: 'overtime-management',
								name: 'Overtime management',
								component: () =>
									import(
										'@/pages/employees/work-hours-management/overtime-management/index.vue'
									),
							},
						],
					},
				],
			},
			{
				path: '/payroll',
				name: 'Payroll',
				children: [
					{
						path: '',
						name: 'Payroll overview',
						component: () => import('@/pages/payroll/index.vue'),
					},
					{
						path: 'employee-payroll',
						name: 'Employee payroll',
						component: () => import('@/pages/payroll/employee-payroll/index.vue'),
					},
				],
			},
			{
				path: '/training',
				name: 'Training',
				component: () => import('@/pages/training/index.vue'),
			},
			{
				path: '/documents',
				name: 'Documents',
				component: () => import('@/pages/documents/index.vue'),
			},
			{
				path: '/meeting-schedule',
				name: 'Meeting Schedule',
				component: () => import('@/pages/meeting-schedule/index.vue'),
			},
		],
	},
];
