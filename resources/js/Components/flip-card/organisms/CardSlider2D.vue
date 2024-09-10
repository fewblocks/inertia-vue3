<!-- 2Dカードスライダー（コントローラー）コンポーネント -->
<script setup lang="ts">
import FlipCard2D from '@/Components/flip-card/molecules/FlipCard2D.vue'
import { ref, toRaw } from 'vue'

/**
 * Props
 * @param { Array } cardData カード情報配列
 */
const props = defineProps({
    cardData: Array,
    default: () => []
})

/**  ここにcloneData を入れても reactiveになる */
const items = ref(toRaw(props.cardData))
const updateData = ({ cardId, fliped }) => {
    items.value[cardId - 1].flip = fliped
}
</script>
<template>
    <div class="card-container-wrap">
        <!-- フリップカード -->
        <div class="CardContainer">
            <template v-for="card in props.cardData" :key="card.id">
                <FlipCard2D @change-flip="updateData" :ja="card.ja" :en="card.en" :flip="card.flip" :id="card.id">
                </FlipCard2D>
            </template>
        </div>
        <!-- 操作ボタン -->
        <div style="">
            <button class="btn btn-primary" v-on:click="next()">進める</button>
            <button class="btn btn-primary" v-on:click="prev()">戻す</button>
            <button class="btn btn-primary" v-on:click="flip()">ひっくり返す</button>
        </div>
    </div>
</template>

<style scoped>
.CardContainer {
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    overflow: scroll;
}
</style>
