<!-- @v overview: クイズ後にコレクションを行う画面のコンポーネント -->
<!-- @v complecate: クイズ後にユーザーが起こすアクションがかなり密で書かれている -->
<script setup lang="ts">
/** クイズ後にコレクションを行う画面のコンポーネント */
// TODO: 一問も正解できていないときの考慮ができていないので、対応必要
// というか、そもそも一問も正解できていないとき、その人がどういう人なのか...？
//
//　□ 1問も正解できなかった場合
//	→  backDrop を off
//	→  以下のメッセージを表示
//		・全問不正解!!
//		① ドォーンのスタンプ
//		②To Be Continued　　　　　//　← ①　②　は 3秒かけてゆっくり消える
//		↓
//		再度クイズに挑戦への誘導フェーズへ
//
// □ 正解できた場合
//	→  backDrop を on
//	→  正解した一番上のカードに以下のメッセージを表示
//		・ログインすると、お気に入りのセリフを<br>コレクションできるゥ!!!
//		↓
//		カードコレクションの誘導フェーズへ
//

import { ref, computed, reactive, onMounted } from 'vue'
import HeartIcon from '@/Components/quiz-application/after-quiz/atoms/HeartIcon.vue'
import ToBeContinued from '@/Components/quiz-application/after-quiz/atoms/ToBeContinued.vue'
import RetireAndDoonStamp from '@/Components/quiz-application/after-quiz/atoms/RetireAndDoonStamp.vue'
import QuestionAndAnswerCard from '@/Components/quiz-application/after-quiz/molecules/QuestionAndAnswerCard.vue'
import AddBookMarkIcon from '@/Components/quiz-application/after-quiz/atoms/AddBookMarkIcon.vue'
import FlipCardDemoCopy from '@/Components/flip-card-copy/FlipCardDemoCopy.vue'
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
        has_current_item: boolean
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

/** To Be Continued のアニメーション */
const showToBeContinued = ref(false)
const changeTest = () => {
    showToBeContinued.value = !showToBeContinued.value
}

/** クイズに正解した行の数から算出したカード一覧の高さ */
const computedOverlapHeight = computed(() => {
    return 200 + pickUpCounter.value * 10 + 'px'
})
/** クイズに正解した行の数から算出したカード一覧の左マージン幅 */
const computedLeftMargin = computed(() => {
    return `10% - ${pickUpCounter.value * 10}px`
})

// TODO: Union型で型付け
/** クイズ後の状態、（コレクション前 | コレクション後 | デモ前 | デモ開始ちょうど | デモ中 */
type AfterQuizState = 'beforeCollet' | 'afterCollect' | 'beforeDemo' | 'justInTimeDemo' | 'duaringDemo'
const afterQuizState = ref<AfterQuizState>('beforeCollet')

/** コレクション後の状態に変更 */
const changeAfterQuizState = () => {
    afterQuizState.value = 'afterCollect'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
/** コレクション前の状態に変更 */
const changeBeforeQuizState = () => {
    afterQuizState.value = 'beforeCollet'
}
/** デモ前 -> デモ開始ちょうど -> デモ中状態に変更 */
const changeBeforeDemoToDuaringDemo = () => {
    setTimeout(() => {
        afterQuizState.value = 'beforeDemo'
    }, 1200)
    setTimeout(() => {
        afterQuizState.value = 'justInTimeDemo'
    }, 2000)
    setTimeout(() => {
        afterQuizState.value = 'duaringDemo'
    }, 3000)
}

/** ブックマークアイコンをクリックしたときの処理 */
const handleClick = () => {
    if (
        afterQuizState.value === 'afterCollect' ||
        afterQuizState.value === 'beforeDemo' ||
        afterQuizState.value === 'duaringDemo'
    )
        return
    // コレクション後の状態に変更
    changeAfterQuizState()
    // デモ前 -> デモ開始ちょうど -> デモ中状態に変更
    changeBeforeDemoToDuaringDemo()
}

/**
 * リアクティブなLineの作成
 * props.lines を reactive な変数に格納し、isCorrect, isPickUp, hasCurrentItem プロパティを追加
 */
const reactiveLines = reactive(
    props.lines.map((line) => ({
        ...line,
        isCorrect: props.collectQuizIds.includes(line.id),
        isPickUp: false,
        hasCurrentItem: line.has_current_item
    }))
)

/** pickUp対象のリアクティブなLineの作成 */
const reactivePickUpedLines = computed(() => () => {
    return reactiveLines.filter((line) => line.isPickUp)
})

/** アイコンのクラス名作成 */
const iconClassName = computed(() => (isCorrect: boolean, hasCurrentItem: boolean) => {
    let name = ''
    if (isCorrect) {
        // 正解
        name += 'correct-icon'
    } else {
        // 不正解
        name += 'incorrect-icon'
    }
    if (hasCurrentItem) {
        // コレクション済み
        name += ' has-current-item-icon'
    }
    return name
})
/** ピックアップ対象のカードのクラス名 */
const pickUpCardsClassName = computed(() => () => {
    // コレクション後の場合、回転エフェクトを付ける
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
    // コレクション後の場合、Y軸を下に下がるエフェクトを付ける
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
                // ピックアップ対象のカードインデックス
                // ピックアップ対象のカード数、をそれぞれ追加と削除行う。
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

    const backdrop = document.getElementById('backdrop')

    // 正解したものがあるなら背景を灰色にする
    if (props.collectCounter !== 0) {
        backdrop?.classList.add('modal-backdrop', 'in')
    }

    // backdropをクリックしたときにポップオーバーを閉じる
    backdrop?.addEventListener('click', () => {
        isBackDrop.value = false
        popoverList.forEach((popover) => popover.hide())
    })

    // 正解数がゼロなら
    if (props.collectCounter === 0) {
        // バックドロップをオフ
        isBackDrop.value = false
        // マウント時にtoBeContinuedアニメーションを開始
        showToBeContinued.value = true
        // コレクションもできないので、ページ終盤に移動
        afterQuizState.value = 'duaringDemo'
    }
})

alert('カードのサイズ指定がバグっている 再クイズ誘導のボタンコンポーネント作成')
</script>
<template>
    <div class="w-100 d-flex justify-content-between flex-wrap row py-1 px-1">
        <!-- コレクション前 正解数-->
        <transition name="fade-type-1" mode="out-in">
            <div class="col-12" v-if="afterQuizState === 'beforeCollet'">
                あなたの正解数は{{ `${collectCounter} / 10 ` }}です
            </div>
        </transition>
        <!-- コレクション前 ログイン催促メッセージ-->
        <transition name="fade-type-1" mode="out-in">
            <div class="col-12" v-if="afterQuizState === 'duaringDemo'">
                ログインするとお気に入りのクイズがコレクションできる！！
            </div>
        </transition>

        <!-- TODO: テスト用ボタン -->
        <div>
            <button type="button" class="btn btn-lg" @click="changeTest">a</button>
        </div>

        <!--  再起不能 + ドォーンのスタンプ -->
        <Transition name="gone-type-1">
            <div v-if="showToBeContinued" class="gone">
                <RetireAndDoonStamp :showRetireAndDoon="showToBeContinued" class="stamp-sticky" />
            </div>
        </Transition>

        <!-- #region:クイズ -->
        <!-- コレクション前 クイズカード-->
        <transition name="fade-type-1" mode="out-in">
            <div v-if="afterQuizState === 'beforeCollet'">
                <div class="row w-100">
                    <!-- コレクション前 クイズカードラッパー -->

                    <template v-for="(line, index) in reactiveLines" :key="line.id">
                        <!-- ↓ col-10 左側の要素 カード本体 -->
                        <div class="col-10 d-flex flex-wrap row g-0">
                            <QuestionAndAnswerCard
                                :index="index"
                                :line="line.line"
                                :isCorrect="collectQuizIds.includes(line.id)"
                                :is-after-collection="false"
                                :is-pick-up="line.isPickUp"
                                :has-current-item="line.hasCurrentItem"
                            />
                        </div>
                        <!-- ↓ col-2 右側の要素 ハートアイコン -->
                        <div class="col-2 g-0">
                            <div class="d-flex justify-content-center pt-4">
                                <button
                                    data-container="body"
                                    type="button"
                                    :class="iconClassName(line.isCorrect, line.hasCurrentItem)"
                                    data-bs-placement="right"
                                    data-bs-toggle="popover"
                                    data-bs-title="クイズに正解しました!!"
                                    data-bs-html="true"
                                    data-bs-content="ログインすると、お気に入りのセリフを<br>コレクションできるゥ!!!"
                                    data-animation="true"
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

        <!-- コレクション後 コレクション対象カード-->
        <transition name="fade-type-1" mode="out-in">
            <!-- コレクション対象カードラッパー -->
            <div
                :class="pickUpCardsWrapperClassName()"
                v-if="afterQuizState !== 'beforeCollet' && afterQuizState !== 'duaringDemo'"
            >
                <!-- コレクションカード対象クラス -->
                <div :class="pickUpCardsClassName()">
                    <div class="after-quiz-collection-card">
                        <template v-for="(line, index) in reactivePickUpedLines()" :key="line.id">
                            <template v-if="line.isPickUp">
                                <QuestionAndAnswerCard
                                    :index="index"
                                    :line="line.line"
                                    :isCorrect="collectQuizIds.includes(line.id)"
                                    :is-after-collection="true"
                                    :lastPickUpIndex="pickUpIndexesSorted[pickUpIndexesSorted.length - 1]"
                                    :has-current-item="line.hasCurrentItem"
                                />
                            </template>
                        </template>
                    </div>
                </div>
            </div>
        </transition>

        <!-- コレクション後 フリップカードデモ-->
        <!-- 正解数ゼロなら非表示   -->
        <template v-if="props.collectCounter !== 0">
            <transition name="fade-type-3" mode="out-in">
                <div div v-if="afterQuizState === 'duaringDemo'">
                    <FlipCardDemoCopy :lines="reactiveLines" />
                </div>
            </transition>
        </template>

        <!-- コレクション前、コレクション後 ブックマークアイコン (デモ時には消える) -->
        <div class="w-100 d-flex row justify-content-between g-0" style="position: relative">
            <!-- 空要素 -->
            <transition name="fade-type-1" mode="out-in">
                <div
                    :class="
                        afterQuizState === 'afterCollect' ||
                        afterQuizState === 'beforeDemo' ||
                        afterQuizState === 'justInTimeDemo'
                            ? 'col-0'
                            : 'col-10'
                    "
                ></div>
            </transition>

            <!-- ブックマークアイコン -->
            <transition name="fade-type-2" mode="out-in">
                <!-- 空要素により位置調整 -->
                <div
                    :class="
                        afterQuizState === 'afterCollect' ||
                        afterQuizState === 'beforeDemo' ||
                        afterQuizState === 'justInTimeDemo'
                            ? 'col-12'
                            : 'col-2'
                    "
                    v-if="afterQuizState !== 'duaringDemo'"
                >
                    <!-- ブックマークアイコン -->
                    <AddBookMarkIcon
                        :pickUpCounter="pickUpCounter"
                        :onclick="handleClick"
                        :showLayerText="afterQuizState === 'beforeCollet' || afterQuizState === 'afterCollect'"
                        :showEffect="afterQuizState === 'justInTimeDemo'"
                        :isBounce="afterQuizState === 'beforeCollet'"
                    />
                </div>
            </transition>
        </div>

        <!-- ページ遷移要素 -->
        <div class="w-100 d-flex row justify-content-between g-0">
            <div class="col-5">
                <button type="button" class="btn btn-lg" @click="changeBeforeQuizState">クイズに再挑戦</button>
            </div>
            <div class="col-5">
                <button type="button" class="btn btn-lg">トップに戻る</button>
            </div>
        </div>

        <!-- To Be Continued アニメーション -->
        <div class="col-12 d-flex justify-content-center">
            <transition name="slide-type-1">
                <div v-if="showToBeContinued" class="to-be">
                    <ToBeContinued />
                </div>
            </transition>
        </div>
    </div>

    <!-- バックドロップ -->
    <template v-if="isBackDrop">
        <div id="backdrop" class="modal-backdrop fade show"></div>
    </template>
</template>

<style lang="scss" scoped>
/* スタイルをここに追加 */

.glow {
    filter: drop-shadow(5px 5px 0px $salmon);
    box-shadow: 0px 0px 26px 7px $granny-smith-apple;
}

// カードラッパー要素の高さ
.after-quiz-collection-card-wrapper {
    // クイズに正解した行の数から算出したカード一覧の高さ
    height: v-bind(computedOverlapHeight);
}

// カード要素
.after-quiz-collection-card {
    position: relative;
    height: 100%;
    width: 80%;
    // クイズに正解した行の数から算出したカード一覧の左マージン幅
    margin-left: calc(v-bind(computedLeftMargin));
}

// 正解不正解のライン要素
.correct-line,
.incorrect-line {
    margin: 5px 0;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    align-items: left;
    justify-content: flex-start;
}
.gone {
    opacity: 0;
    pointer-events: none;
}

// トランジションのスタイル (ゆっくりと消えていく)
.gone-type-1-enter-active {
    animation: goneOut 6s forwards;
}
@keyframes goneOut {
    0% {
        display: block;
        opacity: 1;
    }
    50% {
        display: block;
        opacity: 1;
    }
    100% {
        display: none;
        opacity: 0;
    }
}

////////////////////////////

.to-be {
    transform: translateX(-100vw);
}
// トランジションのスタイル（右からスライドして消えていく）
.slide-type-1-enter-active {
    animation: slideInOut 8s forwards;
}

@keyframes slideInOut {
    0% {
        opacity: 0;
        transform: translateX(100vw);
        visibility: visible;
    }

    10% {
        opacity: 0;
        transform: translateX(100vw);
        visibility: visible;
    }
    30% {
        opacity: 0;
        transform: translateX(100vw);
        visibility: visible;
    }
    75% {
        opacity: 0.5;
        transform: translateX(0);
        visibility: visible;
    }
    85% {
        opacity: 0.5;
        transform: translateX(0);
        visibility: visible;
    }
    100% {
        opacity: 0;
        transform: translateX(-100vw);
        visibility: hidden;
    }
}

// トランジションのスタイル1 : 透明度、幅、高さが変化
.fade-type-1-enter-active,
.fade-type-1-leave-active {
    transition:
        opacity 0.5s,
        height 0.5s,
        width 0.5s;
}
.fade-type-1-enter, .fade-type-1-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    height: 0;
    width: 0;
}

// トランジションのスタイル2 : 透明度が変化
.fade-type-2-enter-active,
.fade-type-2-leave-active {
    transition: opacity 0.5s;
}
.fade-type-2-enter, .fade-type-2-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}

// トランジションのスタイル3 : 透明度がとスケールが変化
.fade-type-3-enter-active,
.fade-type-3-leave-active {
    transition:
        opacity 1.5s ease,
        transform 1.5s ease;
}
.fade-type-3-enter-from {
    opacity: 0;
    transform: scale(0.9);
}
.fade-type-3-leave-to {
    opacity: 0;
    transform: scale(1.1);
}

// Y軸下に移動アニメーション
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

// 回転アニメーション
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

// Y軸移動アニメーションと回転アニメーションは同一のクラスに適用すると
// 大きく周回を回りながらのアニメーションになってしまうため、別クラスを作成
.stamp-sticky {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%); // 中央揃え
    z-index: 1000; // 他の要素より前面に表示
}
</style>
