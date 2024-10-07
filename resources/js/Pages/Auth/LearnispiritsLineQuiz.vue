<script setup>
import LineQuizCountDownTimerBase from '@/Components/line-quiz-countdown-timer/organisms/LineQuizCountDownTimers/LineQuizCountDownTimerBase.vue'
import QuizApplication from '@/Components/quiz-application/QuizApplication.vue'
import { ref, watch } from 'vue'

// ページの状態
// 'beforeQuiz(クイズ前) -> duringQuiz（クイズ中） -> afterQuiz（クイズ後）'
// の順番に変化していく
// 詳細は以下のようになる
//
// 1.beforeQuiz(クイズ前)
//
//    ↓
//
// 2.duringQuiz（クイズ中）
//
//    ↓ ............クイズに正解or不正解
//
// 3.duringQuizReset （クイズ中でのリセット処理0.5秒）
//
//    ↓
//
// 4.duringQuiz（クイズ中）
//
//    ↓ .............3と4を繰り返す
//
// 5.afterQuiz（クイズ後）

const pageState = ref('beforeQuiz')

// ページの状態
// countdownStart(カウントダウンスタート前)  -> countDownEnd（カウントダウンスタート後）'
// の順番に変化していく
const countDownState = ref('countdownStart')

// クイズの出題番号、
const quizCounter = ref(0)

/** 正解数 */
const collectCounter = ref(0)

// サーバーからのセリフ（クイズデータ取得）
const props = defineProps({
    lines: Array
})

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

/** クイズアプリケーション起動時のカウントダウン終了(手動) */
const changeCountDownState = (state) => {
    if (state === 'countDownEnd') pageState.value = 'duringQuiz'
}
/** ページステータス変更 (クイズ中でのリセット処理) */
const changePageState = ({ state }) => {
    if (state === 'countDownEnd') pageState.value = 'duringQuizReset'
}

/** 正解 */
const collect = ({ isCollect }) => {
    if (isCollect) {
        collectCounter.value = collectCounter.value + 1
    }
}

/** ページステート監視（0.5秒インターバル次のクイズ移動） */
watch(pageState, (newValue, oldValue) => {
    // クイズ前、クイズ終了の場合は何もしない
    if (oldValue === 'afterQuiz' || oldValue === 'beforeQuiz') {
        return
    }

    // 最大10問、クイズ終了
    if (quizCounter.value === 9) {
        pageState.value = 'afterQuiz'
    }

    // クイズ中でのリセット処理(次のクイズへ)
    if (newValue === 'duringQuizReset') {
        setTimeout(() => {
            quizCounter.value++
            pageState.value = 'duringQuiz'
        }, 1000)
    }
})
</script>

<!-- トップページ -->

<!-- 動的コンテンツなので、セマンティックなスタイルにしない -->
<template>
    <main class="col-sm-12 col-md-12">
        <div class="quiz-application-wrapper" style="margin-top: 56px; width: 100%">
            <!-- クイズ前 -->
            <template v-if="pageState == 'beforeQuiz'">
                <div style="width: 100%; display: flex; justify-content: center">
                    <!-- 説明文 -->
                    <div style="position: fixed; top: 30%; width: 100%; display: flex; justify-content: center">
                        <h2>クイズが開始するまであと...</h2>
                    </div>

                    <!-- カウントダウンタイマー -->
                    <LineQuizCountDownTimerBase
                        :max="5"
                        :countDownState="countDownState"
                        :isActionWithCountDownEnd="false"
                        @changeCountDownState="changeCountDownState"
                    />

                    <!-- 煽り文 -->
                    <div style="position: fixed; top: 65%; width: 100%; display: flex; justify-content: center">
                        <h2>最高にハイって奴だーー！！</h2>
                    </div>
                </div>
            </template>

            <!-- クイズ中 -->
            <template v-else-if="pageState == 'duringQuiz'">
                <QuizApplication
                    :japaneseLine="lines[quizCounter].line.japanese_line"
                    :englishLine="lines[quizCounter].line.english_line"
                    :feeling="lines[quizCounter].feeling"
                    @changePageState="changePageState"
                    @collect="collect"
                />
            </template>
            <!-- クイズ後 -->
            <template v-else-if="pageState == 'afterQuiz'">
                あなたの正解数は{{ `${collectCounter} / 10 ` }}です
            </template>
        </div>
    </main>
    <!-- TODO: クイズ終了後に出す勉強を促す系の広告に修正 -->
    <!-- <aside class="col-sm-12 col-md-3" style="margin-top: 56px">
        aside-content
    </aside> -->
</template>

<style lang="scss" scoped>
aside {
    background-color: #ffcc27;
}

@media (max-width: 599px) {
    // モバイル対応：クイズがはみ出してしまうため
    .quiz-application-wrapper {
        background-color: $sugar-cane;
        height: 115dvh;
    }
}
@media (min-width: 600px) and (max-width: 799px) {
    // タブレット対応：クイズがはみ出してしまうため
    .quiz-application-wrapper {
        background-color: $sugar-cane;
        height: 150dvh;
    }
}

@media (min-width: 800px) {
    .quiz-application-wrapper {
        background-color: $sugar-cane;
        height: 110dvh;
    }
}
</style>
