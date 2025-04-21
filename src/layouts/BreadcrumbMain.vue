<script setup lang="ts">
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
	<Breadcrumb class="hidden md:flex pb-4">
		<BreadcrumbList>
			<template v-for="(router, index) in route.matched" :key="index">
				<BreadcrumbItem v-if="router.name">
					<BreadcrumbLink
						class="font-normal"
						v-if="route.fullPath !== router.path"
						as-child>
						<RouterLink :to="router.path">{{ router.name }}</RouterLink>
					</BreadcrumbLink>
					<BreadcrumbPage class="text-blue-500 font-medium" v-else>
						{{ router.name }}</BreadcrumbPage
					>
				</BreadcrumbItem>
				<BreadcrumbSeparator v-if="index + 1 < route.matched.length" />
			</template>
		</BreadcrumbList>
	</Breadcrumb>
</template>
