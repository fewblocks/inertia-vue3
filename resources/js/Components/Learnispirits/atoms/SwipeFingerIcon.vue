<script setup lang="ts">
import swipeFingerImg from '~/swipe-finger-icon.svg'
</script>
<template>
    <div class="swipe-message-board">
        <div class="swipe-finger-wrapper">
            <img class="swipe-finger-img" :src="swipeFingerImg" />
        </div>
        <div class="swipe-finger-text">
            <p>Swipe!!</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.swipe-message-board {
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
}
.swipe-finger-img {
    width: 50px;
    height: 50px;
}
.swipe-finger-text {
    font-size: 1.2rem;
    font-weight: bold;
    color: #000;
    margin-top: 10px;
}
.swipe-finger-text p {
    margin: 0;
}

.swipe-finger-wrapper {
    animation: swaying 5s ease-in-out;
    animation-iteration-count: infinite; // 無限に繰り返し
    animation-delay: 0s; // 初期遅延なし
    animation-direction: normal; // 通常の方向に実行
}

@keyframes swaying {
    0%,
    80%,
    100% {
        // 80%の時間は静止状態
        transform: translateX(0);
    }
    85% {
        // 85%の時点で左に移動
        transform: translateX(-20px);
    }
    90% {
        // 90%の時点で右に移動
        transform: translateX(20px);
    }
    95% {
        // 95%で中央に戻る
        transform: translateX(0);
    }
}
</style>
