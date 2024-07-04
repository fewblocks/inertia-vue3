<!-- フリップカードデモコンポーネント -->
<script setup lang="ts">
import CardSlider3D from "@/Components/flip-card/organisms/CardSlider3D.vue";
import CardSlider2D from "@/Components/flip-card/organisms/CardSlider2D.vue";
import { ref } from "vue";
import axios from "axios";
const cardData = ref([]);
const show = ref(false);
const getDummyData = () => {
    // TODO: envファイル定数化
    axios
        .get("http://[::1]:5173/resources/js/json/b.json")
        .then((response) => {
            // 仮データ作成
            cardData.value = response.data.cardData;
            show.value = true;
        })
        .catch((error) => console.log(error));
};
getDummyData();
const selectedTab = ref("3d");

const tabs = {
    "3d": CardSlider3D,
    "2d": CardSlider2D,
};

/** 3D => 2D フリップカード切り替え機構*/
const changeComponent = () => {
    if (selectedTab.value === "3d") {
        selectedTab.value = "2d";
        return;
    }
    if (selectedTab.value === "2d") {
        selectedTab.value = "3d";
        return;
    }
};
</script>

<template>
    <div class="flip-card-demo-wrapper">
        <div class="flip-card-demo col-9">
            <template v-if="show">
                <component
                    :is="tabs[selectedTab]"
                    :card-data="cardData"
                ></component>
            </template>
            <button class="btn btn-primary" v-on:click="changeComponent">
                変更
            </button>
        </div>
    </div>
</template>

<style scoped>
@media (577px <= width) {
    .flip-card-demo {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        height: 400px;
    }
}
@media (0px <= width <= 576px) {
    .flip-card-demo {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        height: 250px;
    }
}
.flip-card-demo-wrapper {
    width: 100%;
    background-color: rgb(190, 233, 233);
    padding-top: 30px;
}
</style>
