import React, { Component } from 'react'
import AnswerOutcome from './AnswerOutcome'
import { createQAndAs, insertQuestionBackIntoStack } from '../utils/utils'
import { connect } from 'react-redux'

class QuestionMenu extends Component {
    constructor (props) {
        super(props)
        this.qAndAs = createQAndAs(props.data, this.props.synOrAnt)
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
            // qAndAs: createQAndAs(this.props.data, this.props.synOrAnt)
        }
    }

    handleOptionClick (option) {
       
        const correctAnswer = this.qAndAs[this.state.questionIndex].correctAnswer
        const word = this.qAndAs[this.state.questionIndex].word
        const currentScore = this.state.score
        
            this.setState({  
                lastCorrectAnswer: correctAnswer,
                lastOptionChosen: option,
                lastWord: word,
                firstQuestion: false,
                toggleAnswerOutcome: this.toggleAnswerOutcome(),
                score: this.handleScore(option, correctAnswer, currentScore),
                qAndAs:[]
            })
        
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
        const correctAnswer = this.qAndAs[this.state.questionIndex].correctAnswer
        const word = this.qAndAs[this.state.questionIndex].word
        const currentScore = this.state.score

        if(!wasCorrectAnswer){
            const updatedQAndAs = insertQuestionBackIntoStack(this.qAndAs, this.state.questionIndex)
            this.setState({
                questionIndex: plusOne,
                toggleAnswerOutcome: this.toggleAnswerOutcome(),
                qAndAs: updatedQAndAs
            })
        } else {
            if(this.state.questionIndex === this.qAndAs.length - 1){
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
    

    componentDidMount(prevProps, prevState){
        if(prevState !== this.state){
            this.setState({
                qAndAs: createQAndAs(this.props.data, this.props.synOrAnt)
               })
        }
       
        
    }


    render() {
        const qandAs = this.qAndAs
        console.log('questions: ', qandAs)
        
        
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
                    <AnswerOutcome synOrAnt={this.props.synOrAnt} handleIncorrectAnswer={this.handleIncorrectAnswer} firstQuestion={this.state.firstQuestion} nextQuestion={this.nextQuestion} lastWord={this.state.lastWord} lastOptionChosen={this.state.lastOptionChosen} lastCorrectAnswer={this.state.lastCorrectAnswer} questionIndex={this.state.questionIndex}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,

        questionIndex: state.questionIndex,
    answerOutcome: state.answerOutcome,
    end: state.end,
    score: state.score,
    lastOptionChosen: state.lastOptionChosen,
    lastCorrectAnswer: state.lastCorrectAnswer,
    lastWord: state.lastWord,
    firstQuestion: state.firstQuestion,
    toggleAnswerOutcome: state.toggleAnswerOutcome,
    qAndAs: state.qAndAs
    }
}

export default connect(mapStateToProps)(QuestionMenu)