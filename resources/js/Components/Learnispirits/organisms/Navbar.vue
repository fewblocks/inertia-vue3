<!-- @v overview: ナビゲーションバー -->
<!-- @v complecate: メディアクエリ系のロジック多数 -->
<script setup lang="ts">
import { breakpoints } from '@/utils/breakpoints'
import { ref, computed, onMounted, onUnmounted, watch, watchEffect } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { useNavbarScroll } from '@/Composable/useNavbarScroll'

/** TODO: タイプファイル別切り出し */
type Breakpoints = keyof typeof breakpoints // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
/** メディアクエリーの判別値(windowオブジェクト) */
const mediaQuery = window.matchMedia(`(max-width : ${breakpoints.md})`)
const isScreenMiddle = ref(mediaQuery.matches)

/** テキスト寄せ判定 */
const textAlign = computed(() => (isScreenMiddle.value ? 'left' : 'center'))
const urlState = ref('')

const page = usePage()
watchEffect(() => {
    urlState.value = page.url
})

/** windowオブジェクトにリスナーを設定（メディアクエリー判別値随時更新） */
const update = (event: { matches: boolean }) => (isScreenMiddle.value = event.matches)
onMounted(() => mediaQuery.addEventListener('change', update))
onUnmounted(() => mediaQuery.removeEventListener('change', update))

//** クイズページのみヘッダー表示非表示制御 */
const isQuizPage = computed(() => urlState.value === '/learnispirits/line-quiz')
const { initScrollHandler, cleanup } = useNavbarScroll(isQuizPage)
onMounted(() => {
    initScrollHandler()
})
onUnmounted(() => {
    cleanup()
})
</script>

<template>
    <!-- 「navbar-expand-md」 md以下のサイズのみトグルボタン表示 -->
    <nav id="navbar" class="navbar fixed-top navbar-expand-md navbar-light" role="navigation">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Learnispirits</a>
            <!-- 「data-bs-target」="#切り替え表示されるコンテンツ名" -->
            <!-- 「aria-controls」="切り替え表示されるコンテンツ名" -->
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#learnispirits-menu"
                aria-controls="learnispirits-menu"
                aria-expanded="false"
                aria-label="navigation-toggle"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between px-3" id="learnispirits-menu">
                <div class="navbar-nav navbar-collapse justify-content-between">
                    <!-- 等間隔でない場合は w-100 nav-justified 除去-->
                    <ul class="navbar-nav me-auto w-50 nav-justified text-align">
                        <li class="nav-item active">
                            <a class="nav-link" href="/learnispirits/line-quiz">クイズ</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/learnispirits/aphorism">名言石碑</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#">コレクション</a>
                        </li>
                    </ul>
                </div>

                <div class="col-auto">
                    <!-- 等間隔でない場合は w-100 nav-justified 除去-->
                    <ul class="navbar-nav me-auto w-100 nav-justified text-align">
                        <li class="nav-item active">
                            <button class="btn btn-primary my-2 my-sm-0 w" type="submit">ログイン</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.text-align .nav-item {
    text-align: v-bind(textAlign);
}

.fixed-top {
    width: 100vw;
    background-color: $scotch-mist;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
    transition: top 0.3s ease-in-out;
}
</style>
