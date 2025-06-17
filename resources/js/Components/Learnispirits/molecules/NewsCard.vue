<!-- @v overview: 新着情報カード -->
<script setup lang="ts">
defineProps<{
    /** 背景色 */
    color?: string
}>()
</script>

<template>
    <!-- 新着情報カード -->
    <div class="news-card">
        <!-- 新着情報テキスト -->
        <div><slot name="new"></slot></div>
        <!-- 予定日時 -->
        <div><slot name="time"></slot></div>
        <!-- メッセージ -->
        <div><slot name="message"></slot></div>
    </div>
</template>

<style lang="scss" scoped>
.news-card {
    background-color: $snuff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    border: 1px solid $mine-shaft;
}
</style>
