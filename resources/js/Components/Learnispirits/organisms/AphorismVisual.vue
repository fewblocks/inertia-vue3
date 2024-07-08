<!-- 名言石碑イメージ -->
<script setup lang="ts">
import aphorismVisual from "~/aphorism-image.png";
</script>
<template>
    <!-- 名言石碑イメージ -->
    <div class="aphorism-visual-wrapper">
        <img
            :src="aphorismVisual"
            class="aphorism-visual img-fluid"
            alr="名言石碑画像"
        />
    </div>
</template>

<style lang="scss" scoped>
.aphorism-visual-wrapper {
    display: flex;
    justify-content: center;
    max-width: 1280px;
    margin: 0 auto;
    .aphorism-visual {
        background-color: red;
        width: 90%;
        height: auto;
    }
}
</style>
