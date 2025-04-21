<script setup>
import { ref } from 'vue'
import axios from 'axios'

const getDummyData = () => {
    axios
        // a.json,b.json,c.json から選ぶ
        .get('src/assets/json/a.json')
        .then((response) => {
            // 仮データ作成
        })
        .catch((error) => console.log(error))
}
getDummyData()
</script>

<template>
    <div>こんにちは</div>
</template>

<style scoped></style>
