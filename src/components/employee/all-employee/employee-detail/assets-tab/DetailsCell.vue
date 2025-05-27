<script lang="ts" setup>
defineProps<{ data: string[] }>();
</script>
<template>
	<ul class="list-disc list-inside">
		<li v-for="(item, index) in data" :key="index">{{ item }}</li>
	</ul>
</template>
