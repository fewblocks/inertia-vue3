<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { breakpoints } from '@/utils/breakpoints'
import CharacterIcon from '@/Components/quiz-application/japanese-lines/atoms/CharacterIcon.vue'
import JapaneseLines from '@/Components/quiz-application/japanese-lines/organisms/JapaneseLines.vue'
import EnglishLines from '@/Components/quiz-application/english-lines/organisms/EnglishLines.vue'
import EnglishBoxese from '@/Components/quiz-application/english-boxes/organisms/EnglishBoxese.vue'
import LineQuizCountDownTimerBase from '@/Components/line-quiz-countdown-timer/organisms/LineQuizCountDownTimers/LineQuizCountDownTimerBase.vue'
import Stamp from '@/Components/quiz-application/japanese-lines/atoms/Stamp.vue'
import type { Feeling } from '@/types/Feeling'
import Correct from '~/correct.png'
import Incorrect from '~/incorrect.png'
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
const reversedTextObjects = ref([])

const colors = [
    { color: 'red', index: 0 },
    { color: 'cornflower-blue', index: 1 },
    { color: 'spicy-pink', index: 2 },
    { color: 'yellow', index: 3 },
    { color: 'flirt', index: 4 },
    { color: 'web-orange', index: 5 },
    { color: 'pink', index: 6 },
    { color: 'mexican-red', index: 7 },
    { color: 'dusty-gray', index: 8 },
    { color: 'white', index: 9 },
    { color: 'cyan-aqua', index: 10 },
    { color: 'magenta-fuchsia', index: 11 },
    { color: 'green', index: 12 },
    { color: 'tall-poppy', index: 13 },
    { color: 'blue-bell', index: 14 },
    { color: 'olive', index: 15 },
    { color: 'teal', index: 16 },
    { color: 'lavender-magentao', index: 17 },
    { color: 'purple-heart', index: 18 },
    { color: 'gold', index: 19 },
    { color: 'silver', index: 20 },
    { color: 'brandy-punch', index: 21 },
    { color: 'coral', index: 22 },
    { color: 'salmon', index: 23 },
    { color: 'khaki', index: 24 },
    { color: 'moon-raker', index: 25 },
    { color: 'peach', index: 26 },
    { color: 'light-orchi', index: 27 },
    { color: 'orchid', index: 28 },
    { color: 'mint-green', index: 29 }
]

const shuffleColorsArray = (array: any[]) => {
    const newArray = array.slice() // 配列のコピーを作成
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
}

const colorsObjects = ref(shuffleColorsArray(colors))

/** ページステート */
const pageState = ref('beforeCount')

/** ページステート */
const showAnswer = ref(false)

/** 選択中した単語のindex配列 */
const selectedWordIndexes = ref([])

/** カウントダウンステート変更 */
const changeCountDownState = (state: string) => {
    pageState.value = state
}

const stampClass = ref('wp-block-image size-large is-resized my-stamp')

/** プレースホルダーのボタンを選択した際の処理
 * ボタンの選択された単語を設定
 * ボタンのステータス（入力済み）に変更
 * 次のプレースホルダーのボタンを選択状態にする
 *
 */
const handleSelectText = ({ boxIndex, nextPlaceholderIndex, buttonWord }) => {
    // ボタンを非活性にする
    textObjects.value = textObjects.value.map((item) => (item.index === boxIndex ? { ...item, disabled: true } : item))

    // ボタンの色を指定
    textObjects.value = textObjects.value.map((textObject) =>
        textObject.status === 'selected' ? { ...textObject, selectedColorIndex: boxIndex } : textObject
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
    selectedWordIndexes.value.push(boxIndex)

    // textObjects の中で一つも textObject.selectedWord が true であり、かつ textObject.type が 'placeholder' であるものがないことを判定
    if (!textObjects.value.some((textObject) => textObject.selectedWord === '' && textObject.type === 'placeholder')) {
        showAnswer.value = true
        stampClass.value = 'wp-block-image size-large is-resized my-stamp my-stamp-on'
    }
}

const handleReset = ({ boxIndex }) => {
    // ボタンを活性にする
    textObjects.value = textObjects.value.map((item) => (item.index === boxIndex ? { ...item, disabled: false } : item))

    // 現在のアイテムを取得
    reversedTextObjects.value = [...textObjects.value].reverse()
    const currentItem = reversedTextObjects.value.find((item) => item.status === 'filled')

    // 次の選択肢（プレースホルダー）を取得
    const neXtItem = textObjects.value.find((item) => currentItem.index < item.index && item.type === 'placeholder')

    // 取り消しボタン押下した単語の箇所を再選択状態にする
    textObjects.value = textObjects.value.map((item) =>
        item.index === currentItem.index ? { ...item, selectedWord: '', status: 'selected' } : item
    )

    // 取り消しボタン押下した次の単語の箇所を未選択状態にする
    textObjects.value = textObjects.value.map((item) =>
        item.index === neXtItem.index ? { ...item, status: 'unselected' } : item
    )

    // selectedWordIndexes.value の最後の値を取得
    const lastIndex = selectedWordIndexes.value[selectedWordIndexes.value.length - 1]

    // selectedWordIndexes.value の最後の値を非活性にする
    textObjects.value = textObjects.value.map((item) =>
        item.index === lastIndex.index ? { ...item, disabled: 'true' } : item
    )

    // selectedWordIndexes.value の最後の値を除去
    selectedWordIndexes.value.pop()

    // selectedWordIndexes.value の最後の値（除去したので一つ前）の値を活性化させる
    textObjects.value = textObjects.value.map((item) =>
        item.index === lastIndex.index ? { ...item, disabled: 'false' } : item
    )
}

const checkAnswers = computed(() => {
    if (!showAnswer.value) return null
    let allMatch = true
    textObjects.value.forEach((textObject) => {
        if (textObject.type === 'placeholder' && textObject.selectedWord !== textObject.word) {
            allMatch = false
        }
    })
    return allMatch
})
</script>

<template>
    <div class="wrap">
        <!-- 日本語 -->
        <div class="content japanese-lines row">
            <div class="character-icon row col-6 col-md-4">
                <CharacterIcon />
            </div>
            <div v-show="isScreenMiddle" class="col-4 position-relative">
                <LineQuizCountDownTimerBase :max="5" @changeCountDownState="changeCountDownState" />
            </div>
            <div class="japanese-line row col-12 col-md-8 position-relative">
                <div class="stamp-wrapper">
                    <Stamp :showAnswer="showAnswer" :answer="checkAnswers" />
                </div>
                <JapaneseLines :feeling="props.feeling" :japaneseLine="props.japaneseLine" />
                <!-- カウントダウンタイマー -->
                <div v-show="!isScreenMiddle" class="col-2 position-relative">
                    <LineQuizCountDownTimerBase :max="5" @changeCountDownState="changeCountDownState" />
                </div>
            </div>
        </div>
        <!-- 英語 -->
        <div class="content english-lines row">
            <EnglishLines :englishLine="props.englishLine" :colorsObjects="colorsObjects" :textObjects="textObjects" />
        </div>
        <!-- 英語ブロック -->
        <div class="content english-lines-block row">
            <EnglishBoxese
                :textObjects="textObjects"
                :colorsObjects="colorsObjects"
                @select-text="handleSelectText"
                @reset-text="handleReset"
                :selectedWordIndexes="selectedWordIndexes"
            />
        </div>
    </div>
</template>

<style scoped>
.english-lines-block {
    margin-top: 20px;
}

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

.stamp-wrapper {
    position: absolute;
    top: 0;
    right: 0;
}

@media (max-width: 599px) {
    .japanese-lines {
        display: flex;
        justify-content: center;
    }
}

@media (min-width: 600px) {
    .japanese-lines {
        display: flex;
        justify-content: flex-start;
    }
}
</style>
