import React, { Component } from 'react'

import QuestionMenu from './QuestionMenu'
import wordData from '../data/word-data.json'
import data from '../data/qsAndAs.json'

export default class AntonymsStudy extends Component {
    render() {
       
        return (
            <div>
                <p/>
                antonyms study
                <p/>
                <QuestionMenu data={data} />
            </div>
                
            
        )
    }
}
