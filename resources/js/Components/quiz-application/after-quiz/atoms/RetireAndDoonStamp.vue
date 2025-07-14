<!-- @v overview: 再起不能（リタイア）とドォォォォンのスタンプ -->
<!-- @v tips: スタンプが押されたようなアニメーション -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import Retire from '~/retire.png'
import Dooon from '~/dooon.png'
const props = defineProps<{
    showRetireAndDoon: boolean
}>()

const show = computed(() => {
    if (props.showRetireAndDoon === true) {
        return 'wp-block-image size-large is-resized my-stamp my-stamp-on'
    } else {
        return 'wp-block-image size-large is-resized my-stamp'
    }
})
</script>

<template>
    <figure :class="show">
        <div class="retire-and-doon-stamp">
            <img :src="Retire" class="stamp2 wp-image-8151" alt="不正解画像" width="300" height="300" />
            <img :src="Dooon" class="stamp2 wp-image-8151" alt="不正解画像" width="300" height="300" />
        </div>
    </figure>
</template>

<style lang="scss" scoped>
.my-stamp {
    width: fit-content;
    height: fit-content;
    position: relative;
}

.retire-and-doon-stamp {
    width: 300px;
    color: $malachite;
    font-size: 20px;
    font-weight: bold;

    background-color: transparent;
    animation: glow 1.5s infinite alternate;
    border-radius: 10px;
    animation: sample_anime03 1s;
}

@keyframes glow {
    0% {
        background-color: white;
        box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.5);
    }
    100% {
        background-color: #f0f0f0; /* 少し暗い白色に変更 */
        box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.5);
    }
}

figure .my-stamp {
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
    10% {
        visibility: visible;
        opacity: 0;
        transform: rotate(-30deg) scale(2.5);
    }
    50% {
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
@keyframes sample_anime03 {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.3;
    }
    100% {
        opacity: 1;
    }
}

/* スタンプアニメーションここまで */
</style>
