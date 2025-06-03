<template>
	<div class="lists">
		<draggable v-model="list1" group="shared" item-key="id">
			<template #item="{ element }">
				<div>{{ element.name }}</div>
			</template>
		</draggable>

		<draggable v-model="list2" group="shared" item-key="id">
			<template #item="{ element }">
				<div>{{ element.name }}</div>
			</template>
		</draggable>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

const list1 = ref([
	{ id: 1, name: 'A' },
	{ id: 2, name: 'B' },
]);
const list2 = ref([
	{ id: 3, name: 'C' },
	{ id: 4, name: 'D' },
]);
</script>
