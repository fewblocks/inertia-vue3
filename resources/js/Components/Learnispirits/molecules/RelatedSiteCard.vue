<!-- @v overview: 姉妹サイト情報カード -->
<!-- @v complecate: jsonからカラー情報を決定している... -->
<script setup lang="ts">
import relatedSiteImage from '~/related-site-image.png'
import colorsData from '@/json/output.json'
import { ColorsData } from '@/types/Colors'
import { ref } from 'vue'
const props = defineProps<{
    /** 背景色 */
    color?: string
}>()

// JSONデータを型付きでインポート
const data: ColorsData = colorsData || { colors: [] }

const color = ref('')
const sunglow = data.colors.find((color) => color.name === props.color)
if (sunglow) {
    color.value = sunglow.value
}
</script>

<template>
    <!-- 姉妹サイト情報カード -->
    <div class="col">
        <div class="card">
            <!-- ヘッダーイメージ -->
            <img :src="relatedSiteImage" class="card-img-top" alt="..." />
            <div class="card-body">
                <!-- カードタイトル -->
                <h5 class="card-title"><slot name="title"></slot></h5>
                <!-- カードテキスト -->
                <p class="card-text">
                    <!-- 説明 -->
                    <slot name="description"></slot>
                </p>
            </div>
            <!-- フッダー -->
            <div class="card-footer">
                <small class="text-body-secondary">
                    <!-- メッセージ -->
                    <slot name="message"></slot
                ></small>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card-footer {
    background-color: v-bind(color);
}
</style>
