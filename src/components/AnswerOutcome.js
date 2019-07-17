import React, { Component } from 'react'

export default class AnswerOutcome extends Component {
    render() {
        console.log(this.props.antonymIndex)
        return (
            <div>
                {this.props.antonymIndex !== 0 
                    ? this.props.lastOptionChosen === this.props.lastCorrectAnswer 
                        ? <p>correct answer</p> 
                        : <p>incorrect, the antonym of {this.props.lastWord} is {this.props.lastCorrectAnswer}</p> 
                    : <p>nowt</p>}
                    
            </div>
        )
    }
}
