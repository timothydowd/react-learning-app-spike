import React, { Component } from 'react'
import { Link } from '@reach/router'
import { connect } from  'react-redux'
import * as actionTypes from '../store/actions'

 class Nav extends Component {
    render() {
        
        return (
            <header>
                <h1>11+ tools</h1>
                <nav>
                    <ul className='navLinks'>
                        <li><Link to ='/'>Home</Link></li>
                        <li> <Link to ='antonyms_study' onClick={this.props.onClickSynOrAnt('antonyms')} >Antonyms Study</Link></li>
                        <li><Link to ='synonyms_study' onClick={this.props.onClickSynOrAnt('synonyms')} >Synonyms Study</Link></li>
                        <li><Link to ='antonyms_test'onClick={this.props.onClickSynOrAnt('antonyms')} >Antonyms Test</Link></li>
                        <li><Link to ='synonyms_test'onClick={this.props.onClickSynOrAnt('synonyms')} >Synonyms Test</Link></li>
                    </ul>
                </nav>
                
            </header>
        )
    }
}

// const mapDispatchToProps = dispatch => {
//     return{
//         onClickSynOrAnt: (synOrAnt) => dispatch(
//             {type: actionTypes.SYN_OR_ANT_MODE, synOrAnt: synOrAnt}
//         )

//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        onClickSynOrAnt: (synOrAnt ) => dispatch(
            {type: actionTypes.SYN_OR_ANT_MODE, synOrAnt: synOrAnt}
        )

    }
}


export default connect(null, mapDispatchToProps)(Nav)