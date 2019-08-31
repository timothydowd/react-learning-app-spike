import React, { Component } from 'react'
import QuestionSheetTest from './QuestionsSheetTest'
import {connect} from 'react-redux'

 class SynonymsTest extends Component {
    render() {
        return (
            <div>
                <h2>Synonyms Test</h2>
                <QuestionSheetTest  synOrAnt={'synonyms'} />
            </div>
        )
    }
}



  export default SynonymsTest