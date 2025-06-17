<!-- @v overview: 姉妹サイト情報 -->
<script setup lang="ts">
import RelatedSiteCard from '@/Components/Learnispirits/molecules/RelatedSiteCard.vue'
import type { RelatedSiteData } from '@/types/RelatedSiteData.ts'

import { ref } from 'vue'

const relatedSiteData = ref<RelatedSiteData[]>([
    {
        id: 1,
        title: 'ナルト',
        description:
            'aThis is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        message: 'Last updated 3 mins ago',
        /** sass の変数名を直接指定 */
        color: 'sunglo'
    },
    {
        id: 2,
        title: 'HUNTER X HUNTER',
        description: 'This card has supporting text below as a natural lead-in to additional content.',
        message: 'Last updated 3 mins ago',
        /** sass の変数名を直接指定 */
        color: 'mindaro'
    },
    {
        id: 3,
        title: '僕のヒーローアカデミア',
        description:
            'This is a wider card with suppor ting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
        message: 'Last updated 3 mins ago',
        /** sass の変数名を直接指定 */
        color: 'perfume'
    }
])
</script>
<template>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-3 g-4 w-100">
        <template v-for="relatedSite in relatedSiteData">
            <!-- 姉妹サイト情報カード -->
            <RelatedSiteCard v-bind:color="relatedSite.color">
                <!-- タイトル -->
                <template #title>{{ relatedSite.title }}</template>
                <!-- 説明 -->
                <template #description>{{ relatedSite.description }}</template>
                <!-- メッセージ -->
                <template #message>{{ relatedSite.message }}</template>
            </RelatedSiteCard>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>
