import React, { Component } from 'react'

export default class AnswerOutcome extends Component {
    render() {
        // console.log(this.props.antonymIndex)
        return (
            <div>
                {!this.props.firstQuestion
                    ? this.props.lastOptionChosen === this.props.lastCorrectAnswer 
                        ? <div>
                            correct answer
                            <button onClick={() => this.props.nextQuestion() }>Next Question</button>
                        </div> 
                        : <div>
                            incorrect, the antonym of {this.props.lastWord} is {this.props.lastCorrectAnswer}
                            <button onClick={() => this.props.nextQuestion() }>Next Question</button>
                        </div> 
                    : <p>nowt</p>}
                    
            </div>
        )
    }
}
