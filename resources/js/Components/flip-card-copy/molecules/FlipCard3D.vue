<!-- @v overview: TODO課題多数！3Dフリップカード(個別)コンポーネント -->
<script setup lang="ts">
import { breakpoints } from '@/utils/breakpoints'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useScreenSize } from '@/Composable/useScreenSize'

/**
 * Props
 * @param { String } ja 日本語
 * @param { String } en 英語
 * @param { Boolean } flip 裏返しフラグ
 */
const props = defineProps({
    ja: String,
    en: String,
    flip: Boolean,
    cardLength: Number,
    isPickUp: Boolean,
    isCorrect: Boolean,
    hasCurrentItem: Boolean
})

/**  TODO: タイプファイル別切り出し */
const { isScreenSmall, isScreenMedium, isScreenLarge, cardWidth, cardHeight } = useScreenSize()

/** カード間隔判定。メディアクエリー依存 */
const cardBetween = (times: number, isScreenSmall: boolean) => {
    if (isScreenSmall) {
        return 15 * times + 'px'
    } else {
        return 50 * times + 'px'
    }
}

const frontCardBodyClasses = computed(() => ({
    'card-body': true,
    'd-flex': true,
    'flex-column': true,
    'pt-4': isScreenSmall.value,
    'pt-0': !isScreenSmall.value
}))
// const backCardBodyClasses = computed(() => ({
//     'card-body': true,
//    ...
// }))

/**
 * カードのクラス値。 親コンポーネントからの flip のフラグ値にて算出
 */
const flipClass = computed(() => {
    return props.flip ? 'flip-card-inner flip-card-backback' : 'flip-card-inner'
})

const flipCardClassByLength = computed(() => {
    if (props.cardLength > 5) {
        return 'flip-card'
    } else if (props.cardLength > 4) {
        return 'flip-card-5'
    } else if (props.cardLength > 3) {
        return 'flip-card-4'
    } else if (props.cardLength > 2) {
        return 'flip-card-3'
    } else if (props.cardLength > 1) {
        return 'flip-card-2'
    } else {
        return 'flip-card-1'
    }
})

/**
 * フリップカード前面のクラス値
 * 正解フラグとピックアップフラグ、コレクション済みフラグに応じてクラスを切り替える
 **/
const flipCardFrontTypeClassByStatus = computed(() => {
    if (props.isCorrect && props.isPickUp) {
        return 'flip-card-front flip-card-front-correct-pickup'
    } else if (props.isCorrect && !props.isPickUp) {
        return 'flip-card-front flip-card-front-correct-not-pickup'
    } else if (props.isCorrect && props.hasCurrentItem) {
        return 'flip-card-front flip-card-front-correct-has-current-item'
    } else {
        return 'flip-card-front flip-card-front-incorrect'
    }
})
const flipCardBackClass = computed(() => {
    return 'flip-card-back pt-4'
})
</script>

<!-- フリップカード -->
<template>
    <div :class="flipCardClassByLength">
        <div :class="flipClass">
            <div :class="flipCardFrontTypeClassByStatus">
                <div class="card h-100" style="background-color: inherit">
                    <div :class="frontCardBodyClasses">
                        <!-- flex-columnを追加 子要素が縦方向に並ぶ-->
                        <blockquote class="blockquote blockquote-custom pt-2 h-100 d-flex flex-column">
                            <div class="blockquote-custom-icon bg-info shadow-4-strong">
                                <font-awesome-icon :icon="['fas', 'quote-left']" style="color: #ffffff" />
                            </div>
                            <p class="mb-0 mt-2 font-italic flex-grow-1">
                                <!-- flex-grow-1を追加 要素を最大限に使うようになる-->
                                "{{ props.ja }}<br />
                                <a href="#" class="text-info">@consequat</a>."
                            </p>
                            <footer class="blockquote-footer pt-2 mt-auto border-top">
                                <!-- mt-autoを追加 　mt-auto を付けると、その要素は親の下端に寄せられます-->
                                {{ props.isPickUp ? 'ピックアップ' : '通常' }}<br />
                                <cite title="Source Title">引用元：ジョジョの奇妙な冒険第3巻</cite>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
            <div :class="flipCardBackClass">
                <div class="general">
                    <p>{{ props.en }}</p>
                    <div><a href="#">@consequat</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    text-align: center;
}

.blockquote-custom {
    position: relative;
    font-size: 1rem;
}

.blockquote-custom-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -40px;
    left: 19px;
}
.flip-card {
    position: absolute;
    background-color: transparent;
    width: v-bind(cardWidth);
    height: v-bind(cardHeight);
    -webkit-transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    -webkit-transition: 0.9s;
    transition: 0.9s;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back {
    border-radius: 5px;
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
}

// .flip-card-front {
//     background-color: #ffffff;
// }

// 正解 + ピックアップ
.flip-card-front-correct-pickup {
    background-color: #ffffff;
}
// 正解 + ピックアップしない
.flip-card-front-correct-not-pickup {
    background-color: #818181;
}

// 正解 + コレクション済み
.flip-card-front-correct-has-current-item {
    background-color: #ffd085;
}

// 不正解
.flip-card-front-incorrect {
    background-color: #414141;
}

/* 5枚目だけアニメーションを付ける */
/* .flip-card:nth-of-type(5) .flip-card-front {
    background: linear-gradient(110deg, #bbbbbb 8%, #f5f5f5 18%, #bbbbbb 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 2s shine linear infinite;
}
@keyframes shine {
    to {
        background-position-x: -200%;
    }
} */

.flip-card-back {
    background-color: $malachite;
    transform: rotateX(180deg);
}

.flip-card:nth-of-type(1) {
    top: 0px;
    left: 0px;
    opacity: 0;
}

.flip-card:nth-of-type(2) {
    top: 10px;
    left: v-bind(cardBetween(2, isScreenSmall));
    opacity: 0.4;
}

.flip-card:nth-of-type(3) {
    top: 20px;
    left: v-bind(cardBetween(3, isScreenSmall));
    opacity: 0.6;
}

.flip-card:nth-of-type(4) {
    top: 30px;
    left: v-bind(cardBetween(4, isScreenSmall));
    opacity: 0.8;
}

.flip-card:nth-of-type(5) {
    top: 40px;
    left: v-bind(cardBetween(5, isScreenSmall));
    opacity: 1;
    -webkit-transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
    transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
}

.flip-card:nth-of-type(6) {
    top: 50px;
    left: v-bind(cardBetween(6, isScreenSmall));
    opacity: 0;
    -webkit-transform: skew(-40deg) rotate(-40deg) rotateX(-40deg) rotateY(-40deg) perspective(200px);
    transform: skew(-40deg) rotate(-40deg) rotateX(-40deg) rotateY(-40deg) perspective(200px);
}

.flip-card-backback {
    -webkit-transform: rotateX(180deg);
    transform: rotateX(180deg);
}

/* ----- */
.flip-card-5 {
    position: absolute;
    background-color: transparent;
    width: v-bind(cardWidth);
    height: v-bind(cardHeight);
    -webkit-transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    -webkit-transition: 0.9s;
    transition: 0.9s;
}

.flip-card-5:nth-of-type(1) {
    top: 0px;
    left: 0px;
    opacity: 0;
}

.flip-card-5:nth-of-type(2) {
    top: 15px;
    left: v-bind(cardBetween(2, isScreenSmall));
    opacity: 0.4;
}

.flip-card-5:nth-of-type(3) {
    top: 25px;
    left: v-bind(cardBetween(3, isScreenSmall));
    opacity: 0.6;
}

.flip-card-5:nth-of-type(4) {
    top: 40px;
    left: v-bind(cardBetween(5, isScreenSmall));
    opacity: 1;
    -webkit-transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
    transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
}

.flip-card-5:nth-of-type(5) {
    top: 50px;
    left: v-bind(cardBetween(6, isScreenSmall));
    opacity: 0;
    -webkit-transform: skew(-40deg) rotate(-40deg) rotateX(-40deg) rotateY(-40deg) perspective(200px);
    transform: skew(-40deg) rotate(-40deg) rotateX(-40deg) rotateY(-40deg) perspective(200px);
}

/* ----- */

/* ----- */
.flip-card-4 {
    position: absolute;
    background-color: transparent;
    width: v-bind(cardWidth);
    height: v-bind(cardHeight);
    -webkit-transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    -webkit-transition: 0.9s;
    transition: 0.9s;
}

.flip-card-4:nth-of-type(1) {
    top: 0px;
    left: 0px;
    opacity: 0;
}

.flip-card-4:nth-of-type(2) {
    top: 20px;
    left: v-bind(cardBetween(2, isScreenSmall));
    opacity: 0.4;
}

.flip-card-4:nth-of-type(3) {
    top: 40px;
    left: v-bind(cardBetween(5, isScreenSmall));
    opacity: 1;
    -webkit-transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
    transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
}

.flip-card-4:nth-of-type(4) {
    top: 50px;
    left: v-bind(cardBetween(6, isScreenSmall));
    opacity: 0;
    -webkit-transform: skew(-40deg) rotate(-40deg) rotateX(-40deg) rotateY(-40deg) perspective(200px);
    transform: skew(-40deg) rotate(-40deg) rotateX(-40deg) rotateY(-40deg) perspective(200px);
}

/* ----- */

/* ----- */
.flip-card-3 {
    position: absolute;
    background-color: transparent;
    width: v-bind(cardWidth);
    height: v-bind(cardHeight);
    -webkit-transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    -webkit-transition: 0.9s;
    transition: 0.9s;
}

.flip-card-3:nth-of-type(1) {
    top: 0px;
    left: 0px;
    opacity: 0.3;
}

.flip-card-3:nth-of-type(2) {
    top: 40px;
    left: v-bind(cardBetween(5, isScreenSmall));
    opacity: 1;
    -webkit-transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
    transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
}

.flip-card-3:nth-of-type(3) {
    top: 50px;
    left: v-bind(cardBetween(6, isScreenSmall));
    opacity: 0;
    -webkit-transform: skew(-40deg) rotate(-40deg) rotateX(-40deg) rotateY(-40deg) perspective(200px);
    transform: skew(-40deg) rotate(-40deg) rotateX(-40deg) rotateY(-40deg) perspective(200px);
}

/* ----- */

/* ----- */
.flip-card-2 {
    position: absolute;
    background-color: transparent;
    width: v-bind(cardWidth);
    height: v-bind(cardHeight);
    -webkit-transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    -webkit-transition: 0.9s;
    transition: 0.9s;
}

.flip-card-2:nth-of-type(1) {
    top: 0px;
    left: 0px;
    opacity: 0.3;
}

.flip-card-2:nth-of-type(2) {
    top: 40px;
    left: v-bind(cardBetween(5, isScreenSmall));
    opacity: 1;
    -webkit-transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
    transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
}

/* ----- */

/* ----- */
.flip-card-1 {
    position: absolute;
    background-color: transparent;
    width: v-bind(cardWidth);
    height: v-bind(cardHeight);
    -webkit-transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    transform: skew(-20deg) rotate(-20deg) rotateX(-20deg) rotateY(-20deg) perspective(200px);
    -webkit-transition: 0.9s;
    transition: 0.9s;
}

.flip-card-1:nth-of-type(1) {
    top: 40px;
    left: v-bind(cardBetween(5, isScreenSmall));
    opacity: 1;
    -webkit-transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
    transform: skew(-0deg) rotate(-0deg) rotateX(-0deg) rotateY(-0deg) perspective(0px);
}

/* ----- */
</style>
