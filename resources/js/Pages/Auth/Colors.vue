<template>
    <div>
        <h1>Colors</h1>

        <h1>Common</h1>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in colors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>
        <h1>Top</h1>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in colors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>
        <h1>Quiz</h1>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in colors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>
        <h1>Ahorism</h1>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in colors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>

        <h1>Collection</h1>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in colors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>

        <h1>Login</h1>
        <table>
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Variable Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="color in colors" :key="color.id">
                    <td :style="{ backgroundColor: color.value }"></td>
                    <td>{{ color.variable }}</td>
                    <td>{{ color.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { reactive } from 'vue'

export default {
    setup() {
        const colors = reactive([
            { id: 1, value: '#ff0000', variable: 'red', description: 'Represents passion and intensity' },
            { id: 2, value: '#00ff00', variable: 'green', description: 'Symbolizes nature and freshness' },
            { id: 3, value: '#0000ff', variable: 'blue', description: 'Associated with calmness and serenity' }
            // Add more colors here
        ])

        return {
            colors
        }
    }
}
</script>

<style lang="sass" scoped>
table
    width: 100%
    border-collapse: collapse

th, td
    padding: 10px
    border: 1px solid #ccc

td:first-child
    width: 50px
</style>
