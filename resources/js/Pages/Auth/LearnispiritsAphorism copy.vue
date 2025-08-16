<script setup>
import SpeechBalloons from "@/Components/speech-balloon/organisms/SpeechBallons.vue";
import AphorismMenu from "@/Components/Learnispirits/molecules/AphorismMenu.vue";
import AphorismVisual from "@/Components/Learnispirits/organisms/AphorismVisual.vue";
import AphorismText from "@/Components/Learnispirits/molecules/AphorismText.vue";

import { ref } from "vue";
const hover = ref(false);
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
            <AphorismText>
                <!-- 英文 -->
                <template #english
                    ><div
                        class="text mt-auto mb-auto"
                        style="height: fit-content"
                    >
                        {{
                            "Don't Worry We shell have wonderful dreams,and when we wake up it'll be spring"
                        }}
                    </div></template
                >
                <!-- 日本文 -->
                <template #japanese
                    ><div
                        class="text mt-auto mb-auto"
                        style="height: fit-content"
                    >
                        {{
                            "心配しなくていい、僕らは素晴らしい夢を見るから。そして目覚めたらもう春だよ。"
                        }}
                    </div></template
                >

                <!-- 引用 -->
                <template #quote
                    ><div
                        class="text mt-auto mb-auto"
                        style="height: fit-content"
                    >
                        {{ "ジョジョの奇妙な冒険、コミックス 12巻" }}
                    </div></template
                >
            </AphorismText>
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
