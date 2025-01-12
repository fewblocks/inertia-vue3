<script setup lang="ts">
import { ref, computed, toRaw, reactive, onMounted, watch } from 'vue'
import OkIcon from '@/Components/quiz-application/after-quiz/atoms/OkIcon.vue'
import MissIcon from '@/Components/quiz-application/after-quiz/atoms/MissIcom.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import HeartIcon from '@/Components/quiz-application/after-quiz/atoms/HeartIcon.vue'
import QuestionAndAnswerCard from '@/Components/quiz-application/after-quiz/molecules/QuestionAndAnswerCard.vue'
import AddBookMarkIcon from '@/Components/quiz-application/after-quiz/atoms/AddBookMarkIcon.vue'
import { Popover } from 'bootstrap'
const props = defineProps<{
    lines: Array<{
        id: number
        character: {
            japanese_name: string
            english_name: string
        }
        line: {
            japanese_line: string
            english_line: string
        }
    }>
    collectQuizIds: Array<number>
    pickUpIndexes?: Array<number>
    collectCounter: number
}>()

/** バックドロップの状態 */
const isBackDrop = ref(true)

/** コレクション対象数カウンター */
const pickUpCounter = ref(0)

/** コレクション対象indexー */
const pickUpIndexes = ref([])
const pickUpIndexesSorted = computed(() => {
    // computedプロパティ内でsortメソッドを直接使用すると、元の配列が変更される可能性があります。
    // これを避けるために、sliceメソッドを使用して配列のコピーを作成してからソートすることをお勧めします。
    return pickUpIndexes.value.slice().sort((a, b) => a - b)
})

/** クイズに正解した行の数から算出したカード一覧の高さ */
const computedOverlapHeight = computed(() => {
    return 200 + pickUpCounter.value * 10 + 'px'
})
/** クイズに正解した行の数から算出したカード一覧の高さ */
const computedLeftMargin = computed(() => {
    return `10% - ${pickUpCounter.value * 10}px`
})

/** クイズ後の状態、（コレクション前 | コレクション後 | デモ前 | デモ中 */
type AfterQuizState = 'beforeCollet' | 'afterCollect' | 'beforeDemo' | 'justInTimeDemo' | 'duaringDemo'
const afterQuizState = ref<AfterQuizState>('beforeCollet')

// TODO: 一旦簡易な関数にしているが、後でリファクタリングする
/** コレクション後の状態に変更 */
const changeAfterQuizState = () => {
    afterQuizState.value = 'afterCollect'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** コレクション前の状態に変更 */
const changeBeforeQuizState = () => {
    afterQuizState.value = 'beforeCollet'
}
/** デモ前の状態に変更 */
const changeBeforeDemo = () => {
    setTimeout(() => {
        afterQuizState.value = 'beforeDemo'
    }, 1000)
    setTimeout(() => {
        afterQuizState.value = 'justInTimeDemo'
    }, 2000)
    setTimeout(() => {
        afterQuizState.value = 'duaringDemo'
    }, 3000)
}

const handleClick = () => {
    if (
        afterQuizState.value === 'afterCollect' ||
        afterQuizState.value === 'beforeDemo' ||
        afterQuizState.value === 'duaringDemo'
    )
        return
    changeAfterQuizState()
    changeBeforeDemo()
}

/**
 * リアクティブなLineの作成
 * 1. lines を reactive な変数に格納し、isCorrect, isPickUp, hasCurrentItem プロパティを追加
 */
const reactiveLines = reactive(
    props.lines.map((line) => ({
        ...line,
        isCorrect: props.collectQuizIds.includes(line.id),
        isPickUp: false,
        hasCurrentItem: false
    }))
)

/** pickUp対象のリアクティブなLineの作成 */
const reactivePickUpedLines = computed(() => () => {
    return reactiveLines.filter((line) => line.isPickUp)
})

/** 正解か不正解かのアイコンのクラス名作成 */
const iconClassName = computed(() => (isCorrect: boolean) => {
    return isCorrect ? 'correct-icon' : 'incorrect-icon'
})
/** ピックアップ対象のカードのクラス名 */
const pickUpCardsClassName = computed(() => () => {
    let name = 'after-quiz-collection-card-wrapper'
    name +=
        afterQuizState.value === 'beforeDemo' ||
        afterQuizState.value === 'justInTimeDemo' ||
        afterQuizState.value === 'duaringDemo'
            ? ' rotateOut'
            : ''
    return name
})
/** ピックアップ対象のカードwrapperのクラス名 */
const pickUpCardsWrapperClassName = computed(() => () => {
    let name = ''
    name +=
        afterQuizState.value === 'beforeDemo' ||
        afterQuizState.value === 'justInTimeDemo' ||
        afterQuizState.value === 'duaringDemo'
            ? ' translateDown'
            : ''
    return name
})

/** 選択（ピックアップ） */
const pickUp = (id: number, index) => {
    reactiveLines.forEach((line) => {
        if (line.isCorrect) {
            if (line.id === id) {
                line.isPickUp = !line.isPickUp
                if (line.isPickUp) {
                    pickUpIndexes.value.push(index)
                    pickUpCounter.value++
                } else {
                    const idx = pickUpIndexes.value.indexOf(index)
                    if (idx !== -1) {
                        pickUpIndexes.value.splice(idx, 1)
                    }
                    pickUpCounter.value--
                }
            }
        }
    })
}

onMounted(() => {
    // ポップオーバーの初期化
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = Array.from(popoverTriggerList).map((popoverTriggerEl) => new Popover(popoverTriggerEl))

    for (let i = 0; i < popoverTriggerList.length; i++) {
        const element = popoverTriggerList[i] as HTMLElement
        if (element.className === 'correct-icon') {
            popoverList[i].show()
            break
        }
    }

    // 背景を灰色にする
    const backdrop = document.getElementById('backdrop')
    backdrop?.classList.add('modal-backdrop', 'in')

    // backdropをクリックしたときにポップオーバーを閉じる
    backdrop?.addEventListener('click', () => {
        isBackDrop.value = false
        popoverList.forEach((popover) => popover.hide())
    })
})

watch(
    () => afterQuizState.value,
    (newValue) => {
        console.log(newValue, 'newValue')
    }
)
</script>
<template>
    <div class="w-100 d-flex justify-content-between flex-wrap row py-1 px-1">
        <!-- コレクション前 -->
        <div class="col-12">あなたの正解数は{{ `${collectCounter} / 10 ` }}です</div>

        <transition name="fade" mode="out-in">
            <div v-if="afterQuizState === 'beforeCollet'">
                <div class="row w-100">
                    <template v-for="(line, index) in reactiveLines" :key="line.id">
                        <!-- ↓ col-10 左側の要素 -->
                        <div class="col-10 d-flex flex-wrap row g-0">
                            <QuestionAndAnswerCard
                                :index="index"
                                :line="line.line"
                                :isCorrect="collectQuizIds.includes(line.id)"
                                :is-overlap="false"
                                :is-after-collection="false"
                            />
                        </div>
                        <!-- ↓ col-2 右側の要素 -->
                        <div class="col-2 g-0">
                            <div class="d-flex justify-content-center pt-4">
                                <button
                                    data-container="body"
                                    type="button"
                                    :class="iconClassName(line.isCorrect)"
                                    data-bs-placement="right"
                                    data-bs-toggle="popover"
                                    data-bs-title="クイズに正解しました!!"
                                    data-bs-html="true"
                                    data-bs-content="ログインすると、お気に入りのセリフを<br>コレクションできるゥ!!!"
                                    :disabled="!isBackDrop"
                                >
                                    <HeartIcon
                                        :isCorrect="line.isCorrect"
                                        :isPickUp="line.isPickUp"
                                        :hasCurrentItem="line.hasCurrentItem"
                                        :shake="line.isPickUp"
                                        @click.native="pickUp(line.id, index)"
                                    />
                                </button>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </transition>

        <!-- コレクション後 -->
        <transition name="fade" mode="out-in">
            <div
                :class="pickUpCardsWrapperClassName()"
                v-if="afterQuizState !== 'beforeCollet' && afterQuizState !== 'duaringDemo'"
            >
                <div :class="pickUpCardsClassName()">
                    <div class="after-quiz-collection-card">
                        <template v-for="(line, index) in reactivePickUpedLines()" :key="line.id">
                            <template v-if="line.isPickUp">
                                <QuestionAndAnswerCard
                                    :index="index"
                                    :line="line.line"
                                    :isCorrect="collectQuizIds.includes(line.id)"
                                    :is-overlap="true"
                                    :is-after-collection="true"
                                    :lastPickUpIndex="pickUpIndexesSorted[pickUpIndexesSorted.length - 1]"
                                />
                            </template>
                        </template>
                    </div>
                </div>
            </div>
        </transition>
        <!-- コレクション後 -->

        <div class="w-100 d-flex row justify-content-between g-0" style="position: relative">
            <!-- 空要素 -->
            <transition name="fade" mode="out-in">
                <div
                    :class="
                        afterQuizState === 'afterCollect' ||
                        afterQuizState === 'beforeDemo' ||
                        afterQuizState === 'justInTimeDemo' ||
                        afterQuizState === 'duaringDemo'
                            ? 'col-0'
                            : 'col-10'
                    "
                ></div>
            </transition>

            <!-- ブックマークアイコン -->
            <transition name="fade" mode="out-in">
                <div
                    :class="
                        afterQuizState === 'afterCollect' ||
                        afterQuizState === 'beforeDemo' ||
                        afterQuizState === 'justInTimeDemo' ||
                        afterQuizState === 'duaringDemo'
                            ? 'col-12'
                            : 'col-2'
                    "
                >
                    <AddBookMarkIcon
                        :pickUpCounter="pickUpCounter"
                        :onclick="handleClick"
                        :showLayerText="afterQuizState === 'beforeCollet' || afterQuizState === 'afterCollect'"
                        :showEffect="afterQuizState === 'justInTimeDemo' || afterQuizState === 'duaringDemo'"
                    />
                </div>
            </transition>
        </div>
        <div class="w-100 d-flex row justify-content-between g-0">
            <div class="col-5">
                <button type="button" class="btn btn-lg" @click="changeBeforeQuizState">クイズに再挑戦</button>
            </div>
            <div class="col-5">
                <button type="button" class="btn btn-lg">トップに戻る</button>
            </div>
        </div>
    </div>

    <template v-if="isBackDrop">
        <div id="backdrop" class="modal-backdrop fade show"></div>
    </template>
</template>

<style lang="scss" scoped>
/* スタイルをここに追加 */

.font-wrapper {
    position: relative;
}

.question-index {
    font-size: 1.5rem;
    font-weight: bold;
}

.question-text {
    font-size: 1.5rem;
}

.dottedText:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:
        radial-gradient(circle, transparent 50%, transparent 50%),
        radial-gradient(circle, transparent 20%, white 50%) 30px 30px;
    background-size: 4px 4px;
}

.after-quiz-collection-card-wrapper {
    height: v-bind(computedOverlapHeight);
}

.after-quiz-collection-card {
    position: relative;
    height: 100%;
    width: 80%;
    margin-left: calc(v-bind(computedLeftMargin));
}

.correct-line,
.incorrect-line {
    margin: 5px 0;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    align-items: left;
    justify-content: flex-start;
}

.correct-line {
    background-color: green;
}
.incorrect-line {
    background-color: red;
}

.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.5s,
        height 0.5s,
        width 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    height: 0;
    width: 0;
}

.translateDown {
    -webkit-animation-name: rotateDown1;
    animation-name: rotateDown1;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    overflow: hidden;
}

@-webkit-keyframes rotateDown1 {
    0% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
    }

    100% {
        -webkit-transform: translateY(200px);
        transform: translateY(200px);
    }
}

@keyframes rotateDown1 {
    0% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
    }

    100% {
        -webkit-transform: translateY(200px);
        transform: translateY(200px);
    }
}

.rotateOut {
    -webkit-animation-name: rotateOut1;
    animation-name: rotateOut1;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    overflow: hidden;
}

@-webkit-keyframes rotateOut1 {
    0% {
        opacity: 1;
    }

    100% {
        -webkit-transform: rotate(1024deg) scale(0.1);
        transform: rotate(1024deg) scale(0.1);
        opacity: 0;
    }
}

@keyframes rotateOut1 {
    0% {
        opacity: 1;
    }

    100% {
        -webkit-transform: rotate(1024deg) scale(0.1);
        transform: rotate(1024deg) scale(0.1);
        opacity: 0;
    }
}
</style>
