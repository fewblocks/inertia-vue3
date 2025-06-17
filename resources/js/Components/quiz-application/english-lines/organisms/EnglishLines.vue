<!-- @v overview: 英文コンポーネント動的、静的、両方の単語を表示している-->
<script setup lang="ts">
import { ref } from 'vue'
import StaticTextBox from '@/Components/quiz-application/english-lines/organisms/StaticTextBox.vue'
import PlaceholderTextBox from '@/Components/quiz-application/english-lines/organisms/PlaceholderTextBox.vue'

const props = defineProps<{
    // TODO: ちゃんとアプリケーションに則した名前にする
    englishLine?: string
    textObjects: Array<{
        type: 'static' | 'placeholder'
        word: string
        index: number
        status: 'filled' | 'selected' | 'unselected'
        selectedWord: string
        selectedColorIndex: number | null
    }>
    colorsObjects: Array<{ color: string; index: number }>
}>()

/** 共用で使う定数みたいなもの */
const colorsObjects = ref(props.colorsObjects)
</script>

<template>
    <div class="wrapper d-flex">
        <template v-for="(textObject, index) in textObjects" :key="index">
            <!-- 静的英単語 : クイズの対象ではないもの -->
            <template v-if="textObject.type === 'static'">
                <StaticTextBox :text="textObject.word" class="me-2" />
            </template>
            &nbsp;
            <!-- 動的英単語 : クイズの対象 -->
            <template v-if="textObject.type === 'placeholder'">
                <PlaceholderTextBox
                    :index="textObject.index"
                    :status="textObject.status"
                    :selectedWord="textObject.selectedWord"
                    :selectedColorIndex="textObject.selectedColorIndex"
                    class="text me-2"
                    :colorsObjects="colorsObjects"
                />
            </template>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    max-width: 1280px;
    margin-top: auto;
    min-width: 200px;
    min-height: 50px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .character-icon {
        background-color: red;
        max-width: 100%;
        height: auto;
    }
}
</style>
