<!-- @v overview: カウントダウンタイマー　骨組み -->
<!-- @v complecate: カウントダウンアニメーション用ロジック -->
<!-- @v tips: カウントダウンアニメーション用ロジック -->
<script setup>
import { ref, onMounted } from 'vue'
import CountDownTimerNumber from './CountDownTimerNumber.vue'

/* 起動装置クラス名 **/
const launcherClassName = ref('launcher show')
/* カウンタークラス名 **/
const counterClassName = ref('counter hide')
/* 経過時間 **/
const elapsedSecond = ref(0)
/* 上限 **/
const max = ref(10)
/**
 * カウンターアイテムリストの初期化
 * @param {number} maxNum 上限数
 */
const resetCounterItemList = (maxNum) => {
    const array = []
    for (let i = 0; i < maxNum; i++) {
        array.push({
            id: maxNum - i,
            className: ''
        })
    }
    return array
}
/** カウンターアイテムリスト */
const counterItemList = ref(resetCounterItemList(max.value))

/** ページ表示時カウントダウン開始 */
onMounted(() => {
    countDownStart()
})

const emit = defineEmits(['change'])
const sample = () => {
    emit('change', 'abc')
}

/**
 * カウントダウン開始
 */
const countDownStart = () => {
    /* カウンタークラス名:表示, 起動装置クラス名:非表示 に設定  **/
    counterClassName.value = 'counter show'
    launcherClassName.value = 'launcher hide'
    /* ポーリング開始(0.5秒おき) **/
    const polling = setInterval(() => {
        /** カウンターアイテムクラス名を
    「''」 -> 「'pop-in'」 -> 「'pop-out'」
    と推移させることで、それぞれのタイミングで各カウンターアイテムを
    「非表示」->「表出」->「消失」させる
    */
        if (counterItemList.value[elapsedSecond.value].className === '') {
            counterItemList.value[elapsedSecond.value].className = 'pop-in'
        } else if (counterItemList.value[elapsedSecond.value].className === 'pop-in') {
            counterItemList.value[elapsedSecond.value].className = 'pop-out'
            elapsedSecond.value++
        }
        /** カウントダウン上限に達した場合 */
        if (elapsedSecond.value == max.value) {
            /** ポーリング停止  */
            clearInterval(polling)
            /** 遅延処理（最後だけ0.5秒追加） */
            setTimeout(() => {
                /** カウンタークラス名:非表示, 起動装置クラス名:表示 に設定 */
                counterClassName.value = 'counter hide'
                launcherClassName.value = 'launcher show'
                /** カウンターアイテムリストと経過時間を初期化 */
                counterItemList.value = resetCounterItemList(max.value)
                elapsedSecond.value = 0
            }, '500')
        }
    }, 500)
}
</script>

<template>
    <div :class="counterClassName">
        <div class="numbers">
            <template v-for="item in counterItemList" :key="item.id">
                <CountDownTimerNumber :class-name="item.className">
                    {{ item.id }}
                </CountDownTimerNumber>
            </template>
        </div>
        <h4>Get Ready</h4>
    </div>
    <div :class="launcherClassName">
        <h1>GO</h1>
        <button class="launch" v-on:click="sample">Launch</button>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
    margin: 0;
}

h4 {
    font-size: 1.2rem;
    margin: 5px;
    text-transform: uppercase;
}

.counter {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.counter.hide {
    transform: translate(-50%, -50%) scale(0);
    animation: hide 0.2s ease-out;
}

.launcher {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
}

.launcher.show {
    transform: translate(-50%, -50%) scale(1);
    animation: show 0.2s ease-out;
}

.numbers {
    color: var(--primary);
    font-size: 50px;
    position: relative;
    overflow: hidden;
    width: 250px;
    height: 50px;
}

@keyframes hide {
    0% {
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        transform: translate(-50%, -50%) scale(0);
    }
}

@keyframes show {
    0% {
        transform: translate(-50%, -50%) scale(0);
    }
    30% {
        transform: translate(-50%, -50%) scale(1.4);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
    }
}
</style>
