import { RECRUITMENT_REQUEST_API } from '@/constants/api/recruitment/recruitment-request.api';
import axiosClient from '@/plugins';
import type {
	Applicant,
	IApiResponseV1,
	IFilterRequest,
	IRecruitmentRequest,
	IRecruitmentRequestFilter,
	TalentPool,
} from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRecruitmentStore = defineStore('recruitment-store', () => {
	//define State
	const isLoading = ref(false);
	const talentPools = ref<TalentPool[]>([]);
	const applicantAppliedStage = ref<Applicant[]>([]);
	const applicantProcessStage = ref<Applicant[]>([]);
	const applicantWaitingStage = ref<Applicant[]>([]);
	const applicantDoneStage = ref<Applicant[]>([]);

	//define Action
	const getAllRecruitmentRequest = async (
		filter?: Partial<IFilterRequest<IRecruitmentRequestFilter>>,
	) => {
		const { data, status } = await axiosClient.get<IApiResponseV1<IRecruitmentRequest[]>>(
			RECRUITMENT_REQUEST_API.BASE,
			{
				params: {
					page: filter?.page,
					limit: filter?.limit,
					...filter?.filter,
				},
			},
		);
		if (status >= 400) {
			return;
		}
		return data;
	};

	const getAllTalentPool = () => {
		talentPools.value = [
			{
				name: 'Phạm Thị Hương',
				email: 'huongpham@outlook.com',
				phone: '0267054938',
				job: 'Data Analyst',
				level: 'Mid-Level',
				last_modified: 'January 12, 2025',
			},
			{
				name: 'Lê Văn Hoàng',
				email: 'hoangle@gmail.com',
				phone: '0256945782',
				job: 'Backend Developer',
				level: 'Fresher',
				last_modified: 'February 20, 2025',
			},
			{
				name: 'Nguyễn Văn An',
				email: 'annguyen@gmail.com',
				phone: '0234729671',
				job: 'Mobile App Marketer',
				level: 'Mid-Level',
				last_modified: 'March 1, 2025',
			},
			{
				name: 'Ngô Minh Tuấn',
				email: 'minhtuan@icloud.com',
				phone: '0278162049',
				job: 'Product Manager',
				level: 'Junior',
				last_modified: 'March 30, 2025',
			},
			{
				name: 'Trần Thị Bích',
				email: 'bichtran@yahoo.com',
				phone: '0245837623',
				job: 'UX Designer',
				level: 'Intern',
				last_modified: 'April 15, 2025',
			},
			{
				name: 'Đỗ Thị Mai',
				email: 'maido@gmail.com',
				phone: '0289273158',
				job: 'Graphic Designer',
				level: 'Senior',
				last_modified: 'May 5, 2025',
			},
			{
				name: 'Trương Văn Tùng',
				email: 'tung.truong@gmail.com',
				phone: '0290384267',
				job: 'Frontend Developer',
				level: 'Junior',
				last_modified: 'June 18, 2025',
			},
			{
				name: 'Lê Thị Nhung',
				email: 'nhungle@gmail.com',
				phone: '0301497381',
				job: 'Content Writer',
				level: 'Fresher',
				last_modified: 'July 22, 2025',
			},
			{
				name: 'Nguyễn Quốc Duy',
				email: 'quocduy@yahoo.com',
				phone: '0312508492',
				job: 'SEO Specialist',
				level: 'Intern',
				last_modified: 'August 1, 2025',
			},
			{
				name: 'Vũ Văn Kiến',
				email: 'kienvu@outlook.com',
				phone: '0323619503',
				job: 'DevOps Engineer',
				level: 'Senior',
				last_modified: 'September 9, 2025',
			},
			{
				name: 'Phan Thị Ly',
				email: 'lyphan@gmail.com',
				phone: '0334720614',
				job: 'Social Media Manager',
				level: 'Mid-Level',
				last_modified: 'October 12, 2025',
			},
		];
	};

	const getAppliedStageData = () => {
		applicantAppliedStage.value = [
			{
				name: 'Ngô Minh Tuấn',
				email: 'minhtuan@icloud.com',
				phone: '0278162049',
				job: 'Product Manager',
				cv: '',
				stage: 'Applied',
				status: 'Applied',
			},
			{
				name: 'Trần Thị Bích',
				email: 'bichtran8@yahoo.com',
				phone: '0245837623',
				job: 'UX Designer',
				cv: '',
				stage: 'Applied',
				status: 'Applied',
			},
		];
	};

	const getWaitingStageData = () => {
		applicantWaitingStage.value = [
			{
				name: 'Ngô Minh Tuấn',
				email: 'minhtuan@icloud.com',
				phone: '0278162049',
				job: 'Product Manager',
				cv: '',
				stage: 'Waiting',
				status: 'Passed',
			},
			{
				name: 'Trần Thị Bích',
				email: 'bichtran4@yahoo.com',
				phone: '0245837623',
				job: 'UX Designer',
				cv: '',
				stage: 'Waiting',
				status: 'Failed',
			},
			{
				name: 'Trần Thị Bích',
				email: 'bichtran5@yahoo.com',
				phone: '0245837623',
				job: 'UX Designer',
				cv: '',
				stage: 'Waiting',
				status: 'Sent',
			},
			{
				name: 'Trần Thị Bích',
				email: 'bichtran6@yahoo.com',
				phone: '0245837623',
				job: 'UX Designer',
				cv: '',
				stage: 'Waiting',
				status: 'Accepted',
			},
			{
				name: 'Trần Thị Bích',
				email: 'bichtran7@yahoo.com',
				phone: '0245837623',
				job: 'UX Designer',
				cv: '',
				stage: 'Waiting',
				status: 'Rejected',
			},
		];
	};

	const getDoneStageData = () => {
		applicantDoneStage.value = [
			{
				name: 'Ngô Minh Tuấn',
				email: 'minhtuan@icloud.com',
				phone: '0278162049',
				job: 'Product Manager',
				cv: '',
				stage: 'Done',
				status: 'Hired',
			},
			{
				name: 'Trần Thị Bích',
				email: 'bichtran@yahoo.com',
				phone: '0245837623',
				job: 'UX Designer',
				cv: '',
				stage: 'Done',
				status: 'Hired',
			},
			{
				name: 'Trần Thị Bích',
				email: 'bichtran1@yahoo.com',
				phone: '0245837623',
				job: 'UX Designer',
				cv: '',
				stage: 'Done',
				status: 'Hired',
			},
			{
				name: 'Trần Thị Bích',
				email: 'bichtran2@yahoo.com',
				phone: '0245837623',
				job: 'UX Designer',
				cv: '',
				stage: 'Done',
				status: 'Rejected',
			},
			{
				name: 'Trần Thị Bích',
				email: 'bichtran3@yahoo.com',
				phone: '0245837623',
				job: 'UX Designer',
				cv: '',
				stage: 'Done',
				status: 'Rejected',
			},
		];
	};

	return {
		isLoading,
		talentPools,
		applicantAppliedStage,
		applicantProcessStage,
		applicantWaitingStage,
		applicantDoneStage,
		getAllTalentPool,
		getAppliedStageData,
		getWaitingStageData,
		getDoneStageData,
		getAllRecruitmentRequest,
	};
});
