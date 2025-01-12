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
import { colors } from '@/constants'
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
    /** クイズIndex */
    quizIndex?: number
    /** クイズId */
    quizId?: number
}>()

/** 難易度 */
const difficulty = 'medium' // "high", "medium", "low" のいずれか

/**  TODO: 仮の値（日本語文）*/
/**  文章分割処理結果取得 「文章全部」「難易度」 */
const { resultArray } = useSentenceSplitter(props.englishLine, difficulty)
resultArray.value
/** テキストオブジェクツ */
const textObjects = ref(resultArray)
/** テキストオブジェクツを逆順にしたもの */
const reversedTextObjects = ref([])

/** 割り込み（カウントダウン停止） */
const intercept = ref(false)

/** カラー配列シャッフル */
const shuffleColorsArray = (array: any[]) => {
    const newArray = array.slice() // 配列のコピーを作成
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
}

/** カラーオブジェクト */
const colorsObjects = ref(shuffleColorsArray(colors))

/** 答え表示 */
const showAnswer = ref(false)

/** 選択中した単語のindex配列 */
const selectedWordIndexes = ref([])

// ページの状態変化
const emit = defineEmits(['changePageState', 'collect'])

/** ページの状態変化(カウントダウンに終了に伴うもの) */
const changeCountDownState = (state) => {
    if (state === 'countDownEnd') {
        // スタンプ表示（不正解のスタンプを押す不正解のスタンプが押される)
        showAnswer.value = true
        stampClass.value = 'wp-block-image size-large is-resized my-stamp my-stamp-on'
        // 1秒後に伝播
        setTimeout(() => {
            emit('changePageState', {
                state: 'countDownEnd'
            })
        }, 1000)
    }
}

/** ページの状態変化(正解、不正解発覚時に伴うもの) */
const changeCorrectState = () => {
    // 割り込み（カウントダウン停止）
    intercept.value = true
    // 1秒後に伝播
    setTimeout(() => {
        // 割り込み（カウントダウン最下位）
        intercept.value = false
        emit('changePageState', {
            state: 'countDownEnd'
        })
    }, 1000)
}

const stampClass = ref('wp-block-image size-large is-resized my-stamp')

/**
 * プレースホルダーのボタンを選択した際の処理
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
        changeCorrectState()
    }
}

//** 単語の選び直しの処理 */
const resetText = ({ boxIndex }) => {
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

//** 答え合わせ */
const checkAnswers = computed(() => {
    if (!showAnswer.value) return null
    let allMatch = true
    textObjects.value.forEach((textObject) => {
        if (textObject.type === 'placeholder' && textObject.selectedWord !== textObject.word) {
            allMatch = false
        }
    })
    // 正解の場合、伝播
    if (allMatch) {
        setTimeout(() => {
            emit('collect', {
                isCollect: true,
                quizIndex: props.quizIndex,
                quizId: props.quizId
            })
        }, 500)
    }
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
            <!-- v-if だと再レンダリングされ、カウンターもリセットされる -->
            <div v-show="isScreenMiddle" class="col-4 position-relative">
                <LineQuizCountDownTimerBase
                    :max="15"
                    :isActionWithCountDownEnd="true"
                    :intercept="intercept"
                    @changeCountDownState="changeCountDownState"
                />
                <Stamp :showAnswer="showAnswer" :answer="checkAnswers" />
            </div>
            <div class="japanese-line row col-12 col-md-8 position-relative">
                <div class="stamp-wrapper"></div>
                <JapaneseLines :feeling="props.feeling" :japaneseLine="props.japaneseLine" />
                <!-- カウントダウンタイマー -->
                <div v-show="!isScreenMiddle" class="col-2 position-relative">
                    <LineQuizCountDownTimerBase
                        :max="15"
                        :isActionWithCountDownEnd="true"
                        :intercept="intercept"
                        @changeCountDownState="changeCountDownState"
                    />
                    <Stamp :showAnswer="showAnswer" :answer="checkAnswers" />
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
                @reset-text="resetText"
                :selectedWordIndexes="selectedWordIndexes"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
    top: 20%;
    left: 40%;
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
