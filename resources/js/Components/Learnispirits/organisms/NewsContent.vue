<!-- ニュースコンテンツ -->
<script setup lang="ts">
import { ref } from 'vue'
import type { NewsData } from '@/types/NewsData.ts'
import NewsCard from '@/Components/Learnispirits/molecules/NewsCard.vue'

/**
 * TODO: 色の配列を作って上から順番に流し込んでいく
 * カラーセットというか、専用の色セットを一つのまとまりとして「news-colors」
 * みたいな命名をしてもいいかもしれない。
 * CSSで作る！
 */

const colors = []
/* *新着情報データ(API想定) */
const newsData = ref<NewsData[]>([
    {
        id: 1,
        new: 'CommingSoon!',
        time: '2024年6月25日！！',
        message: 'NewCollection追加！！'
    },
    {
        id: 2,
        new: 'CommingSoon!',
        time: '2024年6月24日！！',
        message: 'NewCollection追加！！'
    },
    {
        id: 3,
        new: 'CommingSoon!',
        time: '2024年6月23日！！',
        message: 'NewCollection追加！！'
    }
])
</script>
<template>
    <!-- ニュースコンテンツ -->
    <div class="news">
        <template v-for="news in newsData">
            <NewsCard>
                <!-- 新着情報テキスト -->
                <template #new>{{ news.new }}</template>
                <!-- 予定日時 -->
                <template #time>{{ news.time }}</template>
                <!-- メッセージ -->
                <template #message>{{ news.message }}</template>
            </NewsCard>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.news {
    /** background-color: darkturquoise; */
}
</style>
