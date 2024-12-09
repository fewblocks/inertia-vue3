<script setup lang="ts">
import Navbar from '@/Components/Learnispirits/organisms/Navbar.vue'
import MainVisual from '@/Components/Learnispirits/organisms/MainVisual.vue'
import FooterBar from '@/Components/Learnispirits/organisms/FooterBar.vue'

import { usePage } from '@inertiajs/vue3'

const { props: shareProps } = usePage()

// const addressData = (shareProps.value as { address: { country: string; state: string; city: string } }).address
console.log(shareProps.address.country)
// Define the type for the shared props
interface SharedProps {
    address: {
        country: string
        state: string
        city: string
    }
}

// Cast the shared props to the defined type
const addressData = (shareProps as unknown as SharedProps).address
console.log(addressData.country)
console.log(addressData.state)
console.log(addressData.city)

const props = defineProps<{
    auth: {
        user: string
    }
    address: {
        country: string
        state: string
        city: string
    }
}>()

const userName = props.auth?.user ? props.auth.user : 'ゲスト'
const address = `${props.address}`
const a = route().current('learnispirits.top')
console.log(a)
</script>

<template>
    <header>
        <!-- Topページのみメインビジュアル表示 -->
        <template v-if="route().current('learnispirits.top')">
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
        <div class="footer-content">
            <FooterBar>
                <template #userName> {{ addressData.country }} </template>
                <template #address> {{ addressData.city }} </template>
            </FooterBar>
        </div>
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
    height: 50px; /* 初期の高さを一行分に設定 */
    background-color: $emperor;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* コンテンツがはみ出さないようにする */
    transition: height 0.3s ease; /* 高さのトランジションを追加 */
}

.footer:hover {
    height: 300px; /* ホバー時の高さを設定 */
}

.footer-content {
    width: 100%; /* フッターコンテンツの幅を100%に設定 */
    transition: opacity 0.3s ease; /* 不透明度のトランジションを追加 */
    opacity: 0; /* 初期状態では非表示 */
}

.footer:hover .footer-content {
    opacity: 1; /* ホバー時に表示 */
}

.main-content {
    max-width: 1280px;
    /* TODO: 暫定値、モバイル対応のため正式な設定値が必要 */
    min-width: 375px;
    margin: 0 auto;
}
</style>
