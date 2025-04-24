<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
</script>
<template>
	<ContentWrapper>
		<ScrollArea class="h-80 w-80">
			<div class="h-80 w-[700px] bg-gradient-to-r from-indigo-500 to-fuchsia-500"></div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	</ContentWrapper>
</template>
