import React, { Component } from 'react';
import qsAndAs from '../src/data/qsAndAs.json'
import './App.css';
import QuestionMenu from '../src/components/QuestionMenu'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: qsAndAs
    }
  }
  render() {
    return (
      <QuestionMenu data={this.state.data}/>
    );

  }
  
}

export default App;
