<!-- @v overview: サイドナビゲーションリスト -->
<script setup lang="ts">
defineProps<{
    /** スマホか否か */
    isSp?: boolean
}>()
</script>

<template>
    <ul>
        <li>
            <a href="#">Link 1</a>
        </li>
        <li>
            <a href="#">Link 2</a>
        </li>
        <li>
            <a href="#">Link 3</a>
        </li>
        <li>
            <a href="#">Link 4</a>
        </li>
        <li>
            <a href="#">Link 5</a>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
ul {
    list-style: none;
    padding: 0;
}

li {
    margin: 1rem 0;
}

a {
    text-decoration: none;
    color: inherit;
    &:hover {
        text-decoration: underline;
    }
}
</style>
