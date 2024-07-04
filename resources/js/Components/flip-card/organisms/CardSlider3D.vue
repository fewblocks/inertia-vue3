<!-- 3Dカードスライダー（コントローラー）コンポーネント -->
<script setup lang="ts">
import FlipCard3D from "@/Components/flip-card/molecules/FlipCard3D.vue";
import { ref, toRaw } from "vue";

/**
 * Props
 * @param { Array } cardData カード情報配列
 */
const props = defineProps({
    cardData: Array,
    default: () => [],
});

/**
 * counterから始まり、countOfArrays数の分だけindex値を基準とした昇順の情報配列を生成する
 * maxCounter数をindex値の上限とする
 * @param {Number} counter
 * @param {Number} maxCounter
 * @param {Number} countOfArrays
 * @param {Array} cardsData
 */
const generateAscData = (counter, maxCounter, countOfArrays, Data) => {
    const result = [];
    countOfArrays.forEach(() => {
        result.push(
            Data[Data.findIndex((cardData) => cardData.id === counter)]
        );
        counter++;
        if (counter > maxCounter) {
            counter = 1;
        }
    });
    return result;
};

const pointer = ref(1);
const maxCounter = toRaw(props.cardData.slice(-1)[0].id);
const cardThreshold = [1, 2, 3, 4, 5, 6];
const cloneCardData = toRaw(props.cardData);

// ここにcloneData を入れると reactiveになる
const items = ref(
    generateAscData(pointer.value, maxCounter, cardThreshold, cloneCardData)
);

/**
 * カードを進める
 */
const next = () => {
    if (pointer.value === maxCounter) {
        pointer.value = 0;
    }
    pointer.value++;
    items.value = generateAscData(
        pointer.value,
        maxCounter,
        cardThreshold,
        cloneCardData
    );
    // 裏返すのを固定したくないなら以下の二行をコメントアウト
    // items.value[0].flip = false
    // items.value[5].flip = false
};

/**
 * カードを戻す
 */
const prev = () => {
    pointer.value--;
    if (pointer.value < 1) {
        pointer.value = maxCounter;
    }
    items.value = generateAscData(
        pointer.value,
        maxCounter,
        cardThreshold,
        cloneCardData
    );
    // 裏返すのを固定したくないなら以下の二行をコメントアウト
    // items.value[0].flip = false
    // items.value[5].flip = false
};
/**
 * 対象のカードをひっくり返す
 */
const flip = () => {
    items.value[4].flip = items.value[4].flip ? false : true;
};
</script>
<template>
    <div class="slider-wrapper">
        <div class="card-slider-3d-wrapper row gx-0 gy-0">
            <!-- フリップカード -->
            <div class="slider-3d col-12 gx-0 gy-0">
                <template v-for="item in items" :key="item.id">
                    <FlipCard3D :ja="item.ja" :en="item.en" :flip="item.flip">
                    </FlipCard3D>
                </template>
            </div>
            <!-- 操作ボタン -->
            <div class="slider-controller">
                <button class="btn btn-primary" v-on:click="next()">
                    進める
                </button>
                <button class="btn btn-primary" v-on:click="prev()">
                    戻す
                </button>
                <button class="btn btn-primary" v-on:click="flip()">
                    ひっくり返す
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (0px <= width <= 576px) {
    .slider-wrapper {
        height: 90%;
        margin-top: 0px;
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
    height: 10%;
    position: absolute;
    bottom: 27px;
}
.slider-3d {
}
</style>
