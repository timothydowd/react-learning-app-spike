import React, { Component } from 'react'
import AnswerOutcome from './AnswerOutcome'

export default class QuestionMenu extends Component {
    constructor (props) {
        super(props)
        this.state = {
            antonymIndex: 0,
            end: false,
            score: 0,
            lastOptionChosen: false,
            lastCorrectAnswer: '',
            lastWord: ''
        }
    }

    handleClick (option) {
        console.log(option)

        const correctAnswer = this.props.data.antonyms[this.state.antonymIndex].correctAnswer
        const plusOne = this.state.antonymIndex + 1
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
                antonymIndex: plusOne,
                lastCorrectAnswer: correctAnswer,
                lastOptionChosen: option,
                lastWord: word
            })
        }
        
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
                <AnswerOutcome lastWord={this.state.lastWord} lastOptionChosen={this.state.lastOptionChosen} lastCorrectAnswer={this.state.lastCorrectAnswer} antonymIndex={this.state.antonymIndex}/>
            </div>
        )
    }
}
