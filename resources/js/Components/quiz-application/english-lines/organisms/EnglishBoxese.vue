<template>
    <div class="d-flex justify-content-start">
        <template v-for="button in buttons" :key="button.index">
            <button :disabled="button.disabled" @click="handleClick(button.index)" class="btn btn-primary me-2">
                Button {{ button.index }}
            </button>
            <button v-if="button.disabled" @click="handleReset(button.index)" class="btn btn-danger">×</button>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const buttons = ref([
    { index: 1, disabled: false },
    { index: 2, disabled: false },
    { index: 3, disabled: false }
    // 他のボタンも追加してください
])

const handleClick = (buttonIndex) => {
    buttons.value = buttons.value.map((button) =>
        button.index === buttonIndex ? { ...button, disabled: true } : button
    )
}

const handleReset = (buttonIndex) => {
    buttons.value = buttons.value.map((button) =>
        button.index === buttonIndex ? { ...button, disabled: false } : button
    )
}
</script>

<style scoped>
/* 必要に応じてスタイルを追加してください */
</style>
