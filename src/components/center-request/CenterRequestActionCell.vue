<script lang="ts" setup>
import { useGetAccount } from '@/composables/auth/useAuth';
import { computed } from 'vue';
import ActionGroupCommon from '../common/ActionGroupCommon.vue';
import type { IActionGroupType } from '@/types';
import Eye from '@/assets/icons/Outline/Eye.svg';
import Pen2 from '@/assets/icons/Outline/Pen2.svg';
import Trash from '@/assets/icons/Outline/TrashBinMinimalistic.svg';
import CheckCircle from '@/assets/icons/Outline/CheckCircle.svg';
import Undo from '@/assets/icons/Outline/UndoLeftRound.svg';
import CloseCircle from '@/assets/icons/Outline/CloseCircle.svg';
import type { LeaveRequest } from '@/types/center-request';

const props = defineProps<{
	data?: LeaveRequest;
}>();

const emits = defineEmits<{
	(e: 'edit', payload: { data?: LeaveRequest; isView?: boolean }): void;
	(e: 'view', payload: { data?: LeaveRequest; isView?: boolean }): void;
	(e: 'delete', payload?: LeaveRequest): void;
	(e: 'reject', payload?: LeaveRequest): void;
	(e: 'approve', payload?: LeaveRequest): void;
	(e: 'recall', payload?: LeaveRequest): void;
}>();

const { data: account } = useGetAccount();

const actions = computed<IActionGroupType[]>(() => {
	const temp: IActionGroupType[] = [
		{
			label: 'View',
			icon: Eye,
			style: 'text-slate-600',
		},
	];

	if (account.value?.roles.includes('ADMIN')) {
		if (props.data?.status === 'TO_DO' || props.data?.status === 'CANCELING') {
			temp.push(
				{
					label: 'Approve',
					icon: CheckCircle,
					style: 'text-green-500',
				},
				{
					label: 'Reject',
					icon: CloseCircle,
					style: 'text-red-500',
				},
			);
		}

		return temp;
	}

	if (account.value?.roles.includes('CEO')) {
		if (
			props.data?.status === 'TO_DO' ||
			props.data?.status === 'CANCELING' ||
			props.data?.status === 'ON_HOLD'
		) {
			temp.push(
				{
					label: 'Approve',
					icon: CheckCircle,
					style: 'text-green-500',
				},
				{
					label: 'Reject',
					icon: CloseCircle,
					style: 'text-red-500',
				},
			);
		}

		return temp;
	}

	if (props.data?.status === 'DRAFT') {
		temp.push(
			{
				label: 'Edit',
				icon: Pen2,
				style: 'text-slate-600',
			},
			{
				label: 'Delete',
				icon: Trash,
				style: 'text-red-500',
			},
		);

		return temp;
	}

	if (
		props.data?.status === 'REJECTED' ||
		props.data?.status === 'CANCELED' ||
		props.data?.status === 'CANCELING'
	) {
		return temp;
	}

	temp.push({
		label: 'Recall',
		icon: Undo,
		style: 'text-slate-600',
	});

	return temp;
});

const onView = () => {
	emits('view', { data: props.data, isView: true });
};

const onEdit = () => {
	emits('view', { data: props.data, isView: false });
};

const onDelete = () => {
	emits('delete', props.data);
};

const onRecall = () => {
	emits('recall', props.data);
};

const onApprove = () => {};

const onReject = () => {
	emits('reject', props.data);
};
</script>
<template>
	<ActionGroupCommon
		:actions="actions"
		:onView="onView"
		:onEdit="onEdit"
		:onDelete="onDelete"
		:onRecall="onRecall"
		:onApprove="onApprove"
		:onReject="onReject" />
</template>
