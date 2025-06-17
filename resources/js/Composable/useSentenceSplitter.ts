// @v overview: 文を単語ごとに分割し、staticTextとplaceholderTextのインデックスを示す真偽値の配列を生成するComposable
// @v complecate: 難易度に応じてstaticTextの出現頻度を調整する
// @v complecate: 5つ以上の単語の場合、staticTextとplaceholderTextのインデックスを示す真偽値の配列を生成する
// @v complecate: 4つ以下の単語の場合、staticTextとplaceholderTextのインデックスを決め打ちで生成する
import { ref } from 'vue'
import { getRandomInt1To4 } from '@/utils/maths'
import { Difficulty } from '@/types/Difficulty'

// 難易度ごとの倍数を定義
const DIFFICULTY_MULTIPLIERS: Record<Difficulty, number> = {
    high: 2,
    medium: 3,
    low: 4
}

/**
 * マッピング関数
 *
 * @param words - 単語の配列
 * @param startWithStatic - staticTextが始まるインデックス
 * @param multiplier - staticTextの出現頻度を決定する倍数
 * @returns - staticTextとplaceholderTextのインデックスを示す真偽値の配列
 */
const createStaticMap = (words: string[], startWithStatic: number, multiplier: number) => {
    return words.map((_, index) => {
        if (index < startWithStatic) {
            // startWithStaticより前のインデックスは全てtrue
            return true
        } else if (index === startWithStatic) {
            return false
        } else {
            // startWithStatic以降は指定された倍数の時のみtrue
            return index % multiplier !== 0
        }
    })
}

export function useSentenceSplitter(sentence: string, difficulty: Difficulty) {
    const resultArray = ref([])

    ;(() => {
        const words = sentence.split(' ')

        let startWithStatic = 0
        let isStaticArray = []

        // 4つ以下の単語の場合(順番決め打ち)
        // staticTextとplaceholderTextのインデックスを示す真偽値の配列
        if (words.length === 2) isStaticArray = [true, false]
        if (words.length === 3) isStaticArray = [true, false, true]
        if (words.length === 4) isStaticArray = [true, false, true, false]

        // 5つ以上の単語の場合
        // 難易度ごとにstaticTextとplaceholderTextのインデックスを示す真偽値の配列
        // ※startWithStaticは1から4のランダムな値であり、分散性が担保されている
        if (words.length > 4) {
            startWithStatic = getRandomInt1To4()
            const multiplier = DIFFICULTY_MULTIPLIERS[difficulty]
            isStaticArray = createStaticMap(words, startWithStatic, multiplier)
        }

        let firstPlaceholderSet = false
        words.forEach((word, index) => {
            const type = isStaticArray[index] ? 'static' : 'placeholder'
            const status = type === 'placeholder' && !firstPlaceholderSet ? 'selected' : 'unselected'
            const selectedWord = ''
            const disabled = false
            const selectedColorIndex = null
            if (type === 'placeholder' && !firstPlaceholderSet) {
                firstPlaceholderSet = true
            }
            // 各単語のオブジェクトを作成
            const wordObject = {
                index, // インデックス
                word, // 単語
                type, // 性質値（staticまたはplaceholder）
                status, // ステータス値（selectedまたはunselected）
                selectedWord, // 選択された単語（初期は空文字 -> ユーザー選択できる）
                disabled, // 活性非活性値
                selectedColorIndex // 選択された色のインデックス（初期はnull -> ユーザー選択した単語に該当する色のインデックス）
            }

            resultArray.value.push(wordObject)
        })
    })()

    // TODO: 一旦コメントアウト（後で必要なら復活させる）
    // 新しい配列を作成するメソッド
    // const createPlaceholderIndexArray = () => {
    //     return resultArray.value
    //         .filter((item) => item.type === 'placeholder')
    //         .map((item) => ({ disabled: false, index: item.index }))
    // }

    return {
        resultArray
        // createPlaceholderIndexArray
    }
}
