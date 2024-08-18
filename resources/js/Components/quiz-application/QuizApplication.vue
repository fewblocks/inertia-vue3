<script setup lang="ts">
import JapaneseLines from './japanese-lines/JapaneseLines.vue'
const props = defineProps<{
    // 日本語文
    japaneseLine?: string
    feeling?: string
}>()
</script>

<template>
    <div class="main-content">クイズ,{{ props.feeling }}</div>
    <JapaneseLines />
</template>

<style scoped>
main-content {
    background-color: #ffcc27;
}
</style>
