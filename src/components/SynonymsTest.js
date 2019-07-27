import React, { Component } from 'react'
import QuestionSheetTest from './QuestionsSheetTest'

export default class SynonymsTest extends Component {
    render() {
        return (
            <div>
                synonyms test
                <QuestionSheetTest data={this.props.data} synOrAnt={'synonyms'} />
            </div>
        )
    }
}
