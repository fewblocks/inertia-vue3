<script setup>
import characterIcon from '@/Components/quiz-application/japanese-lines/atoms/CharacterIcon.vue'
import SpeechBubbleAngry from '~/speech-bubble-angry.svg'
import { ref } from 'vue'

const url = ref(SpeechBubbleAngry)
// background-image: v-bind　するために必要
// https://github.com/vuejs/core/issues/8117
const shapeUrl = `url(${SpeechBubbleAngry})`
</script>

<template>
    <characterIcon />
    <div class="wrap">
        <div class="content">aaaaa</div>
    </div>
</template>

<style scoped>
/* TODO: SVGがテキスト量に伴って縦比率だけ変化するように記述、
padding の値がこのままだと対応しきれていないので、何かしらの工夫が必要
*/
.wrap {
    width: 100%;
    min-height: 200px;
    height: auto;
    background-image: v-bind(shapeUrl);
    background-repeat: no-repeat;
    background-size: 100% 100%; /* 幅は自動、縦は100%に設定 */
    background-position: center top;
}
.content {
    padding-top: 24%;
    padding-left: 24%;
    padding-right: 24%;
    padding-bottom: 24%;
    width: 100%;
    font-size: 20px;
    word-break: break-all;
}
</style>
