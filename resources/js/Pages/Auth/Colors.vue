<template>
    <div>
        <h1>Colors</h1>

        <h2>Common</h2>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>White</th>
                    <th>Black</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in commonColors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td :style="{ backgroundColor: color.value, color: '#ffffff' }">White</td>
                    <td :style="{ backgroundColor: color.value, color: '#000000' }">Black</td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>

        <h2>Top</h2>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>White</th>
                    <th>Black</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in topColors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td :style="{ backgroundColor: color.value, color: '#ffffff' }">White</td>
                    <td :style="{ backgroundColor: color.value, color: '#000000' }">Black</td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>

        <h2>Quiz</h2>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>White</th>
                    <th>Black</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in quizColors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td :style="{ backgroundColor: color.value, color: '#ffffff' }">White</td>
                    <td :style="{ backgroundColor: color.value, color: '#000000' }">Black</td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>

        <h2>Aphorism</h2>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>White</th>
                    <th>Black</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in aphorismColors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td :style="{ backgroundColor: color.value, color: '#ffffff' }">White</td>
                    <td :style="{ backgroundColor: color.value, color: '#000000' }">Black</td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>

        <h2>Collection</h2>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>White</th>
                    <th>Black</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in collectionColors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td :style="{ backgroundColor: color.value, color: '#ffffff' }">White</td>
                    <td :style="{ backgroundColor: color.value, color: '#000000' }">Black</td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>

        <h2>Login</h2>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>White</th>
                    <th>Black</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in loginColors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td :style="{ backgroundColor: color.value, color: '#ffffff' }">White</td>
                    <td :style="{ backgroundColor: color.value, color: '#000000' }">Black</td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import colorsData from '@/json/output.json'
import { ColorsData } from '@/types/Colors'
// Remove the duplicate import statement for 'ColorsData'

// JSONデータを型付きでインポート
const data: ColorsData = colorsData || { colors: [] }

const getColorValue = (name) => {
    console.log(data.colors.find((color) => color.name === name))
    return data.colors.find((color) => color.name === name).value
}
// const color = ref('')
// const sunglow = data.colors.find((color) => color.name === props.color)
// if (sunglow) {
//     color.value = sunglow.value
//     console.log(color.value)
// }

const commonColors = reactive([
    { id: 1, value: getColorValue('sunglow'), variable: 'sunglow', description: '広告表示用' },
    { id: 2, value: getColorValue('green'), variable: 'green', description: 'Symbolizes nature and freshness' },
    {
        id: 3,
        value: getColorValue('cornflower-blue'),
        variable: 'cornflower-blue',
        description: 'Associated with calmness and serenity'
    }
])
const topColors = reactive([
    { id: 1, value: getColorValue('jagged-ice'), variable: 'jagged-ice', description: 'フリップカードデモ用背景' },
    { id: 2, value: getColorValue('snuff'), variable: 'snuff', description: 'ニュースカードの背景' },
    { id: 3, value: getColorValue('mine-shaft'), variable: 'mine-shaft', description: 'ニュースカードのボーダー' },
    { id: 4, value: getColorValue('snuff'), variable: 'snuff', description: '姉妹サイトカード1' },
    { id: 5, value: getColorValue('mindaro'), variable: 'mindaro', description: '姉妹サイトカード2' },
    { id: 6, value: getColorValue('perfume'), variable: 'perfume', description: '姉妹サイトカード2' },
    { id: 7, value: getColorValue('emperor'), variable: 'emperor', description: 'フッター' },
    { id: 8, value: getColorValue('scotch-mist'), variable: 'scotch-mist', description: 'ナビゲーションバー' }
])
const quizColors = reactive([
    { id: 1, value: getColorValue('red'), variable: 'red', description: 'カードの設定色' },
    { id: 2, value: getColorValue('cornflower-blue'), variable: 'cornflower-blue', description: 'カードの設定色' },
    { id: 3, value: getColorValue('spicy-pink'), variable: 'spicy-pink', description: 'カードの設定色' },
    { id: 4, value: getColorValue('yellow'), variable: 'yellow', description: 'カードの設定色' },
    { id: 5, value: getColorValue('flirt'), variable: 'flirt', description: 'カードの設定色' },
    { id: 6, value: getColorValue('web-orange'), variable: 'web-orange', description: 'カードの設定色' },
    { id: 7, value: getColorValue('pink'), variable: 'pink', description: 'カードの設定色' },
    { id: 8, value: getColorValue('mexican-red'), variable: 'mexican-red', description: 'カードの設定色' },
    { id: 9, value: getColorValue('dusty-gray'), variable: 'dusty-gray', description: 'カードの設定色' },
    { id: 10, value: getColorValue('white'), variable: 'white', description: 'カードの設定色' },
    { id: 11, value: getColorValue('cyan-aqua'), variable: 'cyan-aqua', description: 'カードの設定色' },
    { id: 12, value: getColorValue('magenta-fuchsia'), variable: 'magenta-fuchsia', description: 'カードの設定色' },
    { id: 13, value: getColorValue('green'), variable: 'green', description: 'カードの設定色' },
    { id: 14, value: getColorValue('tall-poppy'), variable: 'tall-poppy', description: 'カードの設定色' },
    { id: 15, value: getColorValue('blue-bell'), variable: 'blue-bell', description: 'カードの設定色' },
    { id: 16, value: getColorValue('olive'), variable: 'olive', description: 'カードの設定色' },
    { id: 17, value: getColorValue('teal'), variable: 'teal', description: 'カードの設定色' },
    { id: 18, value: getColorValue('lavender-magentao'), variable: 'lavender-magentao', description: 'カードの設定色' },
    { id: 19, value: getColorValue('purple-heart'), variable: 'purple-heart', description: 'カードの設定色' },
    { id: 20, value: getColorValue('gold'), variable: 'gold', description: 'カードの設定色' },
    { id: 21, value: getColorValue('silver'), variable: 'silver', description: 'カードの設定色' },
    { id: 22, value: getColorValue('brandy-punch'), variable: 'brandy-punch', description: 'カードの設定色' },
    { id: 23, value: getColorValue('coral'), variable: 'coral', description: 'カードの設定色' },
    { id: 24, value: getColorValue('salmon'), variable: 'salmon', description: 'カードの設定色' },
    { id: 25, value: getColorValue('khaki'), variable: 'khaki', description: 'カードの設定色' },
    { id: 26, value: getColorValue('moon-raker'), variable: 'moon-raker', description: 'カードの設定色' },
    { id: 27, value: getColorValue('peach'), variable: 'peach', description: 'カードの設定色' },
    { id: 28, value: getColorValue('light-orchi'), variable: 'light-orchi', description: 'カードの設定色' },
    { id: 29, value: getColorValue('orchid'), variable: 'orchid', description: 'カードの設定色' },
    { id: 30, value: getColorValue('mint-green'), variable: 'mint-green', description: 'カードの設定色' },
    { id: 31, value: getColorValue('malachite'), variable: 'malachite', description: 'スタンプ正解' },
    { id: 32, value: getColorValue('red-damask'), variable: 'red-damask', description: 'スタンプ不正解' },
    {
        id: 33,
        value: getColorValue('sugar-cane'),
        variable: 'sugar-cane',
        description: 'クイズアプリケーションバックグラウンドカラー'
    },
    { id: 34, value: getColorValue('caper'), variable: 'caper', description: '英語ブロック背景' }
])

const aphorismColors = reactive([
    { id: 1, value: '#ff0000', variable: 'red', description: 'Represents passion and intensity' },
    { id: 2, value: '#00ff00', variable: 'green', description: 'Symbolizes nature and freshness' },
    { id: 3, value: '#0000ff', variable: 'blue', description: 'Associated with calmness and serenity' }
])
const collectionColors = reactive([
    { id: 1, value: '#ff0000', variable: 'red', description: 'Represents passion and intensity' },
    { id: 2, value: '#00ff00', variable: 'green', description: 'Symbolizes nature and freshness' },
    { id: 3, value: '#0000ff', variable: 'blue', description: 'Associated with calmness and serenity' }
])
const loginColors = reactive([
    { id: 1, value: '#ff0000', variable: 'red', description: 'Represents passion and intensity' },
    { id: 2, value: '#00ff00', variable: 'green', description: 'Symbolizes nature and freshness' },
    { id: 3, value: '#0000ff', variable: 'blue', description: 'Associated with calmness and serenity' }
])
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    color: #ff0000;
}

th,
td {
    padding: 10px;
    border: 1px solid #ccc;
}

td:first-child {
    width: 50px;
}
</style>
