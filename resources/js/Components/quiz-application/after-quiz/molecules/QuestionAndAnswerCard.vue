<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
    index: number
    line: {
        japanese_line: string
        english_line: string
    }
    isCorrect: boolean
    isOverlap: boolean
    isAfterCollection: boolean
    lastPickUpIndex?: number
}>()

console.log(props.lastPickUpIndex, 'props.lastPickUpIndex')
const cardStyle = computed(() =>
    props.isAfterCollection
        ? {
              position: 'absolute' as 'absolute',
              top: `${props.index * 10}px`,
              left: `${props.index * 10}px`,
              zIndex: props.index,
              width: '100%',
              height: '200px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
          }
        : {}
)

const cardClassName = computed(() => {
    let name = ''
    name = props.isCorrect ? 'row correct-line' : 'row incorrect-line'
    name += props.isAfterCollection ? ' container' : ''
    return name
})
</script>

<template>
    <div :class="cardClassName" :style="cardStyle">
        <div class="question-index">
            <div class="text-top">
                {{ lastPickUpIndex ? lastPickUpIndex : props.index }}
            </div>
        </div>
        <div class="question-text">
            <ul>
                <li style="text-decoration: underline">{{ props.line.japanese_line }}</li>
                <li>{{ props.line.english_line }}</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    overflow: hidden;
    width: 100%;
    height: 200px;
    .question-text > ul > li {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.question-index {
    font-size: 1.5rem;
    font-weight: bold;
}

.question-text {
    font-size: 1.5rem;
}

.correct-line {
    background-color: green;
}
.incorrect-line {
    background-color: red;
}
</style>
