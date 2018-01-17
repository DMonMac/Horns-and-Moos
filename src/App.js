import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NumberConsole from './Components/NumberConsole.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      word: null
    }
  }

  generateNumber() {
    console.log(Math.random())
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Horns and Moos</h1>
        </header>
        <button onClick={this.generateNumber}>Numbers</button>
        <div>
        <NumberConsole number={this.state.number}/>
        </div>
      </div>
    );
  }
}

export default App;
