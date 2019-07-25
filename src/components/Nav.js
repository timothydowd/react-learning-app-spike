import React, { Component } from 'react'
import { Router, Link, navigate } from '@reach/router'


export default class Nav extends Component {
    render() {
        return (
            <div>
                <nav>
                    <Link to ='/'>Home</Link><span> - </span>
                    <Link to ='antonyms_study'>Antonyms Study</Link><span> - </span>
                    <Link to ='synonyms_study'>Synonyms Study</Link><span> - </span>
                    <Link to ='antonyms_test'>Antonyms Test</Link><span> - </span>
                    <Link to ='synonyms_test'>Synonyms Test</Link><span> - </span>
                </nav>
                
            </div>
        )
    }
}
