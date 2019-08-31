import React, { Component } from 'react'
import QuestionMenu from './QuestionMenu'



class SynonymsStudy extends Component {
    render() {
        return (
            <div>
                <h2>Synonyms Study</h2>
                <QuestionMenu synOrAnt={'synonyms'} />
            </div>
                
            
        )
    }
}



export default SynonymsStudy
