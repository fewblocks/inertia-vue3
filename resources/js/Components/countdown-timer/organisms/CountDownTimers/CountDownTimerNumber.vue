<!-- @v overview: カウントダウンタイマー　ナンバー表示 -->
<!-- @v tips: 文字表示のアニメーション -->
<script setup>
const props = defineProps({
    className: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <span :class="props.className">
        <slot></slot>
    </span>
</template>

<style scoped>
span {
    color: #3498db;
    font-size: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(120deg);
    transform-origin: bottom center;
}

span.pop-in {
    transform: translate(-50%, -50%) rotate(0deg);
    animation: pop-in 0.5s ease-in-out;
}

span.pop-out {
    animation: pop-out 0.5s ease-in-out;
}

@keyframes pop-in {
    0% {
        transform: translate(-50%, -50%) rotate(120deg);
    }
    30% {
        transform: translate(-50%, -50%) rotate(-20deg);
    }
    60% {
        transform: translate(-50%, -50%) rotate(10deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
}

@keyframes pop-out {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    60% {
        transform: translate(-50%, -50%) rotate(20deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(-120deg);
    }
}
</style>
