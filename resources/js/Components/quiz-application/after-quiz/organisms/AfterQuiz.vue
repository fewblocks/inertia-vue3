<script setup lang="ts">
import { ref, computed, toRaw, reactive } from 'vue'
import OkIcon from '@/Components/quiz-application/after-quiz/atoms/OkIcon.vue'
import MissIcon from '@/Components/quiz-application/after-quiz/atoms/MissIcom.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import HeartIcon from '@/Components/quiz-application/after-quiz/atoms/HeartIcon.vue'
const props = defineProps<{
    lines: Array<{
        id: number
        character: {
            japanese_name: string
            english_name: string
        }
        line: {
            japanese_line: string
            english_line: string
        }
    }>
    collectQuizIds: Array<number>
}>()

// lines を reactive な変数に格納し、isCorrect, isPickUp, hasCurrentItem プロパティを追加
const reactiveLines = reactive(
    props.lines.map((line) => ({
        ...line,
        isCorrect: props.collectQuizIds.includes(line.id),
        isPickUp: false,
        hasCurrentItem: false
    }))
)

const className = (isCorrect: boolean) => {
    return isCorrect ? 'row correct-line w-100' : 'row incorrect-line w-100'
}

const pickUp = (id: number) => {
    reactiveLines.forEach((line) => {
        if (line.isCorrect) {
            if (line.id === id) {
                line.isPickUp = !line.isPickUp
            }
        }
    })
}
</script>
<template>
    <div class="w-100 d-flex justify-content-between flex-wrap row py-1 px-1">
        <template v-for="(line, index) in reactiveLines" :key="line.id">
            <div class="col-10 d-flex flex-wrap row">
                <div>
                    <div :class="className(collectQuizIds.includes(line.id))">
                        <div class="col-2">
                            <div class="col-1 text-top">
                                {{ index + 1 }}
                            </div>
                            <template v-if="collectQuizIds.includes(line.id)">
                                <OkIcon />
                            </template>
                            <template v-else>
                                <MissIcon />
                            </template>
                        </div>
                        <div class="col-10">
                            <ul>
                                <li>{{ line.line.japanese_line }}</li>
                                <li>{{ line.line.english_line }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <!--    explicit style -->
                <!-- <div class="font-wrapper">
                    <font-awesome-layers full-width class="fa-4x dottedText">
                        <font-awesome-icon :icon="['far', 'heart']" />
                        <font-awesome-layers-text class="gray8" transform="down-2 shrink-8" value="New!" />
                    </font-awesome-layers>
                </div> -->

                <HeartIcon
                    :isCorrect="line.isCorrect"
                    :isPickUp="line.isPickUp"
                    :hasCurrentItem="line.hasCurrentItem"
                    @click.native="pickUp(line.id)"
                />
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
/* スタイルをここに追加 */

.font-wrapper {
    position: relative;
}

.dottedText:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:
        radial-gradient(circle, transparent 50%, transparent 50%),
        radial-gradient(circle, transparent 20%, white 50%) 30px 30px;
    background-size: 4px 4px;
}

.correct-line,
.incorrect-line {
    margin: 5px 0;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    align-items: left;
    justify-content: flex-start;
}

.correct-line {
    background-color: green;
}
.incorrect-line {
    background-color: red;
}
</style>
