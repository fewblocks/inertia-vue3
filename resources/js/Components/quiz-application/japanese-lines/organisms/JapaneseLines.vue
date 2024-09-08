<script setup lang="ts">
import type { Feeling } from '@/types/Feeling'
import SpeechBubbleAngry from '~/speech-bubble-angry.svg'
import untitled from '~/untitled.svg'
import Untitled2 from '~/Untitled2.svg'
import { ref } from 'vue'
const props = defineProps<{
    // 日本語文
    // constant じゃなくてtype!!!
    feeling?: Feeling
    japaneseLine: string
}>()

const url = ref(SpeechBubbleAngry)
const url2 = ref(untitled)
const url3 = ref(Untitled2)
// background-image: v-bind　するために必要
// https://github.com/vuejs/core/issues/8117
const shapeUrl = `url(${SpeechBubbleAngry})`
const shapeUrl2 = `url(${untitled})`
const shapeUrl3 = `url(${Untitled2})`
</script>

<template>
    <template v-if="props.feeling === 'angry'">
        <div class="japanese-line-back col-12 col-md-8 col-lg-8">
            <div class="japanese-line-text">{{ props.japaneseLine }}</div>
        </div>
    </template>
    <template v-else-if="props.feeling === 'happy'">
        <div class="japanese-line-back col-12 col-md-8 col-lg-8">
            <div class="japanese-line2-text">{{ props.japaneseLine }}</div>
        </div>
    </template>
    <template v-else="props.feeling === 'sad'">
        <div class="japanese-line-back col-12 col-md-8 col-lg-8">
            <div class="japanese-line-text3">{{ props.japaneseLine }}</div>
        </div>
    </template>
</template>

<style scoped>
/* TODO: SVGがテキスト量に伴って縦比率だけ変化するように記述、
padding の値がこのままだと対応しきれていないので、何かしらの工夫が必要
*/

.character-icon,
.japanese-line {
    display: flex;
    justify-content: center; /* アイコンとコンテンツを中央揃えにする場合 */
}
.character-icon {
    /* margin-bottom: auto; */
}

.japanese-line-back {
    min-height: 200px;
    height: auto;
    background-image: v-bind(shapeUrl);
    background-repeat: no-repeat;
    background-size: 100% 100%; /* 幅は自動、縦は100%に設定 */
    background-position: center top;
}
.japanese-line-text {
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
