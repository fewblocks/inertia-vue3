/** 吹き出し用データ生成ロジック */
// import { type SpeechBalloon } from "@/Components/speech-ballon/type.ts";
import { type SpeechBalloon } from "@/Components/speech-balloon/type";
const useCreateSpeechBalloonDate = (lines: string[]) => {
    var directions = ["right", "left"];

    // 配列をシャッフルする関数 (Fisher-Yatesアルゴリズム)
    function shuffle(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // lines配列をシャッフルして重複なしで使用
    var shuffledLines = shuffle(lines.slice());

    // 10個のオブジェクトを生成する配列
    var objects = [];

    // ランダムな整数生成のヘルパー関数
    const getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    for (var i = 0; i < 10; i++) {
        // directions配列からランダムに選択
        const randomDirection =
            directions[Math.floor(Math.random() * directions.length)];

        // オブジェクトの生成
        const obj: SpeechBalloon = {
            id: i + 1,
            top: getRandomInt(0, 80),
            left: getRandomInt(0, 80),
            line: shuffledLines[i], // シャッフルされたlines配列から重複なしで選択
            directions: randomDirection,
            transform: Math.random() * (1.2 - 0.8) + 0.8,
        };

        // objects配列に追加
        objects.push(obj);
    }
    return objects;
};

export default useCreateSpeechBalloonDate;
