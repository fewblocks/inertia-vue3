<script setup lang="ts">
import { Reactive } from 'vue'
import { useSentenceSplitter } from '@/Composable/useSentenceSplitter'
import StaticTextBox from '@/Components/quiz-application/english-lines/organisms/StaticTextBox.vue'
import PlaceholderTextBox from '@/Components/quiz-application/english-lines/organisms/PlaceholderTextBox.vue'

const props = defineProps<{
    // 英文
    englishLine?: string
}>()

// 仮の値（英文テキスト）
const sentence = 'This is a sample sentence for the quiz'
// 難易度
const difficulty = 'medium' // "high", "medium", "low" のいずれか

const { resultArray: textObjects } = useSentenceSplitter(sentence, difficulty)
</script>

<template>
    <div clsss="wrapper d-flex">
        <template v-for="(textObject, index) in textObjects" :key="index">
            <template v-if="textObject.type === 'static'">
                <StaticTextBox :text="textObject.word" class="me-2" />
            </template>
            <template v-if="textObject.type === 'placeholder'">
                <PlaceholderTextBox
                    :index="textObject.index"
                    :word="textObject.word"
                    :status="textObject.status"
                    class="me-2"
                />
            </template>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    max-width: 1280px;
    margin-top: auto;
    min-width: 200px;
    min-height: 200px;
    display: flex;
    justify-content: flex-start;
    .character-icon {
        background-color: red;
        max-width: 100%;
        height: auto;
    }
}
</style>
