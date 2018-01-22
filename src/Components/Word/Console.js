import React, { Component } from 'react';
import Results from './Results.js';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsAPI: [],
      word: '',
      letters: 4,
      input: '',
      records: []
    };
    this.newGame = this.newGame.bind(this);
    this.inputLetters = this.inputLetters.bind(this);
    this.inputGuess = this.inputGuess.bind(this);
    this.resultCount = this.resultCount.bind(this);
    this.giveUp = this.giveUp.bind(this);
  }

  componentDidMount() {
    this.stopGame()
    document.getElementById("statusMonitor").innerHTML = "Click 'New Game' to start";
  }

  stopGame() {
    console.log('Game stopped')
    document.getElementById("lettersInput").disabled = true;
    document.getElementById("guessInput").disabled = true;
    document.getElementById("guessButton").disabled = true;
    document.getElementById("giveUpButton").disabled = true;
  }

  newGame() {
    // Allow CORS by prefixing this URL
    const corsAnywhere = "https://horns-and-moos-proxy.herokuapp.com/";
    let apiURL = `https://od-api.oxforddictionaries.com:443/api/v1/wordlist/en/lexicalCategory%3Dverb?word_length=${this.state.letters}&exact=true`;
    // Access Oxford Dictionary API
    fetch((corsAnywhere + apiURL), {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "app_id": "a7ba1f56",
        "app_key": "6d8b9abf8a6dc96eef656548788453c7"
      }
    })
    .catch(() => alert("Can’t fetch API."))
    .then(wordsAPI => wordsAPI.json())
    .then(wordsAPIjson => {
      this.setState(
        { wordsAPI: wordsAPIjson },
          () => {
            // eslint-disable-next-line
            if (this.state.wordsAPI.results.length != 0 || !!Object.keys(this.state.wordsAPI.results).length) {
              console.log("Results: " + this.state.wordsAPI.results.length)
              let wordGen = this.state.wordsAPI.results[Math.floor(Math.random() * this.state.wordsAPI.results.length)].word.toString();
              this.setState(
                {word: wordGen},
                () => {
                  // Reinitialize states
                  document.getElementById("guessInput").reset();
                  document.getElementById("guessButton").disabled = false
                  document.getElementById("statusMonitor").innerHTML = ""
                  document.getElementById("giveUpButton").disabled = false
                  this.setState({
                    word: wordGen,
                    input: '',
                    records: []
                  }, () => {
                             console.log("Created new word.")
                             console.log("Initializing...")
                             console.log("Input: " + this.state.input)
                             console.log("Records:")
                             console.log(this.state.records)
                             document.getElementById("statusMonitor").innerHTML = "Game is ready! Begin guessing."
                           }
                  );
                }
              )
            } else {
              this.stopGame()
              document.getElementById("statusMonitor").innerHTML = "No words received. Please try another number of letters or try the Numerical version of this game first and try again later."
            }
          }
        )
    })
    document.getElementById("statusMonitor").innerHTML = "Loading new game..."
  }

  // Required so that it's possible to input on the forms
  inputLetters(event) {
    if (event.target.value < 1 || event.target.value.match(/[^0-9]]/g)) {
      alert("Invalid number of letters.")
      document.getElementById("lettersInput").reset();
    }
    this.setState(
      {letters: event.target.value},
      () => {
        this.stopGame()
        document.getElementById("statusMonitor").innerHTML = "Number of letters changed. Click 'New Game' to start";
      }
    )
  }

  // Prevent action when 'Enter' is pressed in input field
  lettersSubmit(event) {
    event.preventDefault();
  }

  inputGuess(event) {
    if (event.target.value.match(/[^A-Za-z]/g)) {
      alert("Invalid guess. Only letters are allowed");
      document.getElementById("guessInput").reset();
    }
    this.setState({input: event.target.value})
  }

  // Count Horns and Moos on click
  resultCount(event) {
    event.preventDefault();
    // eslint-disable-next-line
    if (this.state.input.length == this.state.letters) {
      // Required values
      let wordLetters = this.state.word.split('')
      let inputLetters = this.state.input.split('')
      let records = this.state.records

      // Initialize count
      let horns = 0
      let hornIndeces = []
      let moos = 0
      console.log('Guess: ' + this.state.input)
      console.log('Results for ' + this.state.input + ":")

      //Solve for Horns:
      console.log('Solve for Horns:')
      // Compare number and guess by index
      for(var i = wordLetters.length -1; i >=0; i--){
        console.log("Index: " + i)
        console.log("Word Letter: " + wordLetters[i])
        let inputLetter = inputLetters[i]
        console.log("Guess Letter: " + inputLetter)
        if (inputLetter === wordLetters[i]) {
          horns++;
          hornIndeces = hornIndeces.concat(i)
        }
      }
      console.log("Horns: " + horns)
      console.log("Horn Indeces:")
      console.log(hornIndeces)

      //Solve for Cows
      console.log('Solve for Moos:')
      console.log('Removing these indeces from Word Letters Array:')
      console.log(hornIndeces)
      hornIndeces.forEach(index => {
        wordLetters.splice(index,1)
        inputLetters.splice(index,1)
      })
      console.log('Remaining letters to check:')
      console.log(wordLetters)
      console.log('Check with these digits:')
      console.log(inputLetters)

      inputLetters.forEach(letter => {
        let wordIndexToRemove = wordLetters.indexOf(letter)
        if (wordIndexToRemove !== -1) {
          wordLetters.splice(wordIndexToRemove,1)
          moos++;
        }
      })
      console.log("Moos: " + moos)

      this.setState({
        records: records.concat(
          [
            {
              guess: this.state.input,
              horns: horns,
              hornIndeces: hornIndeces,
              moos: moos
            }
          ]
        )
      }, () => {
        console.log('Stored this data in records:')
        console.log(this.state.records[this.state.records.length - 1])
        console.log('Records updated:')
        console.log(this.state.records)
      });
      console.log('Resetting input field...')
      document.getElementById("guessInput").reset()

    } else {
        alert("Please input " + this.state.letters +" letters." )
      }
  }

  giveUp(){
    console.log('Player gave up.')
    document.getElementById("statusMonitor").innerHTML = "The word was " + this.state.word.toUpperCase() +". Click 'New Game' to play again."
    document.getElementById("guessButton").disabled = true
    document.getElementById("giveUpButton").disabled = true
  }

  render() {
    if (this.state.records.length !== 0) {
      let records = this.state.records
      let lastRecord = records[records.length - 1]
      // eslint-disable-next-line
      if (lastRecord.horns != this.state.letters) {
        document.getElementById("statusMonitor").innerHTML = "Keep guessing..."
      } else {
        document.getElementById("statusMonitor").innerHTML = "You got it! Good job!"
        document.getElementById("guessButton").disabled = true
        document.getElementById("giveUpButton").disabled = true
        console.log("'Try' button now disabled. Click 'New Game' to play again.")
      }
    }
    return (
      <div>
        <h2>Word Horns and Moos:</h2>
        <form id="lettersInput" onSubmit={this.lettersSubmit}>
          <label>Letters: </label>
          <input
            value = {this.state.letters}
            onChange={this.inputLetters}
            type="number"
            min='1'
            placeholder={'Input how many letters'}
          />
        </form>
        <p>I'm thinking of a {this.state.letters}-letter verb...</p>
          <form id="guessInput">
            <label>Guess: </label>
            <input
              value = {this.state.guess}
              onChange={this.inputGuess}
              type="text"
              min={this.state.letters}
              max={this.state.letters}
              placeholder={'Input ' + this.state.letters + ' letters'}
            />
            <button
              id="guessButton"
              type="submit"
              onClick={this.resultCount}>Try</button><br/>
          </form>
          <Results
            records={this.state.records}
          />
          <div id="statusMonitor"></div>
          <button onClick={this.newGame}>New Game</button><button onClick={this.giveUp} id="giveUpButton">Give Up</button>
      </div>
    );
  }
}

export default Console;
