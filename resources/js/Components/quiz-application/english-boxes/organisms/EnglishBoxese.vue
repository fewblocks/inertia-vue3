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
}>()

const colorsObjects = ref(props.colorsObjects)

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
const emit = defineEmits(['select-text'])

// ボタンクリック時の処理
const handleClick = (buttonIndex: number, word: string) => {
    const currentItem = props.textObjects?.find((item) => item.status === 'selected')
    const neXtItem = props.textObjects?.find(
        (item) => currentItem.index < item.index && item.type === 'placeholder' && item.status === 'unselected'
    )
    emit('select-text', {
        buttonIndex: buttonIndex,
        nextPlaceholderIndex: neXtItem ? neXtItem.index : null,
        buttonWord: word
    })
}

const handleReset = (buttonIndex) => {
    textObjects.value = textObjects.value.map((button) =>
        button.index === buttonIndex ? { ...button, disabled: false } : button
    )
}

/**  ボタン非活性判定 */
const isButtonDisabled = computed(() => (buttonIndex: number) => {
    const item = props.textObjects?.find((item) => item.index === buttonIndex)
    return item ? item.disabled : false
})

/** ボタンのスタイルを動的に設定 */
const boxStyle = computed(() => (index: number) => {
    const color = colorsObjects.value[index]?.color || ''
    const baseClass = isButtonDisabled.value(index) ? 'placeholder-text-disabled' : 'placeholder-text'
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
                        @click="handleClick(textObject.index, textObject.word)"
                        :class="boxStyle(textObject.index)"
                    >
                        {{ textObject.word }}
                    </div>
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
.placeholder-text {
    display: inline-block;
    padding: 20px;
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

.red {
    background-color: red;
}
.blue {
    background-color: blue;
}
.green {
    background-color: green;
}
.yellow {
    background-color: yellow;
}
.purple {
    background-color: purple;
}
.orange {
    background-color: orange;
}
.pink {
    background-color: pink;
}
.brown {
    background-color: brown;
}
.black {
    background-color: black;
    color: white;
}
.white {
    background-color: gray;
    color: black;
}
.cyan {
    background-color: cyan;
}
.magenta {
    background-color: magenta;
}
.lime {
    background-color: lime;
}
.maroon {
    background-color: maroon;
}
.navy {
    background-color: navy;
}
.olive {
    background-color: olive;
}
.teal {
    background-color: teal;
}
.violet {
    background-color: violet;
}
.indigo {
    background-color: indigo;
}
.gold {
    background-color: gold;
}
.silver {
    background-color: silver;
}
.bronze {
    background-color: bronze;
}
.coral {
    background-color: coral;
}
.salmon {
    background-color: salmon;
}
.khaki {
    background-color: khaki;
}
.lavender {
    background-color: lavender;
}
.peach {
    background-color: peach;
}
.plum {
    background-color: plum;
}
.orchid {
    background-color: orchid;
}
.mint {
    background-color: mint;
}
</style>
