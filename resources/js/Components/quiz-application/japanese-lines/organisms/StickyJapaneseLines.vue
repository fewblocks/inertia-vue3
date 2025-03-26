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
</script>

<template>
    <template v-if="props.feeling === 'angry'">
        <div class="japanese-line-back col-12 col-md-10 col-lg-10">
            <div class="japanese-line-text">{{ props.japaneseLine }}</div>
        </div>
    </template>
    <template v-else-if="props.feeling === 'happy'">
        <div class="japanese-line-back col-12 col-md-10 col-lg-10">
            <div class="japanese-line2-text">{{ props.japaneseLine }}</div>
        </div>
    </template>
    <template v-else="props.feeling === 'sad'">
        <div class="japanese-line-back col-12 col-md-10 col-lg-10">
            <div class="japanese-line-text3">{{ props.japaneseLine }}</div>
        </div>
    </template>
</template>

<style lang="scss" scoped>
/* TODO: SVGがテキスト量に伴って縦比率だけ変化するように記述、
padding の値がこのままだと対応しきれていないので、何かしらの工夫が必要
*/

.japanese-line {
    display: flex;
    justify-content: center; /* アイコンとコンテンツを中央揃えにする場合 */
}

.japanese-line-back {
    min-height: 100px;
    height: auto;
    background: $coral;
}
.japanese-line-text {
    padding-top: 5%;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    width: 100%;
    font-size: 20px;
    word-break: break-all;
}
.japanese-line-back2 {
    min-height: 200px;
    height: auto;
    background: $coral;
}
.japanese-line-text2 {
    padding-top: 5%;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    width: 100%;
    font-size: 20px;
    word-break: break-all;
}
.japanese-line-back3 {
    min-height: 200px;
    height: auto;
    background: $coral;
}
.japanese-line-text3 {
    padding-top: 5%;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    width: 100%;
    font-size: 20px;
    word-break: break-all;
    background: $silver;
}
</style>
