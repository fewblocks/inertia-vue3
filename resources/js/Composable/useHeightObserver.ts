import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useHeightObserver(wrapperId: string, contentId: string) {
    const activeHeight = ref(0)
    let quizApplicationWrapper: HTMLElement | null = null
    let quizApplicationContent: HTMLElement | null = null

    /** 高さを監視する関数 */
    const observeHeight = () => {
        // 監視対象の要素がない場合は何もしない
        if (!quizApplicationContent) return

        // ResizeObserverを使って高さを監視
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                activeHeight.value = entry.contentRect.height
                // targetの高さが変わったら高さを更新
                updateHeight()
            }
        })
        resizeObserver.observe(quizApplicationContent)

        /** ウィンドウのリサイズイベントを監視 */
        const handleResize = () => {
            activeHeight.value = quizApplicationContent!.offsetHeight
            // targetの高さが変わったら高さを更新
            updateHeight()
        }
        window.addEventListener('resize', handleResize)

        /** クリーンアップ関数 */
        const cleanup = () => {
            resizeObserver.disconnect()
            window.removeEventListener('resize', handleResize)
        }
        return cleanup
    }

    /** 高さを更新する関数 */
    const updateHeight = () => {
        // ウィンドウの高さが取得できない場合は何もしない
        if (!activeHeight.value) return
        // ウィンドウの高さの1.5倍の高さを取得(150vh)
        const vhHeight = window.innerHeight * 1.5
        // ウィンドウの高さと取得した高さの大きい方を取得
        const newHeight = Math.max(activeHeight.value, vhHeight)
        if (quizApplicationWrapper) {
            quizApplicationWrapper.style.height = `${newHeight + 100}px` // ∔100pxは余白
        }
    }

    onMounted(() => {
        // Dom要素を取得
        quizApplicationWrapper = document.getElementById(wrapperId)
        quizApplicationContent = document.getElementById(contentId)
        // 高さを更新
        updateHeight()
        // Unmount 前に cleanup関数を呼び出す
        const cleanup = observeHeight()
        onBeforeUnmount(() => {
            if (cleanup) cleanup()
        })
    })

    return {
        activeHeight
    }
}
