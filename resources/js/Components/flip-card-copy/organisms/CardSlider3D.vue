<!-- 3Dカードスライダー（コントローラー）コンポーネント -->
<script setup lang="ts">
import FlipCard3D from '@/Components/flip-card-copy/molecules/FlipCard3D.vue'
import { ref, toRaw } from 'vue'
import { breakpoints } from '@/utils/breakpoints'

/** let mediaQuery = window.matchMedia(`(max-width : ${breakpoints.xs})`); */
const mediaQuerySmall = window.matchMedia(`(max-width : ${breakpoints.sm})`)
const isScreenSmall = ref(mediaQuerySmall.matches)

const touchStartX = ref(0)
const touchEndX = ref(0)
const touchStartY = ref(0) // Y軸の開始位置を追加
const touchEndY = ref(0) // Y軸の終了位置を追加

const handleTouchStart = (e: TouchEvent) => {
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY // Y軸の位置を記録
}

const handleTouchMove = (e: TouchEvent) => {
    touchEndX.value = e.touches[0].clientX
    touchEndY.value = e.touches[0].clientY // Y軸の位置を記録
}

const handleTouchEnd = () => {
    const swipeDistance = touchStartX.value - touchEndX.value
    const swipeVerticalDistance = touchStartY.value - touchEndY.value

    const minSwipeDistance = 50 // スワイプを検知する最小距離

    // 垂直方向のスワイプの方が大きい場合
    if (Math.abs(swipeVerticalDistance) > Math.abs(swipeDistance)) {
        if (Math.abs(swipeVerticalDistance) > minSwipeDistance) {
            flip() // 上下どちらのスワイプでもフリップ
        }
        return
    }

    // 水平方向のスワイプ処理
    if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
            next()
        } else {
            prev()
        }
    }
}

/**
 * Props
 * @param { Array } cardData カード情報配列
 */
const props = defineProps({
    cardData: Array,
    default: () => []
})

/**
 * counterから始まり、昇順の情報配列を生成する
 * maxCounter数をindex値の上限とする
 * @param {Number} counter
 * @param {Number} maxCounter
 * @param {Number} cardThresholdNumber
 * @param {Array} cardsData
 */
const generateAscData = (counter, maxCounter, cardThresholdNumber, Data) => {
    const result = []
    for (let i = 0; i < cardThresholdNumber; i++) {
        if (counter === maxCounter) {
            counter = 0
        }
        if (Data[counter] === undefined) {
        }
        result.push(Data[counter])
        counter++
    }
    return result
}

const pointer = ref(0)
// TODO 一旦正解画面では10枚固定とする
const maxCounter = props.cardData.length
const cardThreshold = props.cardData.length < 5 ? Array(props.cardData.length).fill(0) : Array(6).fill(0)
const cloneCardData = toRaw(props.cardData)

/**  ここにcloneData を入れると reactiveになる */
const items = ref(generateAscData(pointer.value, maxCounter, cardThreshold.length, cloneCardData))
/**
 * カードを進める
 */
const next = () => {
    if (pointer.value === maxCounter) {
        pointer.value = 0
    }
    pointer.value++
    items.value = generateAscData(pointer.value, maxCounter, cardThreshold.length, cloneCardData)
    /**  裏返すのを固定したくないなら以下の二行をコメントアウト */
    /**  items.value[0].flip = false */
    /**  items.value[5].flip = false */
}

/**
 * カードを戻す
 */
const prev = () => {
    pointer.value--
    if (pointer.value < 1) {
        pointer.value = maxCounter
    }
    items.value = generateAscData(pointer.value, maxCounter, cardThreshold.length, cloneCardData)
    /**  裏返すのを固定したくないなら以下の二行をコメントアウト */
    /** items.value[0].flip = false */
    /** items.value[5].flip = false */
}
/**
 * 対象のカードをひっくり返す
 */
const flip = () => {
    let index = 4
    if (cardThreshold.length === 0) {
        index = 0
    }
    if (cardThreshold.length === 1) {
        index = 0
    }
    if (cardThreshold.length === 2) {
        index = 1
    }
    if (cardThreshold.length === 3) {
        index = 1
    }
    if (cardThreshold.length === 4) {
        index = 2
    }
    if (cardThreshold.length === 5) {
        index = 3
    }
    if (cardThreshold.length === 6) {
        index = 4
    }
    items.value[index].flip = items.value[index].flip ? false : true
}
</script>
<template>
    <div class="slider-wrapper">
        <div class="card-slider-3d-wrapper row gx-0 gy-0">
            <!-- フリップカード -->
            <div
                class="slider-3d col-12 gx-0 gy-0"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
            >
                <template v-for="item in items" :key="item.id">
                    <FlipCard3D
                        :ja="item.ja"
                        :en="item.en"
                        :flip="item.flip"
                        :cardLength="cardThreshold.length"
                        :isPickUp="item.isPickUp"
                        :isCorrect="item.isCorrect"
                        :hasCurrentItem="item.hasCurrentItem"
                    >
                    </FlipCard3D>
                </template>
            </div>
            <!-- 操作ボタン -->
            <div class="slider-controller d-flex flex-column gap-2">
                <div class="d-flex gap-2">
                    <button class="btn btn-primary" v-on:click="prev()">←</button>
                    <button class="btn btn-primary" v-on:click="next()">→</button>
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary" v-on:click="flip()">↓</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (0px <= width <= 576px) {
    .slider-wrapper {
        height: 90%;
        margin-top: 0px;
        margin-right: 40px;
    }
}
@media (575px <= width) {
    .slider-wrapper {
        height: 90%;
        margin-top: 90px;
    }
}

.card-slider-3d-wrapper {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 80%;
}
.slider-3d {
    height: 90%;
}

.slider-controller {
    height: 300px;
    width: 90px;
    position: absolute;
    right: 0px;
}
@media (0px <= width <= 576px) {
    .slider-controller {
        top: -40px;
    }
}
@media (577px <= width) {
    .slider-controller {
        top: 0px;
    }
}
</style>
