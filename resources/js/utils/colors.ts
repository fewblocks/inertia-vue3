import colorsData from '@/json/output.json'
import { ColorsData } from '@/types/Colors'
// Remove the duplicate import statement for 'ColorsData'

// JSONデータを型付きでインポート
const data: ColorsData = colorsData || { colors: [] }

export const getColorValue = (name: string) => {
    console.log(data.colors.find((color) => color.name === name))
    return data.colors.find((color) => color.name === name).value
}
