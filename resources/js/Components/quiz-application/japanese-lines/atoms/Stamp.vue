<script setup lang="ts">
import { ref, computed } from 'vue'
import Correct from '~/correct.png'
import Incorrect from '~/incorrect.png'
const props = defineProps<{
    showAnswer: boolean
    answer?: boolean
}>()

const show = computed(() => {
    if (props.showAnswer === true) {
        return 'wp-block-image size-large is-resized my-stamp my-stamp-on'
    } else {
        return 'wp-block-image size-large is-resized my-stamp'
    }
})
</script>

<template>
    <figure :class="show">
        <template v-if="props.answer === true">
            正解
            <img :src="Correct" class="stamp2 wp-image-8151" alt="正解画像" width="150" height="150" />
        </template>
        <template v-else-if="props.answer === false">
            不正解
            <img :src="Incorrect" class="stamp2 wp-image-8151" alt="不正解画像" width="150" height="150" />
        </template>
    </figure>
</template>

<style lang="scss" scoped>
figure.my-stamp {
    position: relative;
    width: 150px;
    height: 150px;
    margin: 20px auto 20px;
    padding: 10px;
    font-size: 20px;
    text-align: center;
}
.my-stamp img.stamp2 {
    display: inline-block;
    padding: 20px;
    /* スタンプアニメーションのための初期値 */
    visibility: hidden;
    animation: sample_anime02 2s paused both;
}
.my-stamp-on img.stamp2 {
    animation-play-state: running;
}

@keyframes sample_anime02 {
    0% {
        visibility: visible;
        opacity: 0;
        transform: rotate(-30deg) scale(2.5);
    }
    30% {
        visibility: visible;
        opacity: 0.8;
        transform: rotate(5deg) scale(1.04);
    }
    100% {
        visibility: visible;
        opacity: 1;
        transform: rotate(0deg);
    }
}

/* スタンプアニメーションここまで */
</style>
