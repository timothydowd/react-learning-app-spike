import React, { Component } from 'react'
import QuestionMenu from './QuestionMenu'



export default class SynonymsStudy extends Component {
    render() {
        return (
            <div>
                <h2>Synonyms Study</h2>
                <QuestionMenu data={this.props.data} synOrAnt={'synonyms'} />
            </div>
                
            
        )
    }
}
