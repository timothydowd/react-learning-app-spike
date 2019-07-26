import React, { Component } from 'react'
import QuestionMenu from './QuestionMenu'



export default class SynonymsStudy extends Component {
    render() {
        return (
            <div>
                <p/>
                synonyms study
                <p/>
                <QuestionMenu data={this.props.data} synOrAnt={'synonyms'} />
            </div>
                
            
        )
    }
}
