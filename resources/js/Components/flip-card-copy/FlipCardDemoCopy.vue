<!-- フリップカードデモコンポーネント -->
<script setup lang="ts">
import CardSlider3D from '@/Components/flip-card-copy/organisms/CardSlider3D.vue'
import CardSlider2D from '@/Components/flip-card-copy/organisms/CardSlider2D.vue'
import { ref } from 'vue'
import axios from 'axios'
import { defineProps } from 'vue'

const props = defineProps<{
    lines: {
        // japanese_line: string
        // english_line: string
    }
}>()

const cardData = ref([])
const show = ref(false)
// const getDummyData = () => {
//     // TODO: envファイル定数化
//     axios
//         .get('http://[::1]:5173/resources/js/json/b.json')
//         .then((response) => {
//             // 仮データ作成
//             // 最初の4つのデータのみを取得
//             cardData.value = response.data.cardData.slice(0, 5)
//             console.log(cardData.value)
//             show.value = true
//         })
//         .catch((error) => console.log(error))
// }
// getDummyData()

// [{
//     "ja": "いち",
//     "en": "one",
//     "id": 1,
//     "flip": false
// },
// {
//     "ja": "に",
//     "en": "two",
//     "id": 2,
//     "flip": false
// }
// ]
// console.log(props.lines, 'props.lines')

// [
//     {
//         "id": 1,
//         "character": {
//             "id": 11,
//             "japanese_name": "ディオ・ブランドー",
//             "english_name": null,
//             "created_at": "2024-08-12T06:52:04.000000Z",
//             "updated_at": "2024-08-12T06:52:04.000000Z",
//             "deleted_at": null
//         },
//         "line": {
//             "id": 1,
//             "character_id": 11,
//             "japanese_line": "貴様は今までに食べたパンの枚数を覚えているか",
//             "english_line": "did you remember how many ...",
//             "feeling": "happy",
//             "difficulty": false,
//             "volume": 1,
//             "created_at": "2024-08-13T06:53:34.000000Z",
//             "updated_at": "2024-08-13T06:53:34.000000Z",
//             "deleted_at": null,
//             "collections_count": 0,
//             "character": {
//                 "id": 11,
//                 "japanese_name": "ディオ・ブランドー",
//                 "english_name": null,
//                 "created_at": "2024-08-12T06:52:04.000000Z",
//                 "updated_at": "2024-08-12T06:52:04.000000Z",
//                 "deleted_at": null
//             }
//         },
//         "feeling": "happy",
//         "has_current_item": false,
//         "console_log_user_id_is_existing": 1,
//         "isCorrect": false,
//         "isPickUp": false,
//         "hasCurrentItem": false
//     },
// ]
//     {
//         "id": 2,
//         "character": {
//             "id": 11,
//             "japanese_name": "ディオ・ブランドー",
//             "english_name": null,
//             "created_at": "2024-08-12T06:52:04.000000Z",
//             "updated_at": "2024-08-12T06:52:04.000000Z",
//             "deleted_at": null
//         },
//         "line": {
//             "id": 2,
//             "character_id": 11,
//             "japanese_line": "無駄、無駄",
//             "english_line": "useless, useless",
//             "feeling": "angry",
//             "difficulty": false,
//             "volume": 1,
//             "created_at": "2024-08-13T06:54:12.000000Z",
//             "updated_at": "2024-08-13T06:54:12.000000Z",
//             "deleted_at": null,
//             "collections_count": 1,
//             "character": {
//                 "id": 11,
//                 "japanese_name": "ディオ・ブランドー",
//                 "english_name": null,
//                 "created_at": "2024-08-12T06:52:04.000000Z",
//                 "updated_at": "2024-08-12T06:52:04.000000Z",
//                 "deleted_at": null
//             }
//         },
//         "feeling": "angry",
//         "has_current_item": true,
//         "console_log_user_id_is_existing": 1,
//         "isCorrect": false,
//         "isPickUp": false,
//         "hasCurrentItem": true
//     },
//     {
//         "id": 3,
//         "character": {
//             "id": 11,
//             "japanese_name": "ディオ・ブランドー",
//             "english_name": null,
//             "created_at": "2024-08-12T06:52:04.000000Z",
//             "updated_at": "2024-08-12T06:52:04.000000Z",
//             "deleted_at": null
//         },
//         "line": {
//             "id": 3,
//             "character_id": 11,
//             "japanese_line": "俺は人間をやめるぞ、ジョジョ",
//             "english_line": "I quit the human jojo",
//             "feeling": "sad",
//             "difficulty": false,
//             "volume": 1,
//             "created_at": "2024-08-13T06:54:39.000000Z",
//             "updated_at": "2024-08-13T06:54:39.000000Z",
//             "deleted_at": null,
//             "collections_count": 1,
//             "character": {
//                 "id": 11,
//                 "japanese_name": "ディオ・ブランドー",
//                 "english_name": null,
//                 "created_at": "2024-08-12T06:52:04.000000Z",
//                 "updated_at": "2024-08-12T06:52:04.000000Z",
//                 "deleted_at": null
//             }
//         },
//         "feeling": "sad",
//         "has_current_item": true,
//         "console_log_user_id_is_existing": 1,
//         "isCorrect": false,
//         "isPickUp": false,
//         "hasCurrentItem": true
//     },
//     {
//         "id": 4,
//         "character": {
//             "id": 95,
//             "japanese_name": "吉良吉影",
//             "english_name": null,
//             "created_at": "2024-08-12T06:52:04.000000Z",
//             "updated_at": "2024-08-12T06:52:04.000000Z",
//             "deleted_at": null
//         },
//         "line": {
//             "id": 4,
//             "character_id": 95,
//             "japanese_line": "質問を質問で返すなあーっ!! 疑問文には疑問文で答えろと学校で教えているのか？",
//             "english_line": "Don't answer questions with questions!! Do they teach you to answer questions with questions in school?",
//             "feeling": "sad",
//             "difficulty": false,
//             "volume": 1,
//             "created_at": "2024-08-13T07:11:52.000000Z",
//             "updated_at": "2024-08-13T07:11:52.000000Z",
//             "deleted_at": null,
//             "collections_count": 0,
//             "character": {
//                 "id": 95,
//                 "japanese_name": "吉良吉影",
//                 "english_name": null,
//                 "created_at": "2024-08-12T06:52:04.000000Z",
//                 "updated_at": "2024-08-12T06:52:04.000000Z",
//                 "deleted_at": null
//             }
//         },
//         "feeling": "sad",
//         "has_current_item": false,
//         "console_log_user_id_is_existing": 1,
//         "isCorrect": false,
//         "isPickUp": false,
//         "hasCurrentItem": false
//     },
//     {
//         "id": 5,
//         "character": {
//             "id": 106,
//             "japanese_name": "ジョルノ・ジョバァーナ",
//             "english_name": null,
//             "created_at": "2024-08-12T06:52:04.000000Z",
//             "updated_at": "2024-08-12T06:52:04.000000Z",
//             "deleted_at": null
//         },
//         "line": {
//             "id": 5,
//             "character_id": 106,
//             "japanese_line": "子供に麻薬を流すようなギャングを消し去るには、自らがギャングにならなくっちゃあいけないって事さ",
//             "english_line": "In order to eliminate gangs that drug children, you have to become a gang yourself.",
//             "feeling": "sad",
//             "difficulty": false,
//             "volume": 1,
//             "created_at": "2024-08-13T07:12:48.000000Z",
//             "updated_at": "2024-08-13T07:12:48.000000Z",
//             "deleted_at": null,
//             "collections_count": 0,
//             "character": {
//                 "id": 106,
//                 "japanese_name": "ジョルノ・ジョバァーナ",
//                 "english_name": null,
//                 "created_at": "2024-08-12T06:52:04.000000Z",
//                 "updated_at": "2024-08-12T06:52:04.000000Z",
//                 "deleted_at": null
//             }
//         },
//         "feeling": "sad",
//         "has_current_item": false,
//         "console_log_user_id_is_existing": 1,
//         "isCorrect": false,
//         "isPickUp": false,
//         "hasCurrentItem": false
//     },
//     {
//         "id": 6,
//         "character": {
//             "id": 140,
//             "japanese_name": "空条徐倫",
//             "english_name": null,
//             "created_at": "2024-08-12T06:52:04.000000Z",
//             "updated_at": "2024-08-12T06:52:04.000000Z",
//             "deleted_at": null
//         },
//         "line": {
//             "id": 6,
//             "character_id": 140,
//         }
//     }
// ]
const selectedTab = ref('3d')
const convertToCardFormat = (lines) => {
    return lines.map((item) => ({
        ja: item.line.japanese_line,
        en: item.line.english_line,
        id: item.id,
        flip: false
    }))
}
cardData.value = convertToCardFormat(props.lines)
show.value = true
console.log(cardData.value, 'cardData.value')

const tabs = {
    '3d': CardSlider3D,
    '2d': CardSlider2D
}

/** 3D => 2D フリップカード切り替え機構*/
const changeComponent = () => {
    if (selectedTab.value === '3d') {
        selectedTab.value = '2d'
        return
    }
    if (selectedTab.value === '2d') {
        selectedTab.value = '3d'
        return
    }
}
</script>

<template>
    <div class="flip-card-demo-wrapper">
        <div class="flip-card-demo col-9">
            <template v-if="show">
                <component :is="tabs[selectedTab]" :card-data="cardData"></component>
            </template>
            <button class="btn btn-primary" v-on:click="changeComponent">変更</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
    background-color: $jagged-ice;
    padding-top: 30px;
}
</style>
