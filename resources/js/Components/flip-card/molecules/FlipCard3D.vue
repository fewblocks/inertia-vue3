<!-- @v overview: TODO課題多数！3Dフリップカード(個別)コンポーネント -->
<script setup lang="ts">
import { breakpoints } from '@/utils/breakpoints'
import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Props
 * @param { String } ja 日本語
 * @param { String } en 英語
 * @param { Boolean } flip 裏返しフラグ
 */
const props = defineProps({
    ja: String,
    en: String,
    flip: Boolean
})

/**  TODO: タイプファイル別切り出し */
type Breakpoints = keyof typeof breakpoints // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
/**  メディアクエリーの判別値(windowオブジェクト) */
/** let mediaQuery = window.matchMedia(`(max-width : ${breakpoints.xs})`); */
const mediaQuerySmall = window.matchMedia(`(max-width : ${breakpoints.sm})`)
const isScreenSmall = ref(mediaQuerySmall.matches)
const mediaQueryMedium = window.matchMedia(`(max-width : ${breakpoints.md})`)
const isScreenMedium = ref(mediaQueryMedium.matches)
const mediaQueryLarge = window.matchMedia(`(max-width : ${breakpoints.lg})`)
const isScreenLarge = ref(mediaQueryLarge.matches)

/**  カードサイズ判定 */
/**  const cardWidth = computed(() => (isScreenSmall.value ? "168px" : "240px")); */
/**  const cardHeight = computed(() => (isScreenSmall.value ? "112px" : "160px")); */

/**  TODO: ひどすぎるので書き直す */
/** カード幅算出。メディアクエリー依存 */
const cardWidth = computed(() => {
    if (isScreenSmall.value) {
        return '168px'
    } else if (isScreenMedium.value) {
        return '192px'
    } else if (isScreenLarge.value) {
        return '276px'
    } else {
        return '360px'
    }
})
/** カード高さ算出。メディアクエリー依存 */
const cardHeight = computed(() => {
    if (isScreenSmall.value) {
        return '112px'
    } else if (isScreenMedium.value) {
        return '128px'
    } else if (isScreenLarge.value) {
        return '184px'
    } else {
        return '240px'
    }
})

/** カード間隔判定。メディアクエリー依存 */
const cardBetween = (times: number, isScreenSmall: boolean) => {
    if (isScreenSmall) {
        return 32 * times + 'px'
    } else {
        return 50 * times + 'px'
    }
}

/**  windowオブジェクトにリスナーを設定（メディアクエリー判別値随時更新） */
const updateSmall = (event: { matches: boolean }) => (isScreenSmall.value = event.matches)
const updateMedium = (event: { matches: boolean }) => (isScreenMedium.value = event.matches)
const updateLarge = (event: { matches: boolean }) => (isScreenLarge.value = event.matches)
onMounted(() => mediaQuerySmall.addEventListener('change', updateSmall))
onUnmounted(() => mediaQuerySmall.removeEventListener('change', updateSmall))
onMounted(() => mediaQueryMedium.addEventListener('change', updateMedium))
onUnmounted(() => mediaQueryMedium.removeEventListener('change', updateMedium))
onMounted(() => mediaQueryLarge.addEventListener('change', updateLarge))
onUnmounted(() => mediaQueryLarge.removeEventListener('change', updateLarge))

/**
 * カードのクラス値。 親コンポーネントからの flip のフラグ値にて算出
 */
const flipClass = computed(() => {
    return props.flip ? 'flip-card-inner flip-card-backback' : 'flip-card-inner'
})
</script>

<!-- フリップカード -->
<template>
    <div class="flip-card">
        <div :class="flipClass">
            <div class="flip-card-front">{{ props.ja }}</div>
            <div class="flip-card-back">{{ props.en }}</div>
        </div>
    </div>
</template>

<style scoped>
.flip-card {
    position: absolute;
    background-color: transparent;
    width: v-bind(cardWidth);
    height: v-bind(cardHeight);
    -webkit-transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    -webkit-transition: 0.9s;
    transition: 0.9s;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
}

.flip-card-front {
    background-color: #bbb;
}

/* 5枚目だけアニメーションを付ける */
.flip-card:nth-of-type(5) .flip-card-front {
    background: linear-gradient(110deg, #bbbbbb 8%, #f5f5f5 18%, #bbbbbb 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 2s shine linear infinite;
}
@keyframes shine {
    to {
        background-position-x: -200%;
    }
}

.flip-card-back {
    background-color: dodgerblue;
    transform: rotateX(180deg);
}

.flip-card:nth-of-type(1) {
    top: 0px;
    left: 0px;
    opacity: 0;
}

.flip-card:nth-of-type(2) {
    top: 10px;
    left: v-bind(cardBetween(2, isScreenSmall));
    opacity: 0.4;
}

.flip-card:nth-of-type(3) {
    top: 20px;
    left: v-bind(cardBetween(3, isScreenSmall));
    opacity: 0.6;
}

.flip-card:nth-of-type(4) {
    top: 30px;
    left: v-bind(cardBetween(4, isScreenSmall));
    opacity: 0.8;
}

.flip-card:nth-of-type(5) {
    top: 40px;
    left: v-bind(cardBetween(5, isScreenSmall));
    opacity: 1;
    -webkit-transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
    transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
}

.flip-card:nth-of-type(6) {
    top: 50px;
    left: v-bind(cardBetween(6, isScreenSmall));
    opacity: 0;
    -webkit-transform: skew(-40deg) rotate(-40deg) rotateX(-40deg) rotateY(-40deg) perspective(200px);
    transform: skew(-40deg) rotate(-40deg) rotateX(-40deg) rotateY(-40deg) perspective(200px);
}

.flip-card-backback {
    -webkit-transform: rotateX(180deg);
    transform: rotateX(180deg);
}
</style>
