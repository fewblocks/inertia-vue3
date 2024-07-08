<!-- 吹き出しコンポーネント -->
<script type="ts" setup>
import SpeechBalloon from "@/components/speech-balloon/molecules/SpeechBallon.vue";
import useCreateSpeechBalloonDate from "@/composable/useCreateSpeechBalloonDate"

// セリフ配列宣言
const lines = [
    "あああああああああああああああああああああ",
    "あああああああああああああああああああああああああああああ",
    "あああああああああああああああああああああああああああああああああ",
    "あああああああああああああああああああああああああああああああああああああああ",
    "ああああああああああああああああああああああああああああああああああああああああああ",
    "ああああああああああああああああああああああああああああああああああああああああああああ",
    "あああああああああああ",
    "ああああああああああああああああああ",
    "あああああああああああああああああああああああ",
    "ああああああああああああああああああああああああああああああああ",
];
// 吹き出し用データ生成
const speechBalloonData = useCreateSpeechBalloonDate(lines);
</script>
<template>
    <div class="speech-balloon-content ml-auto mx-auto col-11">
        <!-- 吹き出し -->
        <template v-for="balllon in speechBalloonData" :key="balllon.id">
            <SpeechBalloon
                :id="balllon.id"
                :top="balllon.top"
                :left="balllon.left"
                :line="balllon.line"
                :directions="balllon.directions"
                :transform="balllon.transform"
            />
        </template>
    </div>
</template>

<style lang="scss" scoped>
.speech-balloon-content {
    position: relative;
    background-color: gray;
    height: 500px;
    padding-top: 100px;
    overflow: hidden;
}
</style>
