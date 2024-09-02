<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { breakpoints } from '@/utils/breakpoints'
import CharacterIcon from '@/Components/quiz-application/japanese-lines/atoms/CharacterIcon.vue'
import JapaneseLines from '@/Components/quiz-application/japanese-lines/organisms/JapaneseLines.vue'
import EnglishLines from '@/Components/quiz-application/english-lines/organisms/EnglishLines.vue'
import EnglishBoxese from '@/Components/quiz-application/english-lines/organisms/EnglishBoxese.vue'
import LineQuizCountDownTimerBase from '@/Components/line-quiz-countdown-timer/organisms/LineQuizCountDownTimers/LineQuizCountDownTimerBase.vue'
import type { Feeling } from '@/types/Feeling'

type Breakpoints = keyof typeof breakpoints // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
// メディアクエリーの判別値(windowオブジェクト)
const mediaQuery = window.matchMedia(`(max-width : ${breakpoints.md})`)
const isScreenMiddle = ref(mediaQuery.matches)

// テキスト寄せ判定

// windowオブジェクトにリスナーを設定（メディアクエリー判別値随時更新）
const update = (event: { matches: boolean }) => (isScreenMiddle.value = event.matches)
onMounted(() => mediaQuery.addEventListener('change', update))
onUnmounted(() => mediaQuery.removeEventListener('change', update))

const props = defineProps<{
    // 日本語文
    japaneseLine?: string
    // 英語文
    englishLine?: string
    // 感情
    feeling?: Feeling
}>()

const pageState = ref('beforeCount')

const changeCountDownState = (state: string) => {
    pageState.value = state
}
</script>

<template>
    <div class="wrap">
        <!-- 日本語 -->
        <div class="content japanese-lines row">
            <div class="character-icon row col-8 col-md-4">
                <CharacterIcon />
            </div>
            <div v-show="isScreenMiddle" class="col-4 position-relative">
                <LineQuizCountDownTimerBase :max="5" @changeCountDownState="changeCountDownState" />
            </div>
            <div class="japanese-line row col-12 col-md-8 position-relative">
                <JapaneseLines :feeling="props.feeling" :japaneseLine="props.japaneseLine" />
                <!-- カウントダウンタイマー -->
                <div v-show="!isScreenMiddle" class="col-2 position-relative">
                    <LineQuizCountDownTimerBase :max="5" @changeCountDownState="changeCountDownState" />
                </div>
            </div>
        </div>
        <!-- 英語 -->
        <div class="content english-lines row">
            <EnglishLines :englishLine="props.englishLine" />
        </div>
        <div class="content english-lines row">
            <EnglishBoxese />
        </div>
    </div>
</template>

<style scoped>
main-content {
    background-color: #ffcc27;
}

.wrap {
    width: 100%;
}
.content {
    width: 100%;
}

.japanese-line {
    display: flex;
    justify-content: flex-start;
}
</style>
