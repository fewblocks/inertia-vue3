<!-- 新着情報カード -->
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

<style scoped>
.news-card {
    background-color: v-bind(color);
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
}
</style>
