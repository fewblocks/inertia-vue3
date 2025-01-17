<script setup lang="ts">
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'

const props = defineProps<{
    pickUpCounter?: number
    showLayerText?: boolean
    showEffect?: boolean
    isBounce?: boolean
}>()

/** アイコンのラッパーのラッパーのクラス名 */
const iconWrappperWrapperClassName = computed(() => {
    // バウンスエフェクトを付けるかどうか
    let name = ''
    !props.isBounce ? (name = 'icon-wrapper-wrapper') : (name = 'icon-wrapper-wrapper bounce-text')
    return name
})

/** アイコンのラッパーのクラス名 */
const iconWrappperClassName = computed(() => {
    // カウンターを表示するかどうか
    let name = ''
    props.showLayerText ? (name = 'icon-wrapper') : (name = 'icon-wrapper-without-counter')
    return name
})

/** アイコンのクラス名 */
const iconClass = computed(() => {
    // アイコン用のエフェクトを付けるかどうか
    let name = ''
    props.showEffect ? (name = 'fa-5x bookmark-icon effect-icon') : (name = 'fa-5x bookmark-icon')
    return name
})

/** パーティクルのクラス名 */
const particlesClass = computed(() => {
    // パーティクル用のエフェクトを付けるかどうか
    let name = ''
    props.showEffect ? (name = 'particles effect-perticles') : (name = 'particles')
    return name
})
</script>

<template>
    <div class="d-flex justify-content-center pt-4">
        <!-- アイコン本体 -->
        <div :class="iconWrappperWrapperClassName">
            <div :class="iconWrappperClassName">
                <font-awesome-layers :class="iconClass" style="color: #ffd43b">
                    <font-awesome-icon :icon="['fas', 'star']" />
                    <transition name="fade" mode="out-in">
                        <div v-if="props.showLayerText">
                            <font-awesome-layers-text class="gray8" :counter="true" :value="props.pickUpCounter" />
                        </div>
                    </transition>
                </font-awesome-layers>
            </div>
        </div>
        <!-- パーティクル -->
        <div :class="particlesClass">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// パーティクル用の色
:root {
    --primary-color: $red;
    --orange: $coral;
    --green: $malachite;
    --blue: $cyan-aqua;
    --pink: $pink;
    --lime: $green;
}

// 基本スタイル
* {
    margin: 0;
    padding: 0;
}

// ブックマーク用アイコン
.bookmark-icon {
    margin-right: 5px;
}
// エフェクト用のアイコン
.effect-icon {
    animation: scale 1s 0.2s;
}

// スケールアニメーション
@keyframes scale {
    0%,
    100% {
        transform: scale(1);
    }
    25%,
    90% {
        transform: scale(1.5);
    }
}

// パーティクルの基本スタイル
.particles {
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-left: 10px;
}

// パーティクルの疑似要素
.particles::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: inset 0 0 0 50px $mint-green;
    opacity: 0;
    transform: scale(0);
    transition:
        box-shadow 0.3s 0.2s,
        opacity 0.3s,
        transform 0.3s;
}

// エフェクト用のパーティクル
.effect-perticles::before {
    box-shadow: inset 0 0 0 0 $cyan-aqua;
    opacity: 1;
    transform: scale(2);
}
.particles span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform: rotate(calc((360deg / 6) * var(--item))) translateY(80%) scale(0.1);
    opacity: 0;
}

.effect-perticles span {
    animation: particles 1s 0.1s forwards;
}

@keyframes particles {
    0% {
        opacity: 0;
        transform: rotate(calc((360deg / 6) * var(--item))) translateY(0%) scale(0);
    }
    50% {
        opacity: 1;
        transform: rotate(calc((360deg / 6) * var(--item))) translateY(80%) scale(0.1);
    }
    100% {
        transform: rotate(calc((360deg / 6) * var(--item))) translateY(-85%) scale(0);
    }
}

.particles span:nth-child(1) {
    background: $red;
    --item: 1;
}
.particles span:nth-child(2) {
    background: $coral;
    --item: 2;
}
.particles span:nth-child(3) {
    background: $malachite;
    --item: 3;
}
.particles span:nth-child(4) {
    background: $cyan-aqua;
    --item: 4;
}
.particles span:nth-child(5) {
    background: $pink;
    --item: 5;
}
.particles span:nth-child(6) {
    background: $green;
    --item: 6;
}

.particles span::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 75px;
    background-color: inherit;
    border-radius: 50%;
    transform: translate3d(175px, 175px, 0);
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

// フェードインアウトのスタイル(transitionsコンポーネント)
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

// アイコンのラッパーのラッパーのスタイル
.icon-wrapper-wrapper {
    position: relative;
    width: fit-content;
    color: black;
}

// アイコンのラッパーのスタイル
.icon-wrapper,
.icon-wrapper-without-counter {
    position: relative;
    display: inline-block;
}

// ポインターのスタイル（エフェクトが終わると押せなくなる）
.icon-wrapper {
    cursor: pointer;
}
.icon-wrapper-without-counter {
    cursor: default;
}

// アイコン内文字列のスタイル
.icon-wrapper::after {
    content: 'click!';
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    color: $red; /* 文字の色を指定 */
    pointer-events: none; /* クリックイベントを無視 */
}

// アイコン内文字列のスタイル（エフェクトが終わると非表示になる）
.icon-wrapper-without-counter::after {
    content: 'click!';
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    color: $red; /* 文字の色を指定 */
    pointer-events: none; /* クリックイベントを無視 */
    opacity: 1;
    -webkit-transition: opacity 500ms;
    transition: opacity 500ms;
}
.icon-wrapper-without-counter:after {
    opacity: 0;
}

// テキストのアニメーション layers-text には効かないので直接追記
@keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}
.bounce-text {
    animation: bounce 2s infinite;
}
</style>
