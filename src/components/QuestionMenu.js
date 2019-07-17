import React, { Component } from 'react'

export default class QuestionMenu extends Component {
    constructor (props) {
        super(props)
        this.state = {
            antonymIndex: 0,
            showScore: false,
            score: 0
        }
    }

    handleClick () {
        const plusOne = this.state.antonymIndex + 1
        if(this.state.antonymIndex === this.props.data.antonyms.length - 1){
            this.setState({
                showScore: true
            })
        } else {
            this.setState({
                antonymIndex: plusOne
            })
        }
        
    }

    componentDidUpdate(){
        console.log('clicked')
    }





    render() {
        const antonymQs = this.props.data.antonyms
        console.log(antonymQs)
        
        return (
            <div>
                <p>What is the antonym of: {this.state.showScore ? this.state.score : antonymQs[this.state.antonymIndex].word}</p>
                <div>{antonymQs[this.state.antonymIndex].options.map(option => {
                    return <button>{option}</button>
                })}</div>
                
                <button onClick={() => {this.handleClick()}}>next</button>
            </div>
        )
    }
}
