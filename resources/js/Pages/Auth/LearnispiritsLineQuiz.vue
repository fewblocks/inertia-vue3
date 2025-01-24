<script setup>
import LineQuizCountDownTimerBase from '@/Components/line-quiz-countdown-timer/organisms/LineQuizCountDownTimers/LineQuizCountDownTimerBase.vue'
import QuizApplication from '@/Components/quiz-application/QuizApplication.vue'
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import AfterQuiz from '@/Components/quiz-application/after-quiz/organisms/AfterQuiz.vue'
import cloneDeep from 'lodash/cloneDeep'
import { useHeightObserver } from '@/Composable/useHeightObserver'

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

/** 正解クイズ集Index */
const collectQuizIndexes = ref([]) // これいらないかも

/** 正解クイズ集id */
const collectQuizIds = ref([])

/**  サーバーからのセリフ（クイズデータ取得）*/
const props = defineProps({
    lines: Array
})

// TODO: 難易度変更、簡易関数、要リファクタリング
/** 難易度 */
const difficulty = ref('medium')
const high = () => {
    difficulty.value = 'high'
}
const medium = () => {
    difficulty.value = 'medium'
}
const low = () => {
    difficulty.value = 'low'
}

const timeLimit = ref(1)
const timeLimitChange = (event) => {
    timeLimit.value = event.target.value
}
//

/** ウィンドウの動的高さ */
const activeHeight = ref(0)
const a = route().current('learnispirits.line-quiz')

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
const collect = ({ isCollect, quizIndex, quizId }) => {
    if (isCollect) {
        collectCounter.value = collectCounter.value + 1
        collectQuizIndexes.value.push([quizIndex]) // これいらないかも
        collectQuizIds.value.push(quizId)
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
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
    }

    // クイズ中でのリセット処理(次のクイズへ)
    if (newValue === 'duringQuizReset') {
        setTimeout(() => {
            quizCounter.value++
            pageState.value = 'duringQuiz'
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 1000)
    }
})

// コンポーザブルを使用して高さを監視
useHeightObserver('quiz-application-wrapper', 'quiz-application-content')
// ▲▲▲▲ウィンドウの高さを監視して、最低でも1.5倍の高さになるように調整する▲▲▲▲
</script>

<!-- トップページ -->

<!-- 動的コンテンツなので、セマンティックなスタイルにしない -->
<template>
    <main class="col-sm-12 col-md-12">
        <div id="quiz-application-wrapper" class="quiz-application-wrapper" style="margin-top: 56px; width: 100%">
            <div id="quiz-application-content" class="quiz-application-content">
                <!-- このコンテンツの大きさを監視してサイズを計測 -->

                <!-- クイズ前 -->
                <template v-if="pageState == 'beforeQuiz'">
                    <div style="width: 100%; display: flex; justify-content: center">
                        <!-- 説明文 -->
                        <div style="position: fixed; top: 30%; width: 100%; display: flex; justify-content: center">
                            <h2>クイズが開始するまであと...</h2>
                        </div>

                        <!-- カウントダウンタイマー -->
                        <div style="position: fixed; top: 50%; width: 100%; display: flex; justify-content: center">
                            <LineQuizCountDownTimerBase
                                :max="5"
                                :countDownState="countDownState"
                                :isActionWithCountDownEnd="false"
                                @changeCountDownState="changeCountDownState"
                            />
                        </div>
                        <!-- 煽り文 -->
                        <div style="position: fixed; top: 65%; width: 100%; display: flex; justify-content: center">
                            <h2>最高にハイって奴だーー！！</h2>
                        </div>
                        <div class="row">
                            <div>
                                <button v-on:click="high">high</button>
                            </div>
                            <div>
                                <button v-on:click="medium">medium</button>
                            </div>
                            <div>
                                <button v-on:click="low">low</button>
                            </div>
                            <div>
                                <input
                                    type="range"
                                    id="volume"
                                    name="volume"
                                    min="1"
                                    max="30"
                                    v-model="timeLimit"
                                    v-on:change="timeLimitChange"
                                />
                                <label for="volume">Volume: {{ timeLimit }}</label>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- クイズ中 -->
                <template v-else-if="pageState == 'duringQuiz'">
                    <QuizApplication
                        :japaneseLine="lines[quizCounter].line.japanese_line"
                        :englishLine="lines[quizCounter].line.english_line"
                        :feeling="lines[quizCounter].feeling"
                        :quizIndex="quizCounter"
                        :quizId="lines[quizCounter].line.id"
                        :difficulty="difficulty"
                        :timeLimit="timeLimit"
                        @changePageState="changePageState"
                        @collect="collect"
                    />
                </template>
                <!-- クイズ後 -->
                <template v-else-if="pageState == 'afterQuiz'">
                    <!-- <div class="col-12">あなたの正解数は{{ `${collectCounter} / 10 ` }}です</div> -->
                    <AfterQuiz :lines="lines" :collectQuizIds="collectQuizIds" :collectCounter="collectCounter">
                    </AfterQuiz>
                </template>
            </div>
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

.quiz-application-wrapper {
    padding: 10px;
}

.quiz-application-content {
    display: flex;
    justify-content: center;
}

@media (max-width: 599px) {
    // モバイル対応：クイズがはみ出してしまうため
    .quiz-application-wrapper {
        background-color: $sugar-cane;
        height: fit-content;
        min-height: 150dvh;
    }
}
@media (min-width: 600px) and (max-width: 799px) {
    // タブレット対応：クイズがはみ出してしまうため
    .quiz-application-wrapper {
        background-color: $sugar-cane;
        height: fit-content;
        min-height: 150dvh;
    }
}

@media (min-width: 800px) {
    .quiz-application-wrapper {
        background-color: $sugar-cane;
        height: fit-content;
        min-height: 150dvh;
    }
}
</style>
