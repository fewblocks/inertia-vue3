<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
    //
    textObjects: Array<{
        type: 'static' | 'placeholder'
        word: string
        index: number
        status: 'filled' | 'selected' | 'unselected'
        selectedWord: string
        disabled: boolean
    }>
}>()

// Fisher-Yates シャッフルアルゴリズムを使用して配列をランダムに並べ替える関数
// const textObjects = ref(shuffleArray(props.textObjects)) でpropsの値を移し、
// 使っているとなぜかprops がずっとシャッフルされたまま使われてしまいます。
//  なぜですか？そして、props がシャッフルされないようにするにはどうすればいいですか？
// const shuffleArray = (array: any[]) => {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1))
//         ;[array[i], array[j]] = [array[j], array[i]]
//     }
//     return array
// }

// props の値がシャッフルされたまま使われてしまう理由は、props.textObjects の参照を直接
// shuffleArray 関数に渡しているためです。shuffleArray 関数は配列をインプレースでシャッフルするため、
// 元の props.textObjects 配列も変更されてしまいます。
// これを防ぐためには、props.textObjects のコピーを作成し、そのコピーをシャッフルする必要があります。
// 以下のように、slice メソッドを使用して配列のコピーを作成し、そのコピーをシャッフルします。
const shuffleArray = (array: any[]) => {
    const newArray = array.slice() // 配列のコピーを作成
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    // shuffleIndex を追加
    return newArray.map((item, index) => ({ ...item, shuffleIndex: index }))
}

const textObjects = ref(shuffleArray(props.textObjects))
// const textObjects = ref(props.textObjects)

/** 呼び出し元へ伝播イベント */
const emit = defineEmits(['select-text'])

// ボタンクリック時の処理
const handleClick = (buttonIndex: number, word: string, shuffleIndex: number) => {
    const currentItem = props.textObjects?.find((item) => item.status === 'selected')
    const neXtItem = props.textObjects?.find(
        (item) => currentItem.index < item.index && item.type === 'placeholder' && item.status === 'unselected'
    )
    emit('select-text', {
        buttonIndex: buttonIndex,
        nextPlaceholderIndex: neXtItem ? neXtItem.index : null,
        buttonWord: word,
        shuffleIndex: shuffleIndex
    })
}

const handleReset = (buttonIndex) => {
    textObjects.value = textObjects.value.map((button) =>
        button.index === buttonIndex ? { ...button, disabled: false } : button
    )
}

// ボタン非活性判定
const isButtonDisabled = computed(() => (buttonIndex: number) => {
    // 親コンポーネントで管理している情報とインデックスによる判定
    const item = props.textObjects?.find((item) => item.index === buttonIndex)
    return item ? item.disabled : false
})

const isButtonExist = (textIndex: number) => {
    return props.textObjects?.find((item) => item.index === textIndex && item.type === 'placeholder')
}
</script>
<template>
    <div class="d-flex justify-content-start">
        <template v-for="textObject in textObjects" :key="textObject.index">
            <template v-if="isButtonExist(textObject.index)">
                <div class="content-box">
                    <button
                        :disabled="isButtonDisabled(textObject.index)"
                        @click="handleClick(textObject.index, textObject.word, textObject.shuffleIndex)"
                        class="btn btn-primary me-2"
                    >
                        {{ textObject.word }}
                    </button>
                    <button
                        v-if="isButtonDisabled(textObject.index)"
                        @click="handleReset(textObject.index)"
                        class="btn btn-danger"
                        style="position: absolute; top: 10px; right: 5px"
                    ></button>
                </div>
            </template>
        </template>
    </div>
</template>

<style scoped>
.content-box {
    width: fit-content;
    height: fit-content;
    position: relative;
}
/* 必要に応じてスタイルを追加してください */
</style>
