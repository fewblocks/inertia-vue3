<!-- @v overview: ログインユーザー画面用のレイアウトファイル -->
<!-- ナビゲーションを作成する -->
<!-- https://www.geeksforgeeks.org/bootstrap/how-to-use-top-navigation-with-left-navigation-bar-using-bootstrap/ -->
<script setup lang="ts">
import Navbar from '@/Components/Learnispirits/organisms/Navbar.vue'
import MainVisual from '@/Components/Learnispirits/organisms/MainVisual.vue'
import FooterBar from '@/Components/Learnispirits/organisms/FooterBar.vue'
import SideNav from '@/Components/Learnispirits/organisms/SideNav.vue'
import { breakpoints } from '@/utils/breakpoints'
import { ref, onMounted, onUnmounted } from 'vue'
import { usePage } from '@inertiajs/vue3'

/** メディアクエリーの判別値(windowオブジェクト) */
const mediaQuery = window.matchMedia(`(min-width: ${breakpoints.md})`)
/** スクリーンmiddle 以上判定 */
const isScreenWide = ref(mediaQuery.matches)

const update = (event: MediaQueryListEvent) => {
    isScreenWide.value = event.matches
}

onMounted(() => {
    /** 初期値を設定 */
    isScreenWide.value = mediaQuery.matches
    /** windowオブジェクトにリスナーを設定 */
    mediaQuery.addEventListener('change', update)
})

onUnmounted(() => {
    mediaQuery.removeEventListener('change', update)
})

const { props: shareProps } = usePage()
interface SharedProps {
    address: {
        country: string
        state: string
        city: string
    }
}

// Cast the shared props to the defined type
const addressData = (shareProps as unknown as SharedProps).address

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

// TODO: url系はコメントとユースケースとして将来に残す
const userName = props.auth?.user ? props.auth.user : 'ゲスト'
const address = `${props.address}`
const a = route().current('learnispirits.top')

const trueBox = () => {
    return route().current('learnispirits.top')
}

const b = route().current('learnispirits.top')
console.log(a)
</script>

<template>
    <Navbar />
    <div class="container-fluid wrapper" style="height: 100%; padding-top: 56px; prdding-right: 0px !important">
        <div class="row" style="height: 100%">
            <!-- PC表示時のサイドナビ -->
            <div v-show="isScreenWide" class="col-2" id="green">
                <SideNav />
            </div>

            <!-- メインコンテンツ -->
            <div :class="isScreenWide ? 'col-10' : 'col-12'">
                <div class="row gx-0 main-content" style="display: flex; justify-content: flex-start">
                    <slot />
                </div>
            </div>
        </div>

        <!-- フッター -->
        <footer class="footer container-fluid mt-auto">
            <div class="footer-content">
                <FooterBar>
                    ssss
                    <template #userName> {{ addressData.country }} </template>
                    <template #address> {{ addressData.city }} </template>
                </FooterBar>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    padding-left: 0 !important;
}

.sidebar-content {
    margin-top: 100px;
    position: relative;
    padding: 1rem;
}

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
    /* max-width: 800px; */
    /* TODO: 暫定値、モバイル対応のため正式な設定値が必要 */
    min-width: 375px;
}
</style>
