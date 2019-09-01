import React, { Component } from 'react'
import QuestionMenu from './QuestionMenu'
import { connect } from 'react-redux';


 class AntonymsStudy extends Component {
    render() {
        return (
            <div>
                <h2>Antonyms Study</h2>
                <QuestionMenu  synOrAnt={'antonyms'} />
            </div>
                
            
        )
    }
}




  export default AntonymsStudy