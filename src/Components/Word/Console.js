import React, { Component } from 'react';
import Results from './Results.js';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      digits: 4,
      input: '',
      records: []
    };

    this.newGame = this.newGame.bind(this);
    this.inputGuess = this.inputGuess.bind(this);
    this.resultCount = this.resultCount.bind(this);
    this.giveUp = this.giveUp.bind(this);
  }
  //Genereate number when loaded
  componentDidMount() {
    this.newGame()
  }

  newGame() {
    // Generate number
    let numberGen = Math.floor(Math.random()*Math.floor(Math.pow(10, this.state.digits)));
    let length = this.state.digits;
    let numberToGuess = '' + numberGen;
    while (numberToGuess.length < length) {
      numberToGuess = '0' + numberToGuess
    }
    // Reinitialize states
    document.getElementById("statusMonitor").innerHTML = "";
    document.getElementById("tryButton").style.pointerEvents = 'auto';
    this.setState({
      number: numberToGuess,
      input: '',
      records: []
    }, () => {
               console.log("Created new number: " + this.state.number)
               console.log("Initializing...")
               console.log("Input: " + this.state.input)
               console.log("Records:")
               console.log(this.state.records)
             }
    );
  }
  // Required so that it's possible to input numbers
  inputGuess(event) {
    this.setState({input: event.target.value})
  }
  // Count Horns and Moos on click
  resultCount(event) {
    event.preventDefault();
    if (this.state.input.length === this.state.digits) {
      // Required values
      let numDigits = this.state.number.split('')
      let inputDigits = this.state.input.split('')
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
      for(var i = numDigits.length -1; i >=0; i--){
        console.log("Index: " + i)
        console.log("Number Digit: " + numDigits[i])
        let inputDigit = inputDigits[i]
        console.log("Guess Digit: " + inputDigit)
        if (inputDigit === numDigits[i]) {
          horns++;
          hornIndeces = hornIndeces.concat(i)
        }
      }
      console.log("Horns: " + horns)
      console.log("Horn Indeces:")
      console.log(hornIndeces)

      //Solve for Cows
      console.log('Solve for Moos:')
      console.log('Removing these indeces from Number Digits Array:')
      console.log(hornIndeces)
      hornIndeces.forEach(index => {
        numDigits.splice(index,1)
        inputDigits.splice(index,1)
      })
      console.log('Remaining digits to check:')
      console.log(numDigits)
      console.log('Check with these digits:')
      console.log(inputDigits)

      inputDigits.forEach(digit => {
        let numIndexToRemove = numDigits.indexOf(digit)
        if (numIndexToRemove !== -1) {
          numDigits.splice(numIndexToRemove,1)
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
        let lastRecord = this.state.records[this.state.records.length - 1]
        if (lastRecord.horns === 4) {
          document.getElementById("tryButton").style.pointerEvents = 'none';
          console.log("'Try' button now disabled. Click 'New Game' to play again.")
        }
      });
      console.log('Resetting input field...')
      document.getElementById("guessInput").reset()

    } else {
        alert("Please input a " + this.state.digits +"-digit number" )
      }
  }

  giveUp(){
    document.getElementById("statusMonitor").innerHTML = "The number was " + this.state.number +". Click 'New Game' to play again.";
    document.getElementById("tryButton").style.pointerEvents = 'none';
  }

  render() {
    if (this.state.records.length !== 0) {
      let records = this.state.records
      let lastRecord = records[records.length - 1]
      if (lastRecord.horns !== 4) {
        document.getElementById("statusMonitor").innerHTML = "Keep guessing..."
      } else {
        document.getElementById("statusMonitor").innerHTML = "You got it! Good job!"
      }
    }
    return (
      <div>
        <h2>Word Bulls and Cows:</h2>
        <button onClick={this.newGame}>New Game</button><button onClick={this.giveUp}>Give Up</button>
        <p>I'm thinking of a {this.state.digits}-digit number...</p>
          <form id="guessInput">
            <label>Guess:</label>
            <input
              value = {this.state.guess}
              onChange={this.inputGuess}
              type="number"
              min='0'
              max={Math.pow(10, this.state.digits)-1}
              placeholder={'Input ' + this.state.digits + '-digit number'}
            />
            <button
              id="tryButton"
              type="submit"
              onClick={this.resultCount}>Try</button><br/>
          </form>
          <Results
            records={this.state.records}
          />
          <div id="statusMonitor"></div>
      </div>
    );
  }
}

export default Console;
