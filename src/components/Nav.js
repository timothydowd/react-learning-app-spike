import React, { Component } from 'react'
import { Router, Link, navigate } from '@reach/router'


export default class Nav extends Component {
    render() {
        
        return (
            <header>
                <h1>11+ tools</h1>
                <nav>
                    <ul className='navLinks'>
                        <li><Link to ='/'>Home</Link></li>
                        <li> <Link to ='antonyms_study'>Antonyms Study</Link></li>
                        <li><Link to ='synonyms_study'>Synonyms Study</Link></li>
                        <li><Link to ='antonyms_test'>Antonyms Test</Link></li>
                        <li><Link to ='synonyms_test'>Synonyms Test</Link></li>
                    </ul>
                </nav>
                
            </header>
        )
    }
}
