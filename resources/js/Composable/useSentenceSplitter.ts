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

        words.forEach((word, index) => {
            const wordObject = {
                index,
                word,
                type: isStatic[index] ? 'static' : 'placeholder',
                status: index === 0 ? 'selected' : 'unselected'
            }
            resultArray.value.push(wordObject)
        })
    }

    splitSentence()

    return {
        resultArray
    }
}
