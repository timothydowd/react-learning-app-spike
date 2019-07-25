import React, { Component } from 'react'
import AnswerOutcome from './AnswerOutcome'
import { createQAndAs } from '../utils/utils'

export default class QuestionMenu extends Component {
    constructor (props) {
        super(props)
        this.state = {
            antonymIndex: 0,
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
        // console.log(option)

        // const correctAnswer = this.props.data.antonyms[this.state.antonymIndex].correctAnswer
        const correctAnswer = this.state.qAndAs[this.state.antonymIndex].correctAnswer
        const word = this.state.qAndAs[this.state.antonymIndex].word
        const currentScore = this.state.score
        

        if(this.state.antonymIndex === this.state.qAndAs.length - 1){
            this.setState({
                end: true,
                lastCorrectAnswer: correctAnswer,
                lastOptionChosen: option,
                lastWord: word,
                score: this.handleScore(option, correctAnswer, currentScore)
            })
        } else {
            this.setState({
                
                lastCorrectAnswer: correctAnswer,
                lastOptionChosen: option,
                lastWord: word,
                firstQuestion: false,
                toggleAnswerOutcome: this.toggleAnswerOutcome(),
                score: this.handleScore(option, correctAnswer, currentScore)
            })
        }
        
    }

    handleScore(option, correctAnswer, currentScore){
        let newScore = currentScore
        if(correctAnswer === option){
            newScore++
        } 

        return newScore
    }
    

    nextQuestion = () => {
        // console.log('clicked next q')
        const plusOne = this.state.antonymIndex + 1
        this.setState({
            antonymIndex: plusOne,
            toggleAnswerOutcome: this.toggleAnswerOutcome()
        })
    }

    toggleAnswerOutcome(){
        const toggledAnswerOutcome = !this.state.toggleAnswerOutcome
        return toggledAnswerOutcome
    }


    componentDidUpdate(){
        // console.log('compupdate score', this.state.score)
        
    }





    render() {
        // const qandAs = createQAndAs(this.props.data, this.props.synOrAnt)
        const qandAs = this.state.qAndAs
        console.log(qandAs)
        
        
        return (
            <div>
                
                {!this.state.toggleAnswerOutcome ? 
                    <div>
                        {this.state.end ? 
                            <p>You scored {this.state.score} out of {this.state.qAndAs.length} </p> :  
                            <div>
                                What is the {this.props.synOrAnt.slice(0, -1)} of: {qandAs[this.state.antonymIndex].word} 
                                <div>
                                    {qandAs[this.state.antonymIndex].options.map(option => {
                                        return <button key={option} onClick={() => this.handleOptionClick(option) }>{option}</button>
                                    })}
                                </div>
                            </div>
                        }                      
                    </div> :
                    <AnswerOutcome firstQuestion={this.state.firstQuestion} nextQuestion={this.nextQuestion} lastWord={this.state.lastWord} lastOptionChosen={this.state.lastOptionChosen} lastCorrectAnswer={this.state.lastCorrectAnswer} antonymIndex={this.state.antonymIndex}/>
                }
            </div>
        )
    }
}
