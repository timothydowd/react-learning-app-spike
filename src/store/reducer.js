import { formatJsonData } from '../utils/utils'
import wordData from '../data/word-data.json'
import * as actionTypes from './actions'

const initialState = {
    data: formatJsonData(wordData),
    
    
    questionIndex: 0,
    answerOutcome:false,
    end: false,
    score: 0,
    lastOptionChosen: false,
    lastCorrectAnswer: '',
    lastWord: '',
    firstQuestion: true,
    toggleAnswerOutcome: false,
    qAndAs: []
    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HANDLE_OPTION_CLICK:
            return{
                
            }

        default:
            return state
    }
}

export default reducer;