import React, { Component } from 'react'
import { getTotalValidSynsAndAnts } from '../utils/utils' 
import {connect} from 'react-redux'

class Home extends Component {
    render() {
        const totalValidAntsAndSyns = getTotalValidSynsAndAnts(this.props.data)
        return (
            <div className='container'>

                <h1>Synonym and Antonym Study and Test Aid for 11 plus. Version 1.0</h1>
                
                
                
                <h2>Please choose a mode from the navigation bar above to begin</h2>
                
                <p>Study mode offers 20 questions.  When a question is answered wrongly it is re introduced at a later stage to help memorization.  Study mode ends when all 20 questions have been answered correctly.</p>
                <p>Test mode also offers 20 questions and is a straightforward test giving you a score afterwards with an answer summary.</p>
                <p>At the moment there is no user profile to track your previous performances, but maybe introduced in future.</p>
                <p>Currently there are {totalValidAntsAndSyns.validAnts} Antonym questions and {totalValidAntsAndSyns.validSyns} Synonyms questions in the database.  I am hoping to up this number in future with the help of a dictionary api. </p>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      data: state.data
    }
    
  }

  export default connect(mapStateToProps)(Home)

