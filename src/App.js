import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NumberConsole from './Components/Numerical/Console.js';
import WordConsole from './Components/Word/Console.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberConsoleVisible: false,
      wordConsoleVisible: false,
      word: null
    }
    this.showNumberConsole = this.showNumberConsole.bind(this);
  }

  showNumberConsole() {
    this.setState({
      numberConsoleVisible: true,
      wordConsoleVisible: false
    });
    document.getElementById("numberConsoleButton").disabled = true
    document.getElementById("wordConsoleButton").disabled = false
  }

  showWordConsole() {
    this.setState({
      numberConsoleVisible: false,
      wordConsoleVisible: true
    });
    document.getElementById("wordConsoleButton").disabled = true
    document.getElementById("numberConsoleButton").disabled = false
  }

  render() {
    //document.getElementById("consoleSlot")
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Horns and Moos</h1>
          </header>
          <button onClick={() => this.showNumberConsole()} id="numberConsoleButton">Numerical</button><button onClick={() => this.showWordConsole()} id="wordConsoleButton">Word</button>
        </div>
        <div id="consoleDock">
          {this.state.numberConsoleVisible ? <NumberConsole /> : null}
          {this.state.wordConsoleVisible ? <WordConsole /> : null}
        </div>
      </div>
    );
  }
}

export default App;
