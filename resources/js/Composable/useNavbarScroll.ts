// @v overview: ナビゲーションバーのスクロール制御Composable
import { ref, Ref } from 'vue'
export const useNavbarScroll = (isQuizPage: Ref<boolean>) => {
    const prevScrollpos = ref(window.pageYOffset)
    const initScrollHandler = () => {
        window.onscroll = () => {
            // クイズページのみナビゲーターヘッダーの表示/非表示を制御
            if (!isQuizPage.value) {
                document.getElementById('navbar').style.top = '0'
                return
            }

            const currentScrollPos = window.pageYOffset
            if (prevScrollpos.value > currentScrollPos) {
                document.getElementById('navbar').style.top = '0'
            } else {
                document.getElementById('navbar').style.top = '-100px'
            }
            prevScrollpos.value = currentScrollPos
        }
    }

    // クリーンアップ関数を返す
    const cleanup = () => {
        window.onscroll = null
    }

    return {
        initScrollHandler,
        cleanup
    }
}
