import { PROVINCE_API } from '@/constants/api/provinces.api';
import { useCustomToast } from '@/lib/customToast';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useDefaultStore = defineStore('default-store', () => {
	const getAllProvinces = async () => {
		try {
			const response = await axios.get(PROVINCE_API.GET_PROVINCES);
			const list = response.data.data.data;
			return list.map((item: any) => {
				return {
					label: item.name,
					value: String(item.code),
				};
			});
		} catch (error) {
			const { showToast } = useCustomToast();
			showToast({
				message: 'Cannot get provinces!',
				type: 'error',
			});
		}
	};

	const getDistrictByProvince = async (provinceCode: string) => {
		try {
			const response = await axios.get(PROVINCE_API.GET_DISTRICTS_BY_PROVINCE, {
				params: {
					limit: -1,
					provinceCode,
				},
			});
			const list = response.data.data.data;
			return list.map((item: any) => {
				return {
					label: item.name,
					value: String(item.code),
				};
			});
		} catch (error) {
			const { showToast } = useCustomToast();
			showToast({
				message: 'Cannot get districts!',
				type: 'error',
			});
		}
	};

	const getWardByDistrict = async (districtCode: string) => {
		try {
			const response = await axios.get(PROVINCE_API.GET_WARDS_BY_DISTRICT, {
				params: {
					limit: -1,
					districtCode,
				},
			});
			const list = response.data.data.data;
			return list.map((item: any) => {
				return {
					label: item.name,
					value: String(item.code),
				};
			});
		} catch (error) {
			const { showToast } = useCustomToast();
			showToast({
				message: 'Cannot get ward!',
				type: 'error',
			});
		}
	};

	return {
		getAllProvinces,
		getDistrictByProvince,
		getWardByDistrict,
	};
});
