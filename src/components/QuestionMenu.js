import React, { Component } from 'react'
import AnswerOutcome from './AnswerOutcome'

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
            firstQuestion: true
        }
    }

    handleClick (option) {
        console.log(option)

        const correctAnswer = this.props.data.antonyms[this.state.antonymIndex].correctAnswer
        // const plusOne = this.state.antonymIndex + 1
        const word = this.props.data.antonyms[this.state.antonymIndex].word

        if(this.state.antonymIndex === this.props.data.antonyms.length - 1){
            this.setState({
                end: true,
                lastCorrectAnswer: correctAnswer,
                lastOptionChosen: option,
                lastWord: word
            })
        } else {
            this.setState({
                
                lastCorrectAnswer: correctAnswer,
                lastOptionChosen: option,
                lastWord: word,
                firstQuestion: false
            })
        }
        
    }

    nextQuestion = () => {
        console.log('clicked next q')
        const plusOne = this.state.antonymIndex + 1
        this.setState({
            antonymIndex: plusOne
        })
    }

    componentDidUpdate(){
        console.log('compupdate')
    }





    render() {
        const antonymQs = this.props.data.antonyms
        console.log(antonymQs)
        
        return (
            <div>
                <p>What is the antonym of: {this.state.end ? this.state.score : antonymQs[this.state.antonymIndex].word}</p>
                <div>
                    {antonymQs[this.state.antonymIndex].options.map(option => {
                        return <button key={option} onClick={() => this.handleClick(option) }>{option}</button>
                    })}
                </div>
                <AnswerOutcome firstQuestion={this.state.firstQuestion} nextQuestion={this.nextQuestion} lastWord={this.state.lastWord} lastOptionChosen={this.state.lastOptionChosen} lastCorrectAnswer={this.state.lastCorrectAnswer} antonymIndex={this.state.antonymIndex}/>
            </div>
        )
    }
}
