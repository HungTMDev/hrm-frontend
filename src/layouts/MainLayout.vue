<script setup lang="ts">
import Header from './header/Header.vue';
import Sidebar from './sidebar/Sidebar.vue';
import BreadcrumbMain from './BreadcrumbMain.vue';
</script>
<template>
	<div class="bg-slate-100 min-h-screen flex transition-all duration-300 text-sm font-normal">
		<Sidebar />
		<div class="flex-1">
			<Header />
			<main class="p-4 relative">
				<BreadcrumbMain />
				<RouterView />
			</main>
		</div>
	</div>
</template>
