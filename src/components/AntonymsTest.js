import React, { Component } from 'react'
import QuestionSheetTest from './QuestionsSheetTest'
import {connect} from 'react-redux'

 class AntonymsTest extends Component {
    render() {
        return (
            <div>
                <h2>Antonyms Test</h2>
                <QuestionSheetTest synOrAnt={'antonyms'} />
            </div>
        )
    }
}

export default AntonymsTest