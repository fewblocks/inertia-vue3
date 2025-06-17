<!-- @v overview: 吹き出しで囲まれた日本語文 -->
<!-- @v age_old: 感情の吹き出しごとにブロックを作っている。 -->
<script setup lang="ts">
import type { Feeling } from '@/types/Feeling'
import SpeechBubbleAngry from '~/speech-bubble-angry.svg'
import SpeechBubbleSad from '~/speech-bubble-sad.svg'
import SpeechBubbleHappy from '~/speech-bubble-happy.svg'
import { ref } from 'vue'
const props = defineProps<{
    // 日本語文
    // constant じゃなくてtype!!!
    feeling?: Feeling
    japaneseLine: string
}>()

const url = ref(SpeechBubbleAngry)
const url2 = ref(SpeechBubbleHappy)
const url3 = ref(SpeechBubbleSad)
// background-image: v-bind　するために必要
// https://github.com/vuejs/core/issues/8117
const shapeUrl1 = `url(${SpeechBubbleAngry})`
const shapeUrl2 = `url(${SpeechBubbleHappy})`
const shapeUrl3 = `url(${SpeechBubbleSad})`
</script>

<template>
    <!-- 吹き出し　怒り -->
    <template v-if="props.feeling === 'angry'">
        <div class="japanese-line-back1 col-12 col-md-8 col-lg-8">
            <div class="japanese-line-text1">{{ props.japaneseLine }}</div>
        </div>
    </template>
    <!-- 吹き出し　楽しみ -->
    <template v-else-if="props.feeling === 'happy'">
        <div class="japanese-line-back2 col-12 col-md-8 col-lg-8">
            <div class="japanese-line-text2">{{ props.japaneseLine }}</div>
        </div>
    </template>
    <!-- 吹き出し　悲しみ -->
    <template v-else="props.feeling === 'sad'">
        <div class="japanese-line-back3 col-12 col-md-8 col-lg-8">
            <div class="japanese-line-text3">{{ props.japaneseLine }}</div>
        </div>
    </template>
</template>

<style scoped>
/* TODO: SVGがテキスト量に伴って縦比率だけ変化するように記述、
padding の値がこのままだと対応しきれていないので、何かしらの工夫が必要
*/

.japanese-line {
    display: flex;
    justify-content: center; /* アイコンとコンテンツを中央揃えにする場合 */
}

.japanese-line-back1 {
    min-height: 200px;
    height: auto;
    background-image: v-bind(shapeUrl1);
    background-repeat: no-repeat;
    background-size: 100% 100%; /* 幅は自動、縦は100%に設定 */
    background-position: center top;
}
.japanese-line-text1 {
    padding-top: 24%;
    padding-left: 24%;
    padding-right: 24%;
    padding-bottom: 24%;
    width: 100%;
    font-size: 20px;
    word-break: break-all;
}
.japanese-line-back2 {
    min-height: 200px;
    height: auto;
    background-image: v-bind(shapeUrl2);
    background-repeat: no-repeat;
    background-size: 100% 100%; /* 幅は自動、縦は100%に設定 */
    background-position: center top;
}
.japanese-line-text2 {
    padding-top: 24%;
    padding-left: 24%;
    padding-right: 24%;
    padding-bottom: 24%;
    width: 100%;
    font-size: 20px;
    word-break: break-all;
}
.japanese-line-back3 {
    min-height: 200px;
    height: auto;
    background-image: v-bind(shapeUrl3);
    background-repeat: no-repeat;
    background-size: 100% 100%; /* 幅は自動、縦は100%に設定 */
    background-position: center top;
}
.japanese-line-text3 {
    padding-top: 24%;
    padding-left: 24%;
    padding-right: 24%;
    padding-bottom: 24%;
    width: 100%;
    font-size: 20px;
    word-break: break-all;
}
</style>
