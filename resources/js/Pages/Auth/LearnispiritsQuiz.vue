<script setup>
import SpeechBalloons from "@/Components/speech-balloon/organisms/SpeechBallons.vue";
import AphorismMenu from "@/Components/Learnispirits/molecules/AphorismMenu.vue";
import AphorismVisual from "@/Components/Learnispirits/organisms/AphorismVisual.vue";
import AphorismText from "@/Components/Learnispirits/molecules/AphorismText.vue";

import { ref } from "vue";
const hover = ref(false);

const props = defineProps({
    lines: Array,
});
</script>

<!-- トップページ -->

<template>
    <main class="col-sm-12 col-md-9">
        <section>
            <div style="margin-top: 56px">
                <!-- 名言石碑メニュー -->
                <AphorismMenu />
                <!-- 石碑ビジュアル -->
                <AphorismVisual />
            </div>
        </section>
        <section>
            <!-- 石碑テキスト -->
            aaa
            <ul v-for="line in lines" :key="line.id">
                <li>{{ line.some_line_field }}</li>
                <li>{{ line.character.japanese_name }}</li>
                <li>{{ line.character.english_name }}</li>
                <li>{{ line.japanese_line }}</li>
                <li>{{ line.english_line }}</li>
            </ul>
            <AphorismText>
                <!-- 石碑説明文 -->
                <template #description
                    ><div
                        class="text mt-auto mb-auto"
                        style="height: fit-content"
                    >
                        {{
                            "追いつめられた場面で思わず叫んだこのセリフもともとは友達をかばって出たセリフでした、こんな勇敢な人生を歩んでいきたいですね。適当な文章ですね。"
                        }}
                    </div></template
                >
            </AphorismText>
        </section>
        <section>
            <!-- デフォルト、ホバー用呼び込み文 -->
            <template v-if="!hover">
                <transition name="slide-fade" appear>
                    <div
                        class="card text-bg-secondary mb-3"
                        style="max-width: 18rem"
                        v-on:mouseover="hover = true"
                    >
                        <div class="card-header">クイズに挑戦</div>
                        <div class="card-body">
                            <h5 class="card-title">英語の名言クイズ</h5>
                            <p class="card-text">
                                あのキャラのあのセリフの英和クイズに挑戦しよう！！
                            </p>
                        </div>
                    </div>
                </transition>
            </template>
            <!-- ホバー時表示、吹き出し -->
            <template v-else>
                <SpeechBalloons v-on:mouseleave="hover = false" />
            </template>
        </section>
    </main>
    <aside class="col-sm-12 col-md-3" style="margin-top: 56px">
        aside-content
    </aside>
</template>

<style scoped>
aside {
    background-color: #ffcc27;
}
</style>
