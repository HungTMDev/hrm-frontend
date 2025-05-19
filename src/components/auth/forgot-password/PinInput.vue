<script setup lang="ts">
import { PinInput, PinInputGroup, PinInputInput } from '@/components/ui/pin-input';
import { ref } from 'vue';

const emit = defineEmits<{
	(e: 'update:data', payload: string): void;
}>();

const value = ref<string[]>([]);
const handleComplete = (e: string[]) => {
	emit('update:data', e.join(''));
};
</script>

<template>
	<div>
		<PinInput id="pin-input" v-model="value" type="number" @update:model-value="handleComplete">
			<PinInputGroup class="gap-2">
				<PinInputInput
					v-for="(item, index) in 6"
					:key="item"
					class="rounded-md border focus:ring-blue-500"
					:index="index" />
			</PinInputGroup>
		</PinInput>
	</div>
</template>
