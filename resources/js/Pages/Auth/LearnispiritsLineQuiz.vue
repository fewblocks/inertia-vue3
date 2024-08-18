<script setup>
import LineQuizCountDownTimerBase from '@/Components/line-quiz-countdown-timer/organisms/LineQuizCountDownTimers/LineQuizCountDownTimerBase.vue'
import QuizApplication from '@/Components/quiz-application/QuizApplication.vue'
import { ref } from 'vue'
const hover = ref(false)

// ページの状態
// 'beforeQuiz(クイズ前) -> duringQuiz（クイズ中） -> afterQuiz（クイズ後）'
// の順番に変化していく
const pageState = ref('beforeQuiz')

// クイズの出題番号、
const quizCounter = ref(0)

// サーバーからのセリフ（クイズデータ取得）
const props = defineProps({
    lines: Array
})

console.log(props.lines)
//　アクセサー
{
    /* <ul v-for="line in lines" :key="line.id">
            <li>{{ line.some_line_field }}</li>
                <li>{{ line.character.japanese_name }}</li>
                <li>{{ line.character.english_name }}</li>
                <li>{{ line.japanese_line }}</li>
                <li>{{ line.english_line }}</li>
            </ul> */
}

const changePageState = (state) => {
    pageState.value = state
}
</script>

<!-- トップページ -->

<!-- 動的コンテンツなので、セマンティックなスタイルにしない -->
<template>
    <main class="col-sm-12 col-md-12">
        <div style="margin-top: 56px; width: 100%; height: 100dvh">
            <!-- クイズ前 -->
            <template v-if="pageState == 'beforeQuiz'">
                <div style="width: 100%; display: flex; justify-content: center">
                    <!-- 説明文 -->
                    <div style="position: fixed; top: 30%; width: 100%; display: flex; justify-content: center">
                        <h2>クイズが開始するまであと...</h2>
                    </div>

                    <!-- カウントダウンタイマー -->
                    <LineQuizCountDownTimerBase :max="5" @changePageState="changePageState" />

                    <!-- 煽り文 -->
                    <div style="position: fixed; top: 65%; width: 100%; display: flex; justify-content: center">
                        <h2>最高にハイって奴だーー！！</h2>
                    </div>
                </div>
            </template>

            <!-- クイズ中 -->
            <template v-else-if="pageState == 'duringQuiz'">
                <div>{{ lines[quizCounter].japanese_line }}</div>
                <QuizApplication
                    :japaneseLine="lines[quizCounter].japanese_line"
                    :feeling="lines[quizCounter].feeling"
                />
            </template>
        </div>
    </main>
    <!-- TODO: クイズ終了後に出す勉強を促す系の広告に修正 -->
    <!-- <aside class="col-sm-12 col-md-3" style="margin-top: 56px">
        aside-content
    </aside> -->
</template>

<style scoped>
aside {
    background-color: #ffcc27;
}
</style>
