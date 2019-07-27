import React, { Component } from 'react'
import QuestionSheetTest from './QuestionsSheetTest'

export default class SynonymsTest extends Component {
    render() {
        return (
            <div>
                <h2>Synonyms Test</h2>
                <QuestionSheetTest data={this.props.data} synOrAnt={'synonyms'} />
            </div>
        )
    }
}
