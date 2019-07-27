import React, { Component } from 'react'
import QuestionSheetTest from './QuestionsSheetTest'

export default class AntonymsTest extends Component {
    render() {
        return (
            <div>
                antonyms test
                <QuestionSheetTest data={this.props.data} synOrAnt={'antonyms'} />
            </div>
        )
    }
}
