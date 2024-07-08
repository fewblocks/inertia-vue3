<!-- 吹き出し（個別） -->
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

/**
 * Props
 * @param { number } id
 * @param { number } top ポジション値 ランダム
 * @param { number } left ポジション値 ランダム
 * @param { string } line 吹き出し用セリフテキスト
 * @param { string } directions 吹き出し位置
 * @param { string } transform 拡大比率 ランダム値
 */
const props = defineProps<{
    id: number;
    top: number;
    left: number;
    line: string;
    directions: string | "right" | "left";
    transform: number;
}>();

/** 表示非表示 */
const show = ref<boolean>(false);

/** ポジション計算値 */
const positions = computed(() => {
    return {
        top: props.top + "%",
        left: props.left + "%",
    };
});

/** ポジション計算値 */
const directions = computed(() => {
    return {
        leftMain: props.directions === "left" ? "15%" : "85%",
        leftSub: props.directions === "left" ? "14%" : "86%",
    };
});

onMounted(() => {
    show.value = true;
});
</script>
<template>
    <!-- 吹き出し -->
    <transition name="slide-fade">
        <div class="speech-balloon" v-if="show">
            <div class="speech-ballon-line">
                {{ $props.line }}
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.speech-balloon {
    position: absolute;
    padding: 0px;
    top: v-bind("positions.top");
    left: v-bind("positions.left");
    background: #ebffff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    border: #b7c1ff solid 3px;
    z-index: v-bind("id * 3");
    transform: scale(v-bind(transform));
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
}

@media (768px <= width) {
    .speech-balloon {
        font-size: 16px;
        width: 250px;
        height: 120px;
    }
}
@media (577px <= width <=768px) {
    .speech-balloon {
        font-size: 12px;
        width: 175px;
        height: 84px;
    }
}
@media (0px <= width <= 576px) {
    .speech-balloon {
        font-size: 10px;
        width: 140px;
        height: 74px;
    }
}

.speech-ballon-line {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: v-bind("id * 3 + 1");
}

.speech-ballon-line:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 19px 14px 0;
    border-color: #ebffff transparent;
    display: block;
    width: 0;
    z-index: v-bind("id * 3 + 2");
    bottom: -19px;
    left: v-bind("directions.leftMain");
}

.speech-ballon-line:before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 23px 18px 0;
    border-color: #b7c1ff transparent;
    display: block;
    width: 0;
    z-index: v-bind("id * 3 + 1");
    bottom: -25px;
    left: v-bind("directions.leftSub");
}
</style>
