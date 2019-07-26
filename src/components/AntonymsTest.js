import React, { Component } from 'react'
import QuestionTestSheet from './QuestionsSheetTest'

export default class AntonymsTest extends Component {
    render() {
        return (
            <div>
                antonyms test
                <QuestionTestSheet data={this.props.data} synOrAnt={'antonyms'} />
            </div>
        )
    }
}
