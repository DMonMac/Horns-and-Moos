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
    this.inputDigits = this.inputDigits.bind(this);
    this.digitsSubmit = this.digitsSubmit.bind(this);
    this.inputGuess = this.inputGuess.bind(this);
    this.resultCount = this.resultCount.bind(this);
    this.giveUp = this.giveUp.bind(this);
  }
  //Genereate number when loaded
  componentDidMount() {
    this.newGame()
  }

  newGame() {
    if (this.state.digits < 1 || this.state.digits.toString().match(/\D/g)) {
      alert("Invalid number of digits.")
      document.getElementById("digitsInput").reset();
    } else {
      // Generate number
      let numberGen = Math.floor(Math.random()*Math.floor(Math.pow(10, this.state.digits)));
      let length = this.state.digits;
      let numberToGuess = '' + numberGen;
      while (numberToGuess.length < length) {
        numberToGuess = '0' + numberToGuess
      }
      // Reinitialize states
      document.getElementById("guessInput").reset();
      document.getElementById("guessButton").disabled = false
      document.getElementById("statusMonitor").innerHTML = ""
      document.getElementById("giveUpButton").disabled = false
      this.setState({
        number: numberToGuess,
        input: '',
        records: []
      }, () => {
                 console.log("Created new number.")
                 console.log("Initializing...")
                 console.log("Input: " + this.state.input)
                 console.log("Records:")
                 console.log(this.state.records)
               }
      );
    }
  }
  // Required so that it's possible to input on the forms
  inputDigits(event) {
    this.setState(
      {digits: event.target.value},
      () => {this.newGame()}
    )
  }
  digitsSubmit(event) { // Prevent action when 'Enter' is pressed in input field
    event.preventDefault();
  }
  inputGuess(event) {
    this.setState({input: event.target.value})
    if (event.target.value < 0 || event.target.value.match(/\D/g)) {
      alert("Please input positive numbers only.")
      document.getElementById("guessInput").reset();
    }
  }

  // Count Horns and Moos on click
  resultCount(event) {
    event.preventDefault();
    if (this.state.digits < 1 || this.state.digits.toString().match(/\D/g)) {
      alert("Invalid number of digits.")
      document.getElementById("digitsInput").reset();
    } else {
      // eslint-disable-next-line
      if (this.state.input.length == this.state.digits) {
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
          //console.log("Number Digit: " + numDigits[i])
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
        console.log(numDigits.length)
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
        });
        console.log('Resetting input field...')
        document.getElementById("guessInput").reset()

      } else {
          alert("Please input a " + this.state.digits +"-digit number" )
        }
    }
  }

  giveUp(){
    console.log('Player gave up.')
    document.getElementById("statusMonitor").innerHTML = "The number was " + this.state.number +". Click 'New Game' to play again."
    document.getElementById("guessButton").disabled = true
    document.getElementById("giveUpButton").disabled = true
  }

  render() {
    if (this.state.records.length !== 0) {
      let records = this.state.records
      let lastRecord = records[records.length - 1]
      // eslint-disable-next-line
      if (lastRecord.horns != this.state.digits) {
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
        <h2>Numerical Horns and Moos:</h2>
        <form id="digitsInput" onSubmit={this.digitsSubmit}>
          <label>Digits: </label>
          <input
            value = {this.state.digits}
            onChange={this.inputDigits}
            type="number"
            min='1'
            placeholder={'Input number of digits'}
          />
        </form>
        <p>I'm thinking of a {this.state.digits}-digit number...</p>
          <form id="guessInput">
            <label>Guess: </label>
            <input
              value = {this.state.guess}
              onChange={this.inputGuess}
              type="number"
              min='0'
              max={Math.pow(10, this.state.digits)-1}
              placeholder={'Input ' + this.state.digits + '-digit number'}
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
