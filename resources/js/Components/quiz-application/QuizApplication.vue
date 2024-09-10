<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { breakpoints } from '@/utils/breakpoints'
import CharacterIcon from '@/Components/quiz-application/japanese-lines/atoms/CharacterIcon.vue'
import JapaneseLines from '@/Components/quiz-application/japanese-lines/organisms/JapaneseLines.vue'
import EnglishLines from '@/Components/quiz-application/english-lines/organisms/EnglishLines.vue'
import EnglishBoxese from '@/Components/quiz-application/english-boxes/organisms/EnglishBoxese.vue'
import LineQuizCountDownTimerBase from '@/Components/line-quiz-countdown-timer/organisms/LineQuizCountDownTimers/LineQuizCountDownTimerBase.vue'
import type { Feeling } from '@/types/Feeling'
import { useSentenceSplitter } from '@/Composable/useSentenceSplitter'

/** 'xs' | 'sm' | 'md' | 'lg' | 'xl' */
type Breakpoints = keyof typeof breakpoints

/** メディアクエリーの判別値(windowオブジェクト) */
const mediaQuery = window.matchMedia(`(max-width : ${breakpoints.md})`)
/** スクリーンmiddle 以下判定 */
const isScreenMiddle = ref(mediaQuery.matches)

/** windowオブジェクトにリスナーを設定（メディアクエリー判別値随時更新）*/
const update = (event: { matches: boolean }) => (isScreenMiddle.value = event.matches)
onMounted(() => mediaQuery.addEventListener('change', update))
onUnmounted(() => mediaQuery.removeEventListener('change', update))

const props = defineProps<{
    /** 日本語 */
    japaneseLine?: string
    /** 英語 */
    englishLine?: string
    /** 英語 */
    feeling?: Feeling
}>()

/** 難易度 */
const difficulty = 'medium' // "high", "medium", "low" のいずれか

/**  TODO: 仮の値（日本語文）*/
/**  文章分割処理結果取得 「文章全部」「難易度」 */
const { resultArray } = useSentenceSplitter(props.englishLine, difficulty)
resultArray.value

/** テキストオブジェクツ */
const textObjects = ref(resultArray)
/** ページステート */
const pageState = ref('beforeCount')

/** カウントダウンステート変更 */
const changeCountDownState = (state: string) => {
    pageState.value = state
}

/** プレースホルダーのボタンを選択した際の処理
 * ボタンの選択された単語を設定
 * ボタンのステータス（入力済み）に変更
 * 次のプレースホルダーのボタンを選択状態にする
 *
 */
const handleSelectText = ({ buttonIndex, nextPlaceholderIndex, buttonWord }) => {
    // ボタンを非活性にする
    textObjects.value = textObjects.value.map((item) =>
        item.index === buttonIndex ? { ...item, disabled: true } : item
    )

    // ボタンの選択された単語を設定
    textObjects.value = textObjects.value.map((textObject) =>
        textObject.status === 'selected' ? { ...textObject, selectedWord: buttonWord } : textObject
    )

    // ボタンのステータス（入力済み）に変更
    textObjects.value = textObjects.value.map((textObject) =>
        textObject.status === 'selected' ? { ...textObject, status: 'filled' } : textObject
    )

    // 次のプレースホルダーのボタンを選択状態にする
    textObjects.value = textObjects.value.map((button) =>
        button.index === nextPlaceholderIndex ? { ...button, status: 'selected' } : button
    )
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
            <EnglishLines :englishLine="props.englishLine" :textObjects="textObjects" />
        </div>
        <!-- 日本語 -->
        <div class="content english-lines row">
            <EnglishBoxese :textObjects="textObjects" @select-text="handleSelectText" />
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
