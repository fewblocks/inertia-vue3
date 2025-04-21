import { ref } from 'vue'

import { getRandomInt1To2, getRandomInt1To3, getRandomInt1To4, getTwoRandomInts1To4 } from '@/utils/maths'

export function useSentenceSplitter(sentence, difficulty) {
    const resultArray = ref([])

    const splitSentence = () => {
        const words = sentence.split(' ')

        let startWithStatic = 0
        let isStatic = []
        // ランダムに最初の単語を `staticText` または `placeholderText` に振り分け
        if (words.length === 2) isStatic = [true, false]
        if (words.length === 3) isStatic = [true, false, true]
        if (words.length === 4) isStatic = [true, false, true, false]

        if (words.length > 4) {
            // 1から4までのランダムな整数を生成
            startWithStatic = getRandomInt1To4()
        }

        // 難易度ごとに staticText となるインデックスを決定
        if (words.length > 4) {
            switch (difficulty) {
                case 'high':
                    console.log('high')
                    isStatic = words.map((_, index) => {
                        if (index < startWithStatic) {
                            // startWithStaticより前のインデックスは全てtrue
                            return true
                        } else {
                            if (index % 2 !== 0) return true
                            // startWithStatic以降は2の倍数の時のみtrue
                        }
                    })
                    break
                case 'medium':
                    console.log('medium')
                    isStatic = words.map((_, index) => {
                        if (index < startWithStatic) {
                            // startWithStaticより前のインデックスは全てtrue
                            return true
                        } else {
                            // startWithStatic以降は3の倍数の時のみtrue
                            if (index % 3 !== 0) return true
                        }
                    })
                    break
                case 'low':
                    console.log('low')
                    isStatic = words.map((_, index) => {
                        if (index < startWithStatic) {
                            // startWithStaticより前のインデックスは全てtrue
                            return true
                        } else {
                            // startWithStatic以降は4の倍数の時のみtrue
                            if (index % 4 !== 0) return true
                        }
                    })
                    break
                default:
                    throw new Error('Invalid difficulty level')
            }
        }

        let firstPlaceholderSet = false

        words.forEach((word, index) => {
            const type = isStatic[index] ? 'static' : 'placeholder'
            const status = type === 'placeholder' && !firstPlaceholderSet ? 'selected' : 'unselected'
            const selectedWord = ''
            const disabled = false
            const selectedColorIndex = null

            if (type === 'placeholder' && !firstPlaceholderSet) {
                firstPlaceholderSet = true
            }

            const wordObject = {
                index,
                word,
                type,
                status,
                selectedWord,
                disabled,
                selectedColorIndex
            }

            resultArray.value.push(wordObject)
        })
    }

    splitSentence()

    // 新しい配列を作成するメソッド
    const createPlaceholderIndexArray = () => {
        return resultArray.value
            .filter((item) => item.type === 'placeholder')
            .map((item) => ({ disabled: false, index: item.index }))
    }

    return {
        resultArray,
        createPlaceholderIndexArray
    }
}
