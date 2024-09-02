<script setup lang="ts">
const props = defineProps<{
    // 英文
    text?: string
}>()
</script>

<template>
    <div class="d-inline-block">
        <p class="fw-bold fs-1 w-auto">{{ props.text }}</p>
    </div>
</template>

<style lang="scss" scoped></style>
