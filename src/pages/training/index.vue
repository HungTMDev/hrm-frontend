<script lang="ts" setup>
import { useQueries, useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { computed } from 'vue';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';

const { data } = useQuery({
	queryKey: ['post'],
	queryFn: async () => {
		const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
		return (res.data as any[]).splice(0, 10);
	},
});

const listPost = computed(() => data.value ?? []);

const queries = computed(() => {
	return (
		data.value?.map((item) => ({
			queryKey: ['post', item.id],
			queryFn: async () => {
				const res = await axios.get(
					`https://jsonplaceholder.typicode.com/posts/${item.id}/comments`,
				);
				return res.data;
			},
		})) ?? []
	);
});

const queriesRes = useQueries({
	queries: queries,
});

const listComment = computed(() => {
	return queriesRes.value.map((item) => item.data);
});
</script>
<template>
	{{ today(getLocalTimeZone()) }}
	<div v-for="(item, index) in listPost" :key="index">
		<span>{{ index + 1 }}</span> - {{ item.title }}
		<ul class="list-disc list-inside">
			<li v-for="(i, idx) in listComment[index]" :key="idx">
				{{ i.name }}
			</li>
		</ul>
	</div>
</template>
