import { ref } from 'vue'

export function useSentenceSplitter(sentence, difficulty) {
    const resultArray = ref([])

    const splitSentence = () => {
        const words = sentence.split(' ')

        // ランダムに最初の単語を `staticText` または `placeholderText` に振り分け
        const startWithStatic = Math.random() >= 0.5

        // 難易度ごとに staticText となるインデックスを決定
        let isStatic = []

        switch (difficulty) {
            case 'high':
                isStatic = words.map((_, index) => (startWithStatic ? index % 2 === 0 : index % 2 !== 0))
                break
            case 'medium':
                isStatic = words.map((_, index) => {
                    const modIndex = index % 3
                    return startWithStatic ? modIndex === 0 : modIndex !== 0
                })
                break
            case 'low':
                isStatic = words.map((_, index) => {
                    const modIndex = index % 4
                    return startWithStatic ? modIndex === 0 : modIndex !== 0
                })
                break
            default:
                throw new Error('Invalid difficulty level')
        }

        let firstPlaceholderSet = false

        words.forEach((word, index) => {
            const type = isStatic[index] ? 'static' : 'placeholder'
            const status = type === 'placeholder' && !firstPlaceholderSet ? 'selected' : 'unselected'
            const selectedWord = ''
            const disabled = false

            if (type === 'placeholder' && !firstPlaceholderSet) {
                firstPlaceholderSet = true
            }

            const wordObject = {
                index,
                word,
                type,
                status,
                selectedWord,
                disabled
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
