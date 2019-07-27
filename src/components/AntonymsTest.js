import React, { Component } from 'react'
import QuestionSheetTest from './QuestionsSheetTest'

export default class AntonymsTest extends Component {
    render() {
        return (
            <div>
                <h2>Antonyms Test</h2>
                <QuestionSheetTest data={this.props.data} synOrAnt={'antonyms'} />
            </div>
        )
    }
}
