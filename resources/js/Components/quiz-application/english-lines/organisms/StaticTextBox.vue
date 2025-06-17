<!-- @v overview: 静的英単語コンポーネント -->
<script setup lang="ts">
const props = defineProps<{
    // 英文
    text?: string
}>()
</script>

<template>
    <div class="d-inline-block">
        <span class="static fw-bold w-auto">{{ props.text }}</span>
    </div>
</template>

<style lang="scss" scoped>
.fw-bold {
    padding-top: 20px !important;
}

@media (max-width: 599px) {
    .static {
        height: 25px;
        padding: 5px;
        margin-bottom: 15px !important;
        font-size: medium;
        padding: 10px;
        font-weight: bold;
    }
}

@media (min-width: 600px) {
    .static {
        padding: 15px;
        margin-bottom: 5px !important;
        font-size: larger;
        padding: 20px;
        font-weight: bold;
    }
}
</style>
