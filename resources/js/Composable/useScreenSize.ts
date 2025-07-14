// @v overview: メディアクエリーを使用してカードサイズを監視するComposable
// @v tips: Composition APIを使用して、画面サイズの変更を監視するComposable。matchMediaの書き方が便利
// @v complecate: メディアクエリーを使用する必要があるため、Vueのリアクティブな値を使用して、画面サイズに応じてカードの幅と高さを動的に計算する。
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { breakpoints } from '@/utils/breakpoints'
import { FLIP_CARD_WIDTH, FLIP_CARD_HEIGHT } from '@/Constants/FlipCardSize'

export const useScreenSize = () => {
    /**  メディアクエリーの判別値(windowオブジェクト) */
    const mediaQuerySmall = window.matchMedia(`(max-width : ${breakpoints.sm})`)
    const isScreenSmall = ref(mediaQuerySmall.matches)

    const mediaQueryMedium = window.matchMedia(`(max-width : ${breakpoints.md})`)
    const isScreenMedium = ref(mediaQueryMedium.matches)

    const mediaQueryLarge = window.matchMedia(`(max-width : ${breakpoints.lg})`)
    const isScreenLarge = ref(mediaQueryLarge.matches)

    // イベントハンドラー
    const updateSmall = (event: { matches: boolean }) => (isScreenSmall.value = event.matches)
    const updateMedium = (event: { matches: boolean }) => (isScreenMedium.value = event.matches)
    const updateLarge = (event: { matches: boolean }) => (isScreenLarge.value = event.matches)

    /** カード幅算出。メディアクエリー依存 */
    const cardWidth = computed(() => {
        if (isScreenSmall.value) {
            return FLIP_CARD_WIDTH.SMALL
        } else if (isScreenMedium.value) {
            return FLIP_CARD_WIDTH.MEDIUM
        } else if (isScreenLarge.value) {
            return FLIP_CARD_WIDTH.LARGE
        } else {
            return FLIP_CARD_WIDTH.EXTRA_LARGE
        }
    })
    /** カード高さ算出。メディアクエリー依存 */
    const cardHeight = computed(() => {
        if (isScreenSmall.value) {
            return FLIP_CARD_HEIGHT.SMALL
        } else if (isScreenMedium.value) {
            return FLIP_CARD_HEIGHT.MEDIUM
        } else if (isScreenLarge.value) {
            return FLIP_CARD_HEIGHT.LARGE
        } else {
            return FLIP_CARD_HEIGHT.EXTRA_LARGE
        }
    })

    /**  windowオブジェクトにリスナーを設定（メディアクエリー判別値随時更新） */
    // セットアップとクリーンアップ
    onMounted(() => {
        mediaQuerySmall.addEventListener('change', updateSmall)
        mediaQueryMedium.addEventListener('change', updateMedium)
        mediaQueryLarge.addEventListener('change', updateLarge)
    })

    onUnmounted(() => {
        mediaQuerySmall.removeEventListener('change', updateSmall)
        mediaQueryMedium.removeEventListener('change', updateMedium)
        mediaQueryLarge.removeEventListener('change', updateLarge)
    })

    return {
        isScreenSmall,
        isScreenMedium,
        isScreenLarge,
        cardWidth,
        cardHeight
    }
}
