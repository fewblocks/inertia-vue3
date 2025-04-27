<!-- フリップカードデモコンポーネント -->
<script setup lang="ts">
import CardSlider3D from '@/Components/flip-card-copy/organisms/CardSlider3D.vue'
import CardSlider2D from '@/Components/flip-card-copy/organisms/CardSlider2D.vue'
import { ref } from 'vue'
import axios from 'axios'
import { defineProps } from 'vue'
import SwipeFingerIcon from '@/Components/Learnispirits/atoms/SwipeFingerIcon.vue'

const props = defineProps<{
    lines: {
        // japanese_line: string
        // english_line: string
    }
}>()

const cardData = ref([])
const show = ref(false)

const selectedTab = ref('3d')
const convertToCardFormat = (lines) => {
    return lines
        .filter((item) => item.isCorrect && !item.hasCurrentItem && item.isPickUp)
        .map((item) => ({
            ja: item.line.japanese_line,
            en: item.line.english_line,
            id: item.id,
            flip: false,
            isCorrect: item.isCorrect,
            isPickUp: item.isPickUp,
            hasCurrentItem: item.hasCurrentItem
        }))
}
cardData.value = convertToCardFormat(props.lines)
show.value = true

const tabs = {
    '3d': CardSlider3D,
    '2d': CardSlider2D
}

/** 3D => 2D フリップカード切り替え機構*/
const changeComponent = () => {
    if (selectedTab.value === '3d') {
        selectedTab.value = '2d'
        return
    }
    if (selectedTab.value === '2d') {
        selectedTab.value = '3d'
        return
    }
}
</script>

<template>
    <div class="flip-card-demo-wrapper">
        <div class="flip-card-demo col-12 col-sm-11 col-md-10">
            <template v-if="show">
                <component :is="tabs[selectedTab]" :card-data="cardData"></component>
                <SwipeFingerIcon />
            </template>
            <button class="btn btn-primary" v-on:click="changeComponent">変更</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media (577px <= width) {
    .flip-card-demo {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        height: 400px;
    }
}
@media (0px <= width <= 576px) {
    .flip-card-demo {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        height: 450px;
    }
}
.flip-card-demo-wrapper {
    width: 100%;
    background-color: $jagged-ice;
    padding-top: 30px;
}
</style>
