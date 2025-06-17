<!-- @v overview: 石碑画面メニューコンポーネント -->
<script setup lang="ts">
defineProps<{
    /** TODO: 背景色設定 */
    color?: string
}>()
</script>

<template>
    <div class="aphorism-menu">
        <div>
            <!-- 作品名 -->
            <p>ジョジョの奇妙な冒険</p>
            <!-- 索引 -->
            <p>スピードワゴンの名言1</p>
        </div>
        <div class="" style="display: flex; justify-content: space-between; align-items: end">
            <!-- 「ダウンロード」ボタン -->
            <div>
                <button class="btn btn-primary my-2 my-sm-0 w" type="submit">dowwnload</button>
            </div>
            <!-- 「もっと見る」ボタン -->
            <div>
                <button class="btn btn-secondary my-2 my-sm-0 w" type="submit">もっと見る</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.aphorism-menu {
    display: flex;
    justify-content: space-between;
}
</style>
