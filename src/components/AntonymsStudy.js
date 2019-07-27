import React, { Component } from 'react'
import QuestionMenu from './QuestionMenu'


export default class AntonymsStudy extends Component {
    render() {
        return (
            <div>
                <h2>Antonyms Study</h2>
                <QuestionMenu data={this.props.data} synOrAnt={'antonyms'} />
            </div>
                
            
        )
    }
}
