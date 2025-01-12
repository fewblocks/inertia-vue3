<script setup lang="ts">
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'

const props = defineProps<{
    pickUpCounter?: number
    showLayerText?: boolean
    showEffect?: boolean
}>()
const fontWrappperClassName = computed(() => {
    let name = ''
    props.showEffect ? (name = 'font-wrapper site') : (name = 'font-wrapper bounce-text')
    return name
})

const iconWrappperClassName = computed(() => {
    let name = ''
    props.showLayerText ? (name = 'icon-wrapper') : (name = 'icon-wrapper-without-counter')
    return name
})

const iconClass = computed(() => {
    let name = ''
    props.showEffect ? (name = 'fa-5x bookmark-icon effect-icon') : (name = 'fa-5x bookmark-icon')
    return name
})

const particlesClass = computed(() => {
    let name = ''
    props.showEffect ? (name = 'particles effect-perticles') : (name = 'particles')
    return name
})
</script>

<template>
    <div class="d-flex justify-content-center pt-4">
        <div :class="fontWrappperClassName">
            <div :class="iconWrappperClassName">
                <font-awesome-layers :class="iconClass" style="color: #ffd43b" bounce>
                    <font-awesome-icon :icon="['fas', 'star']" />
                    <transition name="fade" mode="out-in">
                        <div v-if="props.showLayerText">
                            <font-awesome-layers-text class="gray8" :counter="true" :value="props.pickUpCounter" />
                        </div>
                    </transition>
                </font-awesome-layers>
            </div>
        </div>
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
:root {
    --primary-color: #ff4757;
    --bg: #f5f5f5;
    --orange: #ff7f50;
    --green: #2ecc71;
    --blue: #3498db;
    --pink: #ff6b81;
    --lime: #00ff00;
}

* {
    margin: 0;
    padding: 0;
}

.site {
    display: flex;
    align-items: center;
    justify-self: center;
    height: 100%;
}

.effect-icon {
    animation: scale 1s 0.2s;
}

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

.particles {
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-left: 10px;
}

.particles::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: inset 0 0 0 50px #ff4757;
    opacity: 0;
    transform: scale(0);
    transition:
        box-shadow 0.3s 0.2s,
        opacity 0.3s,
        transform 0.3s;
}

.effect-perticles::before {
    box-shadow: inset 0 0 0 0 #ff4757;
    opacity: 1;
    transform: scale(1);
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
    background: #ff4757;
    --item: 1;
}
.particles span:nth-child(2) {
    background: #ff7f50;
    --item: 2;
}
.particles span:nth-child(3) {
    background: #2ecc71;
    --item: 3;
}
.particles span:nth-child(4) {
    background: #3498db;
    --item: 4;
}
.particles span:nth-child(5) {
    background: #ff6b81;
    --item: 5;
}
.particles span:nth-child(6) {
    background: #00ff00;
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
.font-wrapper {
    position: relative;
    width: fit-content;
    color: black;
}

.icon-wrapper,
.icon-wrapper-without-counter {
    position: relative;
    display: inline-block;
}

.icon-wrapper {
    cursor: pointer;
}
.icon-wrapper-without-counter {
    cursor: default;
}

.icon-wrapper::after {
    content: 'click!';
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    color: red; /* 文字の色を指定 */
    pointer-events: none; /* クリックイベントを無視 */
}

.icon-wrapper-without-counter::after {
    content: 'click!';
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    color: red; /* 文字の色を指定 */
    pointer-events: none; /* クリックイベントを無視 */
    opacity: 1;
    -webkit-transition: opacity 500ms;
    transition: opacity 500ms;
}

.icon-wrapper-without-counter:after {
    opacity: 0;
}

// テキストのアニメーション layers-text には効かない ので直接追記
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
