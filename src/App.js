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
          <div className=".App-intro">
            <div id="rules-div">
              <h3>HOW TO PLAY</h3>
              <p>
                Guess the number or word.
                <br/><br/>
                These clues will help you:
                <br/>
                <span>Horns</span>: Digit/Letter is <span>present</span> and in its <span>correct position</span>.
                <br/>
                <span>Moos</span>: Digit/Letter is <span>present</span> but is in the <span>wrong position</span>.
                <br/><br/>
                You can change the number of digits/letters before playing.
                <br/><br/>
                The Word Version can only generate a limited number of words per month.
              <br/>
                It may not generate a word when you play it.
                <br/>
                But hey, at least there's the Number Version, right?
              </p>
            </div>
          </div>
        </div>

        <div id="console-div">
          <h3>Select Version</h3>
          <button onClick={() => this.showNumberConsole()} id="numberConsoleButton">Number</button><button onClick={() => this.showWordConsole()} id="wordConsoleButton">Word</button>
          <div id="console-dock">
            {this.state.numberConsoleVisible ? <NumberConsole /> : null}
            {this.state.wordConsoleVisible ? <WordConsole /> : null}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
