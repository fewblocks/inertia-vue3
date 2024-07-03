<!-- ワードクラウド -->
<script setup lang="ts">
import wordCloudSrc from "~/word-cloud.png";
</script>
<template>
    <!-- ワードクラウト -->
    <div class="word-cloud-visual-wrapper pt-4">
        <img
            :src="wordCloudSrc"
            class="word-cloud-visual img-fluid"
            alr="ワードクラウド画像"
        />
    </div>
</template>

<style lang="scss" scoped>
.word-cloud-visual-wrapper {
    display: flex;
    justify-content: end;
    .word-cloud-visual {
        background-color: red;
        max-width: 100%;
        height: auto;
    }
}
</style>
