interface RouteType {
	path: string;
	name: string;
	component?: any;
	redirect: any;
	children?: any;
	meta?: any;
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
						meta: {
							requiresForgotPassword: true,
						},
						component: () => import('@/components/auth/forgot-password/EnterOTP.vue'),
					},
					{
						path: 'reset-password',
						name: 'Reset password',
						meta: {
							requiresForgotPassword: true,
						},
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
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: '/dashboard',
				name: 'Dashboard',
				component: () => import('@/pages/dashboard/index.vue'),
			},
			{
				path: '/recruitments',
				name: 'Recruitments',
				redirect: '/recruitments/overview',
				children: [
					// {
					// 	path: 'overview',
					// 	name: 'Recruitments Overview',
					// 	component: () => import('@/pages/recruitments/index.vue'),
					// },
					{
						path: '',
						name: 'Recruitments Overview',
						redirect: '/recruitments/requests',
					},
					{
						path: 'requests',
						name: 'Recruitment Requests',
						component: () =>
							import('@/pages/recruitments/recruitment-requests/index.vue'),
					},
					{
						path: 'jobs',
						name: 'Jobs',
						component: () => import('@/pages/recruitments/jobs/index.vue'),
					},
					{
						path: 'applicants',
						name: 'Applicants',
						component: () => import('@/pages/recruitments/applicants/index.vue'),
					},
					{
						path: 'talent-pool',
						name: 'Talent Pool',
						component: () => import('@/pages/recruitments/talent-pool/index.vue'),
					},
				],
			},
			{
				path: '/employees',
				name: 'Employees',
				redirect: '/employees/overview',
				children: [
					// {
					// 	path: 'overview',
					// 	name: 'Overview',
					// 	component: () => import('@/pages/employees/index.vue'),
					// },
					{
						path: '',
						name: 'Overview',
						redirect: '/employees/employee-overview',
					},
					{
						path: 'employee-overview',
						name: 'Employee Overview',
						component: () => import('@/pages/employees/employee-overview/index.vue'),
					},
					{
						path: 'all-employee',
						name: 'All Employee',
						children: [
							{
								path: '',
								name: 'List Employee',
								component: () => import('@/pages/employees/all-employee/index.vue'),
							},
							{
								path: ':id',
								name: 'Employee Detail',
								component: () =>
									import(
										'@/pages/employees/all-employee/employee-detail/index.vue'
									),
							},
						],
					},
					{
						path: 'work-hours-management',
						name: 'Work Hours Management',
						children: [
							{
								path: '',
								name: 'Work hours overview',
								component: () =>
									import('@/pages/employees/work-hours-management/index.vue'),
							},
							{
								path: 'attendance-management',
								name: 'Attendance Management',
								component: () =>
									import(
										'@/pages/employees/work-hours-management/attendance-management/index.vue'
									),
							},
							{
								path: 'leave-management',
								name: 'Leave Management',
								component: () =>
									import(
										'@/pages/employees/work-hours-management/leave-management/index.vue'
									),
							},
							{
								path: 'overtime-management',
								name: 'Overtime Management',
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
						name: 'Payroll Overview',
						component: () => import('@/pages/payroll/index.vue'),
					},
					{
						path: 'employee-payroll',
						name: 'Employee payroll',
						children: [
							{
								path: '',
								name: 'List Employee Payroll',
								component: () =>
									import('@/pages/payroll/employee-payroll/index.vue'),
							},
							{
								path: 'payroll-file-management',
								name: 'Payroll File Management',
								component: () =>
									import(
										'@/pages/payroll/employee-payroll/payroll-file-management/index.vue'
									),
							},
						],
					},
					{
						path: 'payroll-management',
						name: 'Payroll Management',
						children: [
							{
								path: '',
								name: 'Payroll Management Overview',
								component: () =>
									import('@/pages/payroll/payroll-management/index.vue'),
							},
							{
								path: 'salary-definition',
								name: 'Salary Definition',
								component: () =>
									import(
										'@/pages/payroll/payroll-management/salary-definition/index.vue'
									),
							},
						],
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
