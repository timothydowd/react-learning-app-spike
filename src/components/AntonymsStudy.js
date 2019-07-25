import React, { Component } from 'react'
import QuestionMenu from './QuestionMenu'


export default class AntonymsStudy extends Component {
    render() {
        return (
            <div>
                <p/>
                antonyms study
                <p/>
                <QuestionMenu data={this.props.data} synOrAnt={'antonyms'} />
            </div>
                
            
        )
    }
}
