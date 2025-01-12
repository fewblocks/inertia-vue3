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
    <div class="font-wrapper">
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
            <template v-if="props.hasCurrentItem">
                <font-awesome-layers-text class="gray8" transform="up-0.5 shrink-6" value="済" />
            </template>
        </font-awesome-layers>
    </div>
</template>

<style lang="scss" scoped>
.font-wrapper {
    position: relative;
    width: fit-content;
}

.dottedText:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:
        radial-gradient(circle, transparent 30%, transparent 20%),
        radial-gradient(circle, transparent 20%, white 70%) 30px 30px;
    background-size: 4px 4px;
}

.red-icon {
    color: red;
}

.biue-icon {
    color: red;
}

.gray8 {
    color: gray; /* テキストの色をグレーに設定 */
    font-size: 1.5rem; /* テキストサイズを小さく */
    text-align: center; /* テキストを中央揃え */
    /* テキストの中央配置を補助 */
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
