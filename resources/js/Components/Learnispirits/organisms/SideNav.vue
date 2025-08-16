<!-- @v overview: サイドナビゲーションコンポーネント -->
<script setup lang="ts">
import SideNavList from '@/Components/Learnispirits/molecules/SideNavList.vue'
</script>

<template>
    <section class="sidebar-sticky">
        <!-- TODO: タイトル除去 -->
        <h4>Sidebar</h4>
        <!-- Navigation links in sidebar-->
        <SideNavList />
    </section>
</template>

<style lang="scss" scoped>
.sidebar-sticky {
    z-index: 5;
    position: sticky;
    top: 56px; // ナビバーの高さに合わせる
    height: fit-content;
    padding-top: 1rem;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
