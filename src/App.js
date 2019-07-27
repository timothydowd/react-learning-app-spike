import React, { Component } from 'react';
import wordData from '../src/data/word-data.json'
import './App.css';
import { formatJsonData } from '../src/utils/utils'
import Nav from './components/Nav'
import { Router } from '@reach/router'
import SynonymsStudy from './components/SynonymsStudy'
import SynonymsTest from './components/SynonymsTest'
import AntonymsStudy from './components/AntonymsStudy'
import AntonymsTest from './components/AntonymsTest'
import Home from './components/Home'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: formatJsonData(wordData)
    }
  }
  render() {
    return (
      <div>
        <Nav/>
        
        <Router>
          <Home path="/" data={this.state.data} />
          <SynonymsStudy path="synonyms_study" data={this.state.data} />
          <AntonymsStudy path="antonyms_study" data={this.state.data} />
          <SynonymsTest path="synonyms_test" data={this.state.data} />
          <AntonymsTest path="antonyms_test" data={this.state.data} />         
        </Router>
      </div>
        
     
    );

  }
  
}

export default App;
