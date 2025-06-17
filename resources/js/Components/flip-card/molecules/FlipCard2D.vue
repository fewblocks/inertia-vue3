<!-- @v overview: 2Dフリップカード(個別)コンポーネント -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import arrowimg from '~/arrow-icon.svg'

/**
 * Props
 * @param { String } ja 日本語
 * @param { String } en 英語
 * @param { Boolean } flip 裏返しフラグ
 * @param { Number } id カードid
 */
const props = defineProps({
    ja: String,
    en: String,
    flip: Boolean,
    id: Number
})

/**
 * カードのクラス値。 親コンポーネントからの flip のフラグ値にて算出
 */
const flipClass = computed(() => {
    return props.flip ? 'flip-card-inner flip-card-backback' : 'flip-card-inner'
})

/** 呼び出し元へ伝播イベント */
const emit = defineEmits(['change-flip'])

/** カードフリップハンドラー */
const handleCardFlip = () => {
    const flipStatus = props.flip === true ? false : true
    // 呼び出し元へ「cardId」と「flipStatus(裏返っているか否か)」を伝播
    emit('change-flip', { cardId: props.id, fliped: flipStatus })
}
</script>
<template>
    <div class="card">
        <div class="flip-card">
            <div :class="flipClass">
                <!-- フリップカード表面 -->
                <div class="flip-card-front">
                    {{ props.ja }}
                    <img v-on:click="handleCardFlip" class="arrow-img" :src="arrowimg" />
                </div>
                <!-- フリップカード裏面 -->
                <div class="flip-card-back">
                    {{ props.en }}
                    <img v-on:click="handleCardFlip" class="arrow-img" :src="arrowimg" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.arrow-img {
    width: 25px;
    height: 25px;
}

.card {
    position: relative;
    height: fit-content;
    width: 300px;
    height: 200px;
}
.flip-card {
    /* position: absolute; */
    background-color: transparent;
    width: 300px;
    height: 200px;
    /* -webkit-transform: rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px); */
    /* transform: rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px); */
    -webkit-transition: 0.9s;
    transition: 0.9s;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

/* .flip-card:hover .flip-card-inner {
  transform: rotateX(180deg);
} */

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

.flip-card-back {
    background-color: dodgerblue;
    transform: rotateX(180deg);
}

.flip-card-backback {
    -webkit-transform: rotateX(180deg);
    transform: rotateX(180deg);
}
</style>
