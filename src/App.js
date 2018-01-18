import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NumberConsole from './Components/NumberConsole.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: null
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Horns and Moos</h1>
        </header>
        <button onClick={this.showNumberConsole}>Numerical</button><button>Word</button>
        <div>
          <NumberConsole />
        </div>
      </div>
    );
  }
}

export default App;
