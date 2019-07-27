import React, { Component } from 'react'

export default class AnswerOutcome extends Component {
    render() {
        
        return (
            <div>
                {!this.props.firstQuestion
                    ? this.props.lastOptionChosen === this.props.lastCorrectAnswer 
                        ? <div>
                            correct answer
                            <button onClick={() => this.props.nextQuestion(true, this.props.lastOptionChosen) }>Next Question</button>
                        </div> 
                        : <div>
                            incorrect, the {this.props.synOrAnt.slice(0, -1)} of {this.props.lastWord} is {this.props.lastCorrectAnswer}
                            
                            <button onClick={() => this.props.nextQuestion(false, this.props.lastOptionChosen) }>Next Question</button>
                        </div> 
                    : <p></p>}
                    
            </div>
        )
    }
}
