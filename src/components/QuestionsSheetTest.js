import React, { Component } from 'react'
import { createQAndAs } from '../utils/utils'

export default class QuestionsSheetTest extends Component {
    constructor (props) {
        super(props)
        this.state = {
            qAndAs: createQAndAs(this.props.data, this.props.synOrAnt),
            choices: [],
            testFinished: false
        }
    }

    checkRadioButton(choice, questionId){
        this.addChoiceToState(choice, questionId)
    }

    addChoiceToState(choice, questionId){
        const newChoices = [...this.state.choices]
        newChoices[questionId - 1] = choice
        
        this.setState({choices: newChoices})
    }

    submitAnswers(){
       
        if((this.state.choices.includes(undefined) && this.state.choices.length < this.state.qAndAs.length) || this.state.choices.includes(undefined) || this.state.choices.length < this.state.qAndAs.length ){
            alert("Please answer all questions")
        } else {
            this.getScore()
        }
 
    }

    getScore(){
        const qAndAs = this.state.qAndAs

        let correctCount = 0

        const testSummary = qAndAs.map((questionObject, index) => {
            if(questionObject.correctAnswer === this.state.choices[index]){
                correctCount++
                return { word: questionObject.word, yourAnswer: this.state.choices[index], correct: true }
            } else {
                return { word: questionObject.word, yourAnswer: this.state.choices[index], correct: false, correctAnswer: questionObject.correctAnswer }
            }
        })

        const score = `${correctCount} out of ${qAndAs.length}`
        

        this.setState({testFinished: true, testSummary, score})
    }

    restartTest(){
        this.setState({qAndAs: createQAndAs(this.props.data, this.props.synOrAnt),
            choices: [],
            testFinished: false})
    }

    render() {
        const qAndAs = this.state.qAndAs
        
        if(!this.state.testFinished){
            return (
            
                <div>
                    {qAndAs.map(questionObject => {
                        return(
                            <div key={questionObject.id} className='questionBlock'>
                                 <p>What is the {this.props.synOrAnt.slice(0,-1)} of {questionObject.word}?</p>
                                 {questionObject.options.map(option => {
                                   
                                    return (
                                        <label key={option}>
                                            <input onChange={() => {this.checkRadioButton(option, questionObject.id)}}type='radio' value={option} name={`choice${questionObject.id}`} />
                                        {option}</label>
                                    )
                                 })}
                                <p></p>
                                <p></p>   
                            </div>
                        ) 
                    })}
                    <button onClick={() => this.submitAnswers()} >Submit Answers!</button>
                </div>
            )
        } else {
            const testSummary = this.state.testSummary
            const correctStyle = {
                color: 'green'
            };
            const incorrectStyle = {
                color: 'red'
            };

            return (
            
                <div>
                    <h3>Test Summary:</h3>
                    {testSummary.map(summaryObject => {
                        if(summaryObject.correct){
                            return (
                                <div key={summaryObject.word} className='testSummaryBlock'>What is the {this.props.synOrAnt.slice(0,-1)} of {summaryObject.word}? you answered: {summaryObject.yourAnswer}... <div style={correctStyle}>Correct!</div></div>
                            )
                        } else {
                            return (
                                <div key={summaryObject.word} className='testSummaryBlock'>What is the {this.props.synOrAnt.slice(0,-1)} of {summaryObject.word}? you answered: {summaryObject.yourAnswer}... <div style={incorrectStyle}>Incorrect, the correct answer was {summaryObject.correctAnswer}</div> </div>
                            )
                        }
                        
                    })}
                     
                    <p>You scored {this.state.score}</p>
                    
                    <button onClick={() => this.restartTest()} >Try again?</button>
                </div>
            )
        }
        
    }
}
