<script setup>
import LineQuizCountDownTimerBase from '@/Components/line-quiz-countdown-timer/organisms/LineQuizCountDownTimers/LineQuizCountDownTimerBase.vue'
//Components\line-quiz-contdown-timer\organisms\LineQuizCountDownTimers\LineQuizCountDownTimerBase.vue
import { ref } from 'vue'
const hover = ref(false)

// ページの状態
// 'beforeQuiz(クイズ前) -> duringQuiz（クイズ中） -> afterQuiz（クイズ後）'
// の順番に変化していく
const pageState = ref('beforeQuiz')

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

const changeGet = (text) => {
    console.log(text)
    pageState.value = 'duringQuiz'
}
</script>

<!-- トップページ -->

<template>
    <main class="col-sm-12 col-md-9">
        <!-- 動的コンテンツなので、セマンティックなスタイルにしない -->
        <div style="margin-top: 56px; width: 90%; height: 100dvh">
            <!-- クイズ前 -->
            <template v-if="pageState == 'beforeQuiz'">
                <!-- タイマー -->
                <LineQuizCountDownTimerBase @change="changeGet" />
            </template>

            <!-- クイズ中 -->
            <template v-else-if="pageState == 'duringQuiz'">
                <div>クイズ中</div>
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
