<script lang="ts" setup>
import UserCheck from '@/assets/icons/Outline/User Check.svg';
import UserCross from '@/assets/icons/Outline/User Cross.svg';
import UserGroup from '@/assets/icons/Outline/Users Group Two Rounded.svg';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import Title from '@/components/common/Title.vue';
import Overview from '@/components/dashboard/Overview.vue';
import ListEmployee from '@/components/employee/list-employee/ListEmployee.vue';
import UpcomingEvents from '@/components/employee/upcoming-event/UpcomingEvents.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import { DonutChart } from '@/components/ui/chart-donut';
import Separator from '@/components/ui/separator/Separator.vue';

const data = [
	{
		name: 'Pernament Employee',
		total: 48,
		color: '#0E6EED',
	},
	{
		name: 'Contract Employee',
		total: 42,
		color: '#4CCE29',
	},
	{
		name: 'Internship/Training',
		total: 30,
		color: '#F8AD34',
	},
];
</script>
<template>
	<div class="grid grid-cols-3 grid-rows-6 gap-4">
		<div class="col-span-2 row-span-2 grid grid-cols-3 grid-rows-2 gap-4">
			<ContentWrapper class="col-span-2 row-span-2">
				<div class="flex items-center gap-2">
					<div class="p-2 bg-blue-50 text-blue-500 rounded-full">
						<IconFromSvg :icon="UserGroup" />
					</div>
					<h3 class="flex-1">Total Employee</h3>
					<Button variant="link" class="text-blue-500">View more</Button>
				</div>
				<div class="mt-4 flex gap-4 items-center">
					<DonutChart
						index="name"
						:category="'total'"
						:colors="['#0E6EED', '#4CCE29', '#F8AD34']"
						:data="data"
						class="w-[250px]" />
					<div>
						<ul class="flex flex-col gap-4">
							<li
								v-for="(item, index) in data"
								:key="index"
								class="grid grid-cols-5 gap-2 items-center text-sm">
								<span
									:style="`background-color: ${item.color}`"
									:class="['w-5 h-5 rounded-full']"></span>
								<span class="col-span-3">{{ item.name }}</span>
								<span class="text-end font-medium">{{ item.total }}</span>
							</li>
						</ul>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper>
				<Overview title="New Employee" :percentage="32" :quantity="16" :icon="UserCheck" />
			</ContentWrapper>
			<ContentWrapper>
				<Overview
					title="Resigned Employee"
					:percentage="-3"
					:quantity="3"
					:icon="UserCross" />
			</ContentWrapper>
		</div>
		<ContentWrapper class="row-span-3"><UpcomingEvents /></ContentWrapper>
		<ContentWrapper class="col-span-2 row-span-4"><ListEmployee /></ContentWrapper>
		<ContentWrapper class="row-span-3">
			<div class="flex justify-between items-center">
				<Title>Constract Signing Reminder</Title>
				<span
					class="w-5 h-5 rounded-full bg-red-500 text-white grid place-items-center text-sm">
					4
				</span>
			</div>
			<Separator class="my-4" />
			<div class="flex flex-col gap-4">
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
				<div class="flex justify-between items-center">
					<div>
						<h4>Le Quang Phuc</h4>
						<p class="text-sm text-gray-400">Graphic Designer</p>
					</div>
					<Badge class="py-1 font-normal text-red-500 bg-red-100 hover:bg-red-100"
						>Expired</Badge
					>
				</div>
			</div>
		</ContentWrapper>
	</div>
</template>
