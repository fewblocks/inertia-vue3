<!-- @v overview: 石碑画面 石碑テキストコンポーネント -->
<script setup lang="ts">
import squareIcon from '~/square-icon.png'
</script>

<template>
    <div class="aphorism-text mb-3">
        <div class="mb-ml-auto mb-mx-auto col-10" style="display: flex; justify-content: start">
            <!-- アイコン -->
            <div class="icon col-2 ml-auto mx-auto">
                <img
                    :src="squareIcon"
                    class="card-img-top d-block ml-auto mx-auto mb-5 mt-5"
                    style="height: 60px; width: 60px"
                    alt="..."
                />
            </div>
            <!-- 石碑テキスト -->
            <div class="col-10 mb-col12 d-flex row justify-content-center pt-3 pb-3">
                <!-- 英文 -->
                <slot name="english"></slot>
                <!-- 日本文 -->
                <slot name="japanese"></slot>
                <!-- 引用文 -->
                <slot name="quote"></slot>
                <!-- 説明文 -->
                <slot name="description"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.aphorism-text {
    /* display: flex;
    justify-content: space-between; */
}
</style>
