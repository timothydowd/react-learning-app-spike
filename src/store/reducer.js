import { formatJsonData } from '../utils/utils'
import wordData from '../data/word-data.json'
import * as actionTypes from './actions'
import { createQAndAs } from '../utils/utils'

const data = formatJsonData(wordData)

const initialState = {
    data: data,
    
    
    questionIndex: 0,
    answerOutcome:false,
    end: false,
    score: 0,
    lastOptionChosen: false,
    lastCorrectAnswer: '',
    lastWord: '',
    firstQuestion: true,
    toggleAnswerOutcome: false,
    synOrAnt: 'synonyms',
    
    qAndAs: createQAndAs(data, 'synonyms')
}

const reducer = (state = initialState, action) => {
    console.log('hit root reducer')
    switch (action.type) {
        case actionTypes.HANDLE_OPTION_CLICK: 
            
            return{ 
                ...state,

                lastCorrectAnswer: action.correctAnswer,
                lastOptionChosen: action.option,
                lastWord: action.word,
                firstQuestion: false,
                toggleAnswerOutcome: action.toggledAnswerOutcome,
                score: action.newScore
            }

        case actionTypes.NEXT_QUESTION:
            
            if(!action.wasCorrectAnswer){
                
                return{
                    ...state,
                    questionIndex: action.plusOne,
                    toggleAnswerOutcome: action.toggledAnswerOutcome,
                    qAndAs: action.updatedQAndAs
                }
            } else {
                if(state.questionIndex === state.qAndAs.length - 1){
                    return{
                        ...state,
                        end: true,
                        lastCorrectAnswer: action.correctAnswer,
                        lastOptionChosen: action.option,
                        lastWord: action.word,
                        score: Selection.newScore,
                        toggleAnswerOutcome: action.toggledAnswerOutcome
                    } 
                } else {
                    return{
                        ...state,
                        questionIndex: action.plusOne,
                        toggleAnswerOutcome: action.toggledAnswerOutcome
                    }
                }
            } 
        
        case actionTypes.START_NEW_STUDY_SESSION:
                return{
                    ...state,
                    questionIndex: 0,
                    answerOutcome:false,
                    end: false,
                    score: 0,
                    lastOptionChosen: false,
                    lastCorrectAnswer: '',
                    lastWord: '',
                    firstQuestion: true,
                    toggleAnswerOutcome: false,
                    qAndAs: action.newQAndAs
                }


        case actionTypes.SYN_OR_ANT_MODE:
            return{
                ...state,
                synOrAnt: action.synOrAnt
            }
        
        case actionTypes.GENERATE_Q_AND_AS:
            console.log('hit generate qanda reducer')
            return{
                ...state,
                qAndAs: action.qAndAs
            }

        default:
            return state
    }
}

export default reducer;

