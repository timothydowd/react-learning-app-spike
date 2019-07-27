import React, { Component } from 'react'
import AnswerOutcome from './AnswerOutcome'
import { createQAndAs, insertQuestionBackIntoStack } from '../utils/utils'

export default class QuestionMenu extends Component {
    constructor (props) {
        super(props)
        this.state = {
            questionIndex: 0,
            answerOutcome:false,
            end: false,
            score: 0,
            lastOptionChosen: false,
            lastCorrectAnswer: '',
            lastWord: '',
            firstQuestion: true,
            toggleAnswerOutcome: false,
            qAndAs: createQAndAs(this.props.data, this.props.synOrAnt)
        }
    }

    handleOptionClick (option) {
       
        const correctAnswer = this.state.qAndAs[this.state.questionIndex].correctAnswer
        const word = this.state.qAndAs[this.state.questionIndex].word
        const currentScore = this.state.score
        

        // if(this.state.questionIndex === this.state.qAndAs.length - 1){
        //     this.setState({
        //         end: true,
        //         lastCorrectAnswer: correctAnswer,
        //         lastOptionChosen: option,
        //         lastWord: word,
        //         score: this.handleScore(option, correctAnswer, currentScore)
        //     })
        // } else {
            this.setState({
                
                lastCorrectAnswer: correctAnswer,
                lastOptionChosen: option,
                lastWord: word,
                firstQuestion: false,
                toggleAnswerOutcome: this.toggleAnswerOutcome(),
                score: this.handleScore(option, correctAnswer, currentScore)
            })
        // }
        
    }

    handleScore(option, correctAnswer, currentScore){
        let newScore = currentScore
        if(correctAnswer === option){
            newScore++
        } 

        return newScore
    }
    

    nextQuestion = (wasCorrectAnswer, option) => {

        const plusOne = this.state.questionIndex + 1
        const correctAnswer = this.state.qAndAs[this.state.questionIndex].correctAnswer
        const word = this.state.qAndAs[this.state.questionIndex].word
        const currentScore = this.state.score

        if(!wasCorrectAnswer){
            const updatedQAndAs = insertQuestionBackIntoStack(this.state.qAndAs, this.state.questionIndex)
            this.setState({
                questionIndex: plusOne,
                toggleAnswerOutcome: this.toggleAnswerOutcome(),
                qAndAs: updatedQAndAs
            })
        } else {
            if(this.state.questionIndex === this.state.qAndAs.length - 1){
                this.setState({
                    end: true,
                    lastCorrectAnswer: correctAnswer,
                    lastOptionChosen: option,
                    lastWord: word,
                    score: this.handleScore(option, correctAnswer, currentScore),
                    toggleAnswerOutcome: this.toggleAnswerOutcome()
                })  
            } else {
                this.setState({
                    questionIndex: plusOne,
                    toggleAnswerOutcome: this.toggleAnswerOutcome()
                })
            }
        } 
    }

    toggleAnswerOutcome(){
        const toggledAnswerOutcome = !this.state.toggleAnswerOutcome
        return toggledAnswerOutcome
    }

    // nextQuestionOnIncorrectAnswer = (incorrectAnswer) => {
    //     const newQandAs = insertQuestionBackIntoStack(this.state.qAndAs, incorrectAnswer, this.state.questionIndex)
        
    //     console.log('handleIncorrectAnswer')

        
    // }

    startNewStudySession(){
        this.setState({
            questionIndex: 0,
            answerOutcome:false,
            end: false,
            score: 0,
            lastOptionChosen: false,
            lastCorrectAnswer: '',
            lastWord: '',
            firstQuestion: true,
            toggleAnswerOutcome: false,
            qAndAs: createQAndAs(this.props.data, this.props.synOrAnt)
        })
    }
    

    componentDidUpdate(){
       
        
    }


    render() {
        // const qandAs = createQAndAs(this.props.data, this.props.synOrAnt)
        const qandAs = this.state.qAndAs
       
        
        
        return (
            <div className='questionStudyContainer' >
                
                {!this.state.toggleAnswerOutcome ? 
                    <div>
                        {this.state.end ? 
                            <div>
                                <p>Session over!</p> <button onClick={() => this.startNewStudySession()}>Study again?</button>
                            </div>
                             :  
                            <div>
                                What is the {this.props.synOrAnt.slice(0, -1)} of: {qandAs[this.state.questionIndex].word} 
                                <div>
                                    {qandAs[this.state.questionIndex].options.map(option => {
                                        return <button key={option} onClick={() => this.handleOptionClick(option) }>{option}</button>
                                    })}
                                </div>
                            </div>
                        }                      
                    </div> :
                    <AnswerOutcome handleIncorrectAnswer={this.handleIncorrectAnswer} firstQuestion={this.state.firstQuestion} nextQuestion={this.nextQuestion} lastWord={this.state.lastWord} lastOptionChosen={this.state.lastOptionChosen} lastCorrectAnswer={this.state.lastCorrectAnswer} questionIndex={this.state.questionIndex}/>
                }
            </div>
        )
    }
}
