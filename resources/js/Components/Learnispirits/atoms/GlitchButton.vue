<!-- @v overview: アプリケーションの グリッチアニメーションを内包したボタン-->
<!-- @v complecate: グリッチアニメーションの実装と定期的な更新ロジック -->
<!-- @v tips: グリッチアニメーションの実装と定期的な更新ロジック -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
    lines: {
        grlitchFrontLine: string
        grlitchBackLine: string
    }
    type?: 'positive' | 'negative'
}>()

const isGlitching = ref(false)
const buttonWord = ref(props.lines.grlitchFrontLine)
let glitchInterval: number | null = null

onMounted(() => {
    // 3秒ごとにグリッチエフェクトを開始
    glitchInterval = window.setInterval(() => {
        isGlitching.value = true
        // アニメーション終了後にフラグをリセット（1秒後）
        buttonWord.value = props.lines.grlitchBackLine
        setTimeout(() => {
            buttonWord.value = props.lines.grlitchFrontLine
            isGlitching.value = false
        }, 1000)
    }, 3000)
})

onUnmounted(() => {
    // コンポーネントのアンマウント時にインターバルをクリア
    if (glitchInterval) {
        clearInterval(glitchInterval)
    }
})
</script>

<template>
    <button class="button-49" :class="[{ 'glitch-active ': isGlitching }, props.type || 'positive']" role="button">
        {{ buttonWord }}
    </button>
</template>

<style lang="scss" scoped>
/* CSS */
.button-49,
.button-49:after {
    width: 200px;
    height: 76px;
    line-height: 78px;
    font-size: 20px;
    font-family: 'Bebas Neue', sans-serif;
    border: 0;
    color: #fff;
    letter-spacing: 3px;
    outline: transparent;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

/* Positive (赤系) スタイル */
.button-49.positive {
    background: linear-gradient(45deg, transparent 5%, #ff013c 5%);
    box-shadow: 6px 0px 0px #00e6f6;
}

.button-49.positive:after {
    background: linear-gradient(45deg, transparent 3%, #00e6f6 3%, #00e6f6 5%, #ff013c 5%);
    text-shadow:
        -3px -3px 0px #f8f005,
        3px 3px 0px #00e6f6;
}

/* Negative (青系) スタイル */
.button-49.negative {
    background: linear-gradient(45deg, transparent 5%, #0077ff 5%);
    box-shadow: 6px 0px 0px #ff013c;
}

.button-49.negative:after {
    background: linear-gradient(45deg, transparent 3%, #ff013c 3%, #ff013c 5%, #0077ff 5%);
    text-shadow:
        -3px -3px 0px #f8f005,
        3px 3px 0px #ff013c;
}

.button-49:after {
    --slice-0: inset(50% 50% 50% 50%);
    --slice-1: inset(80% -6px 0 0);
    --slice-2: inset(50% -6px 30% 0);
    --slice-3: inset(10% -6px 85% 0);
    --slice-4: inset(40% -6px 43% 0);
    --slice-5: inset(80% -6px 5% 0);

    content: 'ALTERNATE TEXT';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    clip-path: var(--slice-0);
}

.button-49.glitch-active:after,
.button-49:hover:after {
    animation: 1s glitch;
    animation-timing-function: steps(2, end);
}

@keyframes glitch {
    0% {
        clip-path: var(--slice-1);
        transform: translate(-20px, -10px);
    }
    10% {
        clip-path: var(--slice-3);
        transform: translate(10px, 10px);
    }
    20% {
        clip-path: var(--slice-1);
        transform: translate(-10px, 10px);
    }
    30% {
        clip-path: var(--slice-3);
        transform: translate(0px, 5px);
    }
    40% {
        clip-path: var(--slice-2);
        transform: translate(-5px, 0px);
    }
    50% {
        clip-path: var(--slice-3);
        transform: translate(5px, 0px);
    }
    60% {
        clip-path: var(--slice-4);
        transform: translate(5px, 10px);
    }
    70% {
        clip-path: var(--slice-2);
        transform: translate(-10px, 10px);
    }
    80% {
        clip-path: var(--slice-5);
        transform: translate(20px, -10px);
    }
    90% {
        clip-path: var(--slice-1);
        transform: translate(-10px, 0px);
    }
    100% {
        clip-path: var(--slice-1);
        transform: translate(0);
    }
}

@media (min-width: 768px) {
    .button-49,
    .button-49:after {
        width: 400px;
        height: 86px;
        line-height: 88px;
        font-size: 20px;
    }
}

@media (max-width: 480px) {
    .button-49,
    .button-49:after {
        width: 150px;
        height: 56px;
        line-height: 58px;
        font-size: 15px;
    }
}
</style>
