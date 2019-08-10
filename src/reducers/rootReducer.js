import wordData from '../data/word-data.json'
import { formatJsonData } from '../utils/utils'

const initState = {
    data: formatJsonData(wordData)
}

const rootReducer = (state = initState, action) => {
    return state
}

export default rootReducer;