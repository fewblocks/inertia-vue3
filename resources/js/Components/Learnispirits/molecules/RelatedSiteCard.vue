<!-- 姉妹サイト情報カード -->
<script setup lang="ts">
import relatedSiteImage from '~/related-site-image.png'
defineProps<{
    /** 背景色 */
    color?: string
}>()
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
