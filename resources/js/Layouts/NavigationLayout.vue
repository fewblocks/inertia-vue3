<script setup>
import Navbar from '@/Components/Learnispirits/organisms/Navbar.vue'
import MainVisual from '@/Components/Learnispirits/organisms/MainVisual.vue'
import FooterBar from '@/Components/Learnispirits/organisms/FooterBar.vue'
</script>

<template>
    <header>
        <!-- Topページのみメインビジュアル表示 -->
        <template v-if="route().current() === 'learnispirits.top'">
            <MainVisual />
        </template>
    </header>
    <Navbar />
    <div class="main-content">
        <div class="row gx-0" style="display: flex; justify-content: flex-start; max-width: 100%">
            <slot />
        </div>
    </div>
    <!-- フッター -->
    <footer class="footer container-fluid mt-auto">
        <FooterBar />
    </footer>
</template>
<style lang="scss" scoped>
.footer {
    max-width: 100%;
    position: relative;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 300px;
    background-color: $emperor;
    display: flex;
    justify-content: center;
}
.main-content {
    max-width: 1280px;
    /* TODO: 暫定値、モバイル対応のEため正式な設定値が必要 */
    min-width: 375px;
    margin: 0 auto;
}
</style>
