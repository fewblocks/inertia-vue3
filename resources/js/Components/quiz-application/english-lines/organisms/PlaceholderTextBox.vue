<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    // 英文
    // コメント
    index: Number
    status: 'filled' | 'selected' | 'unselected'
    selectedWord: String
}>()

// 10文字以下の英単語に対して下線を引く
const underlinedText = computed(() => (word) => {
    switch (word.length) {
        case 1:
            return '____' + word + '_____'
        case 2:
            return '____' + word + '____'
        case 3:
            return '___' + word + '____'
        case 4:
            return '___' + word + '___'
        case 5:
            return '__' + word + '___'
        case 6:
            return '__' + word + '__'
        case 7:
            return '_' + word + '__'
        case 8:
            return '_' + word + '_'
        case 9:
            return '' + word + '_'
        default:
            return '' + word + ''
    }
})
</script>
<template>
    <div class="d-inline-block">
        <template v-if="props.status === 'selected'">
            <p class="fw-bold fs-1 w-auto blinking selected">__________</p>
        </template>
        <template v-if="props.status === 'unselected'">
            <p class="fw-bold fs-1 w-auto unselected">__________</p>
        </template>
        <template v-if="props.status === 'filled'">
            <p class="fw-bold fs-1 w-auto filled">{{ underlinedText(props.selectedWord) }}</p>
        </template>
    </div>
</template>
<style scoped>
@keyframes blink {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}

.selected,
.unselected,
.filled {
    text-decoration: underline;
}

.blinking {
    animation: blink 1s infinite;
}
.d-inline-block,
.fw-bold,
.fs-1,
.w-auto,
.filled,
.unselected,
.blinking {
    font-family: monospace;
}
</style>
