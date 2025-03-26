<script setup lang="ts">
import { computed, onMounted, onUnmounted, Ref, ref, watch } from 'vue'
import { breakpoints } from '@/utils/breakpoints'
import CharacterIcon from '@/Components/quiz-application/japanese-lines/atoms/CharacterIcon.vue'
import JapaneseLines from '@/Components/quiz-application/japanese-lines/organisms/JapaneseLines.vue'
import StickyJapaneseLines from '@/Components/quiz-application/japanese-lines/organisms/StickyJapaneseLines.vue'
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

const update = (event: { matches: boolean }) => (isScreenMiddle.value = event.matches)

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
    /** 難易度 */
    difficulty?: string
    /** 制限時間 */
    timeLimit?: number
}>()

const toShowElement: Ref<HTMLElement | null> = ref(null)
const toHideElement: Ref<HTMLElement | null> = ref(null)
const isButtonActive = ref(false)
const isStickyJapaneseLine = ref(false)

const topObserverCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
        if (entry.target === toHideElement.value) {
            // 要素が見えなくなったとき（!isIntersecting）に true
            isStickyJapaneseLine.value = !entry.isIntersecting
        }
    })
}

const bottomObserverCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
        if (entry.target === toShowElement.value) {
            isButtonActive.value = entry.isIntersecting
            isStickyJapaneseLine.value = false
        }
    })
}
let topObserver: IntersectionObserver | null = null
let bottomObserver: IntersectionObserver | null = null

onMounted(() => {
    /** windowオブジェクトにリスナーを設定（メディアクエリー判別値随時更新）*/
    mediaQuery.addEventListener('change', update)

    /** スクロール監視用のオブサーバー配置 */
    if (toHideElement.value instanceof Element) {
        topObserver = new IntersectionObserver(topObserverCallback, {
            root: null,
            threshold: 0 // 要素が完全に見えなくなった時点で判定
        })
        topObserver.observe(toHideElement.value)
    }

    if (toShowElement.value instanceof Element) {
        bottomObserver = new IntersectionObserver(bottomObserverCallback, {
            root: null,
            threshold: 0 // 要素が見え始めた時点で判定
        })
        bottomObserver.observe(toShowElement.value)
    }
})

onUnmounted(() => {
    mediaQuery.removeEventListener('change', update)
    topObserver?.disconnect()
    bottomObserver?.disconnect()
})

const buttonClickHandler = (): void => {
    alert('ボタンが活性化され、クリックされました！')
}

/** 難易度 */
const difficulty = ref(props.difficulty) // "high", "medium", "low" のいずれか

/**  TODO: 仮の値（日本語文）*/
/**  文章分割処理結果取得 「文章全部」「難易度」 */
// const { resultArray } = useSentenceSplitter(props.englishLine, difficulty)
// /** テキストオブジェクツ */
// const text   Objects = ref(resultArray)

/** テキストオブジェクツ */
const textObjects = ref(useSentenceSplitter(props.englishLine, props.difficulty).resultArray)

// props.difficulty または props.englishLine が変更されたときに textObjects を更新
watch([difficulty, () => props.englishLine], ([newDifficulty, newEnglishLine]) => {
    textObjects.value = useSentenceSplitter(newEnglishLine, newDifficulty).resultArray.value
})

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
        <!-- スクロール前 -->
        <div v-show="isStickyJapaneseLine" ref="toShowElement" class="h-1">{{ isButtonActive }}</div>
        <div v-show="!isStickyJapaneseLine" class="content japanese-lines row">
            <div class="character-icon row col-6 col-md-4">
                <CharacterIcon />
            </div>
            <!-- v-if だと再レンダリングされ、カウンターもリセットされる -->
            <div v-show="isScreenMiddle" class="col-4 position-relative">
                <LineQuizCountDownTimerBase
                    :max="props.timeLimit"
                    :isActionWithCountDownEnd="true"
                    :intercept="intercept"
                    @changeCountDownState="changeCountDownState"
                />
                <Stamp :showAnswer="showAnswer" :answer="checkAnswers" class="stamp-sticky" />
            </div>
            <div class="japanese-line row col-12 col-md-8 position-relative">
                <div class="stamp-wrapper"></div>
                <JapaneseLines :feeling="props.feeling" :japaneseLine="props.japaneseLine" />
                <!-- カウントダウンタイマー -->
                <div v-show="!isScreenMiddle" class="col-2 position-relative">
                    <LineQuizCountDownTimerBase
                        :max="props.timeLimit"
                        :isActionWithCountDownEnd="true"
                        :intercept="intercept"
                        @changeCountDownState="changeCountDownState"
                    />
                    <div>
                        <Stamp :showAnswer="showAnswer" :answer="checkAnswers" class="stamp" />
                    </div>
                </div>
            </div>
        </div>
        <div v-show="!isStickyJapaneseLine" class="top-element" ref="toHideElement"></div>

        <!-- TODO　カウントダウンタイマー左寄せ　+　縮小 -->
        <!-- スタンプ正常化 -->

        <!-- スクロール後 -->
        <div v-show="isStickyJapaneseLine" class="sticky-lines">
            <!-- カウントダウンタイマー -->
            <div v-show="isScreenMiddle" class="col-2 position-relative">
                <div class="count-down-timer-right">
                    <LineQuizCountDownTimerBase
                        :max="props.timeLimit"
                        :isActionWithCountDownEnd="true"
                        :intercept="intercept"
                        @changeCountDownState="changeCountDownState"
                    />
                </div>
                <Stamp :showAnswer="showAnswer" :answer="checkAnswers" class="stamp" />
            </div>

            <div class="line-flex low col-12">
                <transition name="slide-fade" mode="out-in" appear>
                    <StickyJapaneseLines
                        v-show="isStickyJapaneseLine"
                        :feeling="props.feeling"
                        :japaneseLine="props.japaneseLine"
                    />
                </transition>
                <!-- カウントダウンタイマー -->
                <div v-show="!isScreenMiddle" class="col-2 position-relative">
                    <LineQuizCountDownTimerBase
                        :max="props.timeLimit"
                        :isActionWithCountDownEnd="true"
                        :intercept="intercept"
                        @changeCountDownState="changeCountDownState"
                    />

                    <div>
                        <Stamp :showAnswer="showAnswer" :answer="checkAnswers" class="stamp" />
                    </div>
                </div>
            </div>

            <div v-show="isStickyJapaneseLine" class="content english-lines row">
                <EnglishLines
                    :englishLine="props.englishLine"
                    :colorsObjects="colorsObjects"
                    :textObjects="textObjects"
                />
            </div>
            <div v-show="isStickyJapaneseLine" class="content english-lines-block row">
                <EnglishBoxese
                    :textObjects="textObjects"
                    :colorsObjects="colorsObjects"
                    @select-text="handleSelectText"
                    @reset-text="resetText"
                    :selectedWordIndexes="selectedWordIndexes"
                />
            </div>
        </div>
        <!-- 英語 -->
        <div v-show="!isStickyJapaneseLine" class="content english-lines row">
            <EnglishLines :englishLine="props.englishLine" :colorsObjects="colorsObjects" :textObjects="textObjects" />
        </div>
        <!-- 英語ブロック -->
        <div v-show="!isStickyJapaneseLine" class="content english-lines-block row">
            <EnglishBoxese
                :textObjects="textObjects"
                :colorsObjects="colorsObjects"
                @select-text="handleSelectText"
                @reset-text="resetText"
                :selectedWordIndexes="selectedWordIndexes"
            />
        </div>
        <!-- 親要素の最下部を検出するための要素 -->
        <div style="height: 400px">.</div>
    </div>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active {
    transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
    transform: translateY(0);
    opacity: 1;
}
.english-lines-block {
    margin-top: 20px;
}

.line-flex {
    display: flex;
    justify-content: flex-start;
}

main-content {
    background-color: #ffcc27;
}

.wrap {
    width: 100%;
}
.top-element {
    width: 100%;
    height: 10px;
}
.content {
    width: 100%;
}

.japanese-line {
    display: flex;
    justify-content: flex-start;
}

.count-down-timer-right {
    position: fixed;
    top: 10%;
    left: 90%;
    transform: scale(0.5, 0.5); //
    opacity: 0.7;
    z-index: 1000; // 他の要素より前面に表示
}

.sticky-lines {
    position: -webkit-sticky;
    position: sticky;
    top: 100px;
}

.stamp {
    position: fixed;
    top: 20%;
    left: 80%;
    transform: translate(-50%, -50%); // 中央揃え
    z-index: 1000; // 他の要素より前面に表示
}

.stamp-sticky {
    position: fixed;
    top: 20%;
    left: 80%;
    transform: translate(-50%, -50%); // 中央揃え
    z-index: 1000; // 他の要素より前面に表示
}

.stamp2 {
    position: fixed;
    top: 20%;
    left: 80%;
    transform: translate(-50%, -50%); // 中央揃え
    z-index: 1000; // 他の要素より前面に表示
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
