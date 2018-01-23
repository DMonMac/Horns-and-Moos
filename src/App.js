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
        <div id="App">
          <header id="App-header">
            <img src={logo} id="App-logo" alt="logo" />
            <h1>Horns and Moos</h1>
          </header>
          <div id="App-contents">
            <div id="rules-div">
              <h2>HOW TO PLAY</h2>
              <p>
                <span>Guess</span> the <span>number</span> or <span>word</span>.
                <br/><br/>
                These <span>clues</span> will help you:
                <br/>
                <span>Horns</span>: Digit/Letter is <span>present</span> and in its <span>correct position</span>.
                <br/>
                <span>Moos</span>: Digit/Letter is <span>present</span> but is in the <span>wrong position</span>.
                <br/><br/>
                <span>Each letter/digit</span> will be <span>counted only once</span>. It will be checked as a <span>Horn first</span> (if it is a Horn), <span>then as a Moo</span> (if it is a Moo).<br/><br/>
                You can <span>change</span> the number of <span>digits/letters</span> before playing.
                <br/><br/>
                The <span>Word Version</span> can only generate a <span>limited</span> number of <span>words per month</span>.
              <br/>
                It may not generate a word when you play it.
                <br/>
                But hey, at least there's the <span>Number Version</span>, right?
              </p>
            </div>
            <div id="console-div">
              <h2>Select Version</h2>
              <button onClick={() => this.showNumberConsole()} id="numberConsoleButton">Number</button><button onClick={() => this.showWordConsole()} id="wordConsoleButton">Word</button>
              <div id="console-dock">
                {this.state.numberConsoleVisible ? <NumberConsole /> : null}
                {this.state.wordConsoleVisible ? <WordConsole /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
