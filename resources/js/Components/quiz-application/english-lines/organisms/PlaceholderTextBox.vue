<script setup lang="ts">
const props = defineProps<{
    // 英文
    // コメント
    index: Number
    word: String
    status: 'filled' | 'selected' | 'unselected'
}>()
</script>
<template>
    <div class="d-inline-block">
        <template v-if="props.status === 'selected'">
            <p class="fw-bold fs-1 w-auto blinking">_______</p>
        </template>
        <template v-if="props.status === 'unselected'">
            <p class="fw-bold fs-1 w-auto">_______</p>
        </template>
        <template v-if="props.status === 'filled'">
            <p class="fw-bold fs-1 w-auto unselected">{{ props.word }}</p>
        </template>
    </div>
</template>
<style scoped>
@keyframes blink {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}

.blinking {
    animation: blink 1s infinite;
}
</style>
