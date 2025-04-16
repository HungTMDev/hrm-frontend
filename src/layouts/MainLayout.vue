<script setup lang="ts">
import SpinnerLoad from '@/components/common/SpinnerLoad.vue';
import Header from './header/Header.vue';
import Sidebar from './sidebar/Sidebar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BreadcrumbMain from './BreadcrumbMain.vue';

const router = useRouter();
const isLoading = ref(false);

router.beforeEach((to, from, next) => {
	isLoading.value = true;
	setTimeout(() => {
		isLoading.value = false;
		next();
	}, 500);
});
</script>
<template>
	<div class="bg-slate-100 min-h-screen flex transition-all duration-300 text-sm font-normal">
		<Sidebar />
		<div class="flex-1">
			<Header />
			<main class="p-4 relative">
				<div
					v-if="isLoading"
					class="w-full bg-white h-full bg-opacity-60 absolute right-0 top-0 z-30">
					<div class="grid place-items-center min-h-[calc(100vh-80px)]">
						<SpinnerLoad />
					</div>
				</div>
				<BreadcrumbMain />
				<RouterView />
			</main>
		</div>
	</div>
</template>
