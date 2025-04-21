<script setup lang="ts">
import { computed, ref } from 'vue'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
    isCorrect?: boolean
    isPickUp?: boolean
    hasCurrentItem?: boolean
}>()

const className = computed(() => {
    if (!props.isCorrect && !props.isPickUp) {
        return 'fa-3x dottedText'
    } else {
        return 'fa-3x'
    }
})
const fontWrapperClassName = computed(() => {
    let name = 'font-wrapper'
    if (!props.isCorrect) name += ' incorrect-item'
    if (props.hasCurrentItem) name += ' hascurrent-item'
    return name
})

const layerTextClassName = computed(() => {
    return props.isCorrect ? 'layer correct-text' : 'layer incorrect-text'
})
</script>

<!-- isCorrect	isPickUp	hasCurrentItem
TRUE	TRUE	TRUE
TRUE	TRUE	FALSE
TRUE	FALSE	TRUE
TRUE	FALSE	FALSE
FALSE	TRUE	TRUE
FALSE	TRUE	FALSE
FALSE	FALSE	TRUE
FALSE	FALSE	FALSE -->

<!-- solid 塗りつぶし-->
<!-- regular フチ取り-->

<template>
    <div :class="fontWrapperClassName">
        <template v-if="!props.isCorrect && !props.isPickUp && props.hasCurrentItem">
            <div style="position: absolute; top: 25%; left: 30%; z-index: 2">
                <span>済</span>
            </div>
        </template>

        <font-awesome-layers full-width :class="className">
            <template v-if="props.isCorrect && props.isPickUp && props.hasCurrentItem">
                <!-- 無し -->
            </template>
            <template v-else-if="props.isCorrect && props.isPickUp && !props.hasCurrentItem">
                <!-- 赤アイコン -->
                <font-awesome-icon :icon="['fas', 'heart']" class="red-icon" shake />
            </template>
            <template v-else-if="props.isCorrect && !props.isPickUp && props.hasCurrentItem">
                <!-- 青済アイコン -->
                <font-awesome-icon :icon="['fas', 'heart']" class="blue-icon" />
            </template>
            <template v-else-if="props.isCorrect && !props.isPickUp && !props.hasCurrentItem">
                <!-- 透明アイコン -->
                <font-awesome-icon :icon="['far', 'heart']" fade />
            </template>
            <template v-else-if="!props.isCorrect && props.isPickUp && props.hasCurrentItem">
                <!-- 無し -->
            </template>
            <template v-else-if="!props.isCorrect && props.isPickUp && !props.hasCurrentItem">
                <!-- 無し -->
            </template>
            <template v-else-if="!props.isCorrect && !props.isPickUp && props.hasCurrentItem">
                <!-- 青済点線アイコン -->
                <font-awesome-icon :icon="['far', 'heart']" class="blue-icon" />
            </template>
            <template v-else-if="!props.isCorrect && !props.isPickUp && !props.hasCurrentItem">
                <!-- 透明点線アイコン -->
                <font-awesome-icon :icon="['far', 'heart']" />
            </template>

            <!-- 「済」の文字の有無 -->
            <template v-if="props.isCorrect && !props.isPickUp && props.hasCurrentItem">
                <font-awesome-layers-text :class="layerTextClassName" transform="up-0.5 shrink-6" value="済" />
            </template>
        </font-awesome-layers>
    </div>
</template>

<style lang="scss" scoped>
.font-wrapper {
    position: relative;
    width: fit-content;
}

.incorrect-item,
.hascurrent-item {
    pointer-events: none;
}

.dottedText:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background:
        radial-gradient(circle, transparent 30%, transparent 20%),
        radial-gradient(circle, transparent 20%, white 70%) 30px 30px;
    background-size: 4px 4px;
}

.red-icon {
    color: $tall-poppy;
}

.blue-icon {
    color: $cyan-aqua;
}

.layer {
    color: gray; /* テキストの色をグレーに設定 */
    font-size: 1.5rem; /* テキストサイズを小さく */
    text-align: center; /* テキストを中央揃え */
    /* テキストの中央配置を補助 */
    display: flex;
    align-items: center;
    justify-content: center;
}

.correct-text {
    color: white; /* テキストの色を白に設定 */
}

.incorrect-text {
    color: red; /* テキストの色を赤に設定 */
}
</style>
