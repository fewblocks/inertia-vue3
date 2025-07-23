<!-- @v overview: コレクション対象、クイズ後にユーザーが選別する、問題文と回答が書かれたカード -->
<!-- @v complecate: コレクション後のカードの状況がかなり密で書かれている -->
<script setup lang="ts">
/** コレクション対象、クイズ後にユーザーが選別する、問題文と回答が書かれたカード */

import { computed, defineProps } from 'vue'
const props = defineProps<{
    index: number
    line: {
        japanese_line: string
        english_line: string
    }
    isCorrect: boolean
    isAfterCollection: boolean
    lastPickUpIndex?: number
    isPickUp?: boolean
    hasCurrentItem?: boolean
}>()

/** コレクション対象のカードのスタイル */
const cardStyle = computed(() =>
    // コレクション後のカードの場合、10pxずつずらして重ねて表示する
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
    // 正解か不正解か
    name += props.isCorrect ? 'row correct-' : 'row incorrect-'
    // 正解か不正解か
    name += props.hasCurrentItem ? 'has-current-line' : 'has-not-line'
    //  コレクション後のカードかどうか(カード全体を発光させる)
    name += props.isAfterCollection ? ' container glow-wrapper' : ''
    // ピックアップされているかどうか(カード単体を発光させる)
    name += props.isPickUp ? ' glow' : ''
    return name
})
</script>

<template>
    <div :class="cardClassName" :style="cardStyle">
        <!-- カードインデックス -->
        <div class="question-index">
            <div class="text-top">
                <!-- コレクション後は重なった一番上だけインデックスを見せる -->
                {{ lastPickUpIndex ? lastPickUpIndex : props.index }}
            </div>
        </div>
        <!-- 問題文 -->
        <div class="question-text">
            <ul>
                <!-- 日本語テキストライン -->
                <li style="text-decoration: underline">{{ props.line.japanese_line }}</li>
                <!-- 英語テキストライン -->
                <li>{{ props.line.english_line }}</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// 正解不正解, コレクション済みかどうかのテキストラインスタイル
.correct-has-current-line {
    background-color: $teal;
    color: black;
    opacity: 0.5;
    margin: 5px;
}
.correct-has-not-line {
    background-color: $teal;
    color: black;
    margin: 5px;
}
.incorrect-has-current-line {
    background-color: $dusty-gray;
    color: $emperor;
    opacity: 0.5;
    margin: 5px;
}
.incorrect-has-not-line {
    background-color: $dusty-gray;
    color: $emperor;
    margin: 5px;
}

// カード単体発光エフェクト
.glow {
    transition: box-shadow ease-in-out 0.5s;
    filter: drop-shadow(5px 5px 0px #ffffff);
    box-shadow: 0px 0px 26px 7px $salmon;
}

// カード全体発行エフェクト
.glow-wrapper {
    transition: box-shadow ease-in-out 0.5s;
    // TODO: 色の調整必要
    filter: drop-shadow(10px 10px 15px rgb(255, 210, 154));
}

// コレクション後のカードスタイル
.container {
    // カードを重ねて表示するためのスタイルのため、高さ、幅を固定する
    overflow: hidden;
    width: 100%;
    height: 200px;
    // テキストはそれぞれのカードに収まるようにする（...省略表示）
    .question-text > ul > li {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

// インデックスのスタイル
.question-index {
    font-size: 1.5rem;
    font-weight: bold;
}

// 問題文のスタイル
.question-text {
    font-size: 1.5rem;
    @media (max-width: 900px) {
        font-size: 1.2rem;
    }
    @media (max-width: 600px) {
        font-size: 1rem;
    }
}
</style>
