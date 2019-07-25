import React, { Component } from 'react';
import qsAndAs from '../src/data/qsAndAs.json'
import wordData from '../src/data/word-data.json'
import './App.css';
import { formatJsonData } from '../src/utils/utils'
import Nav from './components/Nav'
import { Router, Link, navigate } from '@reach/router'
import SynonymsStudy from './components/SynonymsStudy'
import SynonymsTest from './components/SynonymsTest'
import AntonymsStudy from './components/AntonymsStudy'
import AntonymsTest from './components/AntonymsTest'
import Home from './components/Home'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: qsAndAs
    }
  }
  render() {
    
    return (
      <div>
        <Nav/>
        

        <Router>
          <Home path="/" />
          <SynonymsStudy path="synonyms_study" />
          <AntonymsStudy path="antonyms_study" />
          <SynonymsTest path="synonyms_test" />
          <AntonymsTest path="antonyms_test" />         
        </Router>
      </div>
        
     
    );

  }
  
}

export default App;
