<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
    textObjects: Array<{
        type: 'static' | 'placeholder'
        word: string
        index: number
        status: 'filled' | 'selected' | 'unselected'
        selectedWord: string
        disabled: boolean
        /** このコンポーネントでは未使用*/
        selectedColorIndex: number | null
    }>
    colorsObjects: Array<{ color: string; index: number }>
    selectedWordIndexes: Array<number>
}>()

const colorsObjects = ref(props.colorsObjects)
const selectedWordIndexes = ref(props.selectedWordIndexes)

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
const shuffleTextObjectArray = (array: any[]) => {
    const newArray = array.slice() // 配列のコピーを作成
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    // shuffleIndex を追加
    return newArray.map((item, index) => ({ ...item, shuffleIndex: index }))
}

const textObjects = ref(shuffleTextObjectArray(props.textObjects))
// const textObjects = ref(props.textObjects)

/** 呼び出し元へ伝播イベント */
const emit = defineEmits(['select-text', 'reset-text'])

// ボタンクリック時の処理
const handleClick = (boxIndex: number, word: string, buttonDisabled: boolean) => {
    if (buttonDisabled) return
    const currentItem = props.textObjects?.find((item) => item.status === 'selected')
    const neXtItem = props.textObjects?.find(
        (item) => currentItem.index < item.index && item.type === 'placeholder' && item.status === 'unselected'
    )

    emit('select-text', {
        boxIndex: boxIndex,
        nextPlaceholderIndex: neXtItem ? neXtItem.index : null,
        buttonWord: word
    })
}

const handleReset = (boxIndex: number) => {
    const currentItem = props.textObjects?.find((item) => item.status === 'selected')
    const prevItem = props.textObjects?.find(
        (item) => currentItem.index > item.index && item.type === 'placeholder' && item.status === 'filled'
    )
    emit('reset-text', {
        boxIndex: boxIndex,
        currentItemIndex: currentItem ? currentItem.index : null,
        prevPlaceholderIndex: prevItem ? prevItem.index : null
    })
}

/**  ボタン非活性判定 */
const isButtonDisabled = computed(() => (boxIndex: number) => {
    const item = props.textObjects?.find((item) => item.index === boxIndex)
    return item ? item.disabled : false
})

/** ボタンのスタイルを動的に設定 */
const boxStyle = computed(() => (index: number) => {
    const color = colorsObjects.value[index]?.color || ''
    const baseClass = isButtonDisabled.value(index) ? 'placeholder-text-disabled text' : 'placeholder-text text'
    return `${baseClass} me-2 ${color}`
})

/** ボタン有無判定 */
const isButtonExist = (textIndex: number) => {
    return props.textObjects?.find((item) => item.index === textIndex && item.type === 'placeholder')
}
</script>
<template>
    <div class="w-100 d-flex justify-content-start flex-wrap">
        <template v-for="textObject in textObjects" :key="textObject.index">
            <template v-if="isButtonExist(textObject.index)">
                <div class="content-box mb-4">
                    <div
                        :disabled="isButtonDisabled(textObject.index)"
                        @click="handleClick(textObject.index, textObject.word, isButtonDisabled(textObject.index))"
                        :class="boxStyle(textObject.index)"
                    >
                        {{ textObject.word }}
                    </div>
                    <template v-if="selectedWordIndexes[selectedWordIndexes.length - 1] === textObject.index">
                        <button
                            v-if="isButtonDisabled(textObject.index)"
                            @click="handleReset(textObject.index)"
                            class="btn btn-danger"
                            style="
                                position: absolute;
                                top: 10px;
                                right: 5px;
                                width: 25px;
                                height: 25px;
                                line-height: 10px;
                                padding: 0px;
                            "
                        >
                            X
                        </button>
                    </template>
                </div>
            </template>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.content-box {
    width: fit-content;
    height: fit-content;
    position: relative;
}
.placeholder-text {
    display: inline-block;
    /* border: 1px solid #000; */
    border-radius: 5px;
    cursor: pointer;
}

.placeholder-text-disabled {
    display: inline-block;
    padding: 20px;
    border: 5px dotted #000;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.7;
}

// @media (width < 600px) は正しい構文ではありません。代わりに @media (max-width: 599px) を使用します。
// @media (600px <= width) も正しい構文ではありません。代わりに @media (min-width: 600px) を使用します。

// @media (width < 600px) {
//     .placeholder-text-disabled .placeholder-text {
//         font-size: small;
//     }
// }

// @media (600px <= width) {
//     .placeholder-text-disabled .placeholder-text {
//         font-size: large;
//     }
// }

@media (max-width: 599px) {
    .text,
    .btn-danger {
        font-size: small;
        padding: 10px;
        font-weight: bold;
    }
}

@media (min-width: 600px) {
    .text,
    .btn-danger {
        font-size: large;
        padding: 20px;
        font-weight: bold;
    }
}
</style>
