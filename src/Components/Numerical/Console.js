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
    this.countBulls = this.countBulls.bind(this);
  }

  componentDidMount() {
    let numberGen = Math.floor(Math.random()*Math.floor(Math.pow(10, this.state.digits)));
    let length = this.state.digits;
    let numberToGuess = '' + numberGen;
    while (numberToGuess.length < length) {
      numberToGuess = '0' + numberToGuess
    }
    this.setState({number: numberToGuess}, () => {
      console.log("Created new number: " + this.state.number)
      console.log("Input: " + this.state.input)
      console.log(this.state.records)
    });
  }

  newGame() {
    let numberGen = Math.floor(Math.random()*Math.floor(Math.pow(10, this.state.digits)));
    let length = this.state.digits;
    let numberToGuess = '' + numberGen;
    while (numberToGuess.length < length) {
      numberToGuess = '0' + numberToGuess
    }
    this.setState({
      number: numberToGuess,
      input: '',
      records: []
    }, () => {
               console.log("Created new number: " + this.state.number)
               console.log("Input: " + this.state.input)
               console.log(this.state.records)
             }
    );
  }

  inputGuess(event) {
    this.setState({input: event.target.value})
  }

  countBulls() {
    // Required values
    let numDigits = this.state.number.split('')
    let inputDigits = this.state.input.split('')
    let records = this.state.records

    // Initialize count
    let bulls = 0
    let bullIndeces = []
    let cows = 0

    //Solve for Bulls:
    console.log('Solve for Bulls:')
    for(var i = numDigits.length -1; i >=0; i--){
      console.log("Index: " + i)
      console.log("Number Digit: " + numDigits[i])
      let inputDigit = inputDigits[i]
      console.log("Guess Digit: " + inputDigit)
      if (inputDigit === numDigits[i]) {
        bulls++;
        bullIndeces = bullIndeces.concat(i)
      }
    }

    //Solve for Cows
    console.log('Solve for Cows:')
    console.log(bullIndeces)
    bullIndeces.forEach(index => {
      numDigits.splice(index,1)
      inputDigits.splice(index,1)
      console.log(numDigits)
      console.log(inputDigits)
    })
    console.log(numDigits)
    console.log(inputDigits)

    inputDigits.forEach(digit => {
      let numIndexToRemove = numDigits.indexOf(digit)
      console.log("numindex: "+numIndexToRemove)
      if (numIndexToRemove !== -1) {
        numDigits.splice(numIndexToRemove,1)
        console.log(numDigits)
        console.log(inputDigits)
        cows++;
      }
    })

    console.log(records)

    this.setState({
      records: records.concat(
        [
          {
            guess: this.state.input,
            bulls: bulls,
            bullIndeces: bullIndeces,
            cows: cows
          }
        ]
      )
    }, () => {
      console.log(this.state.records)
    })
  }

  resultCount(event) {
    event.preventDefault();
    if (this.state.input.length === this.state.digits) {
      this.countBulls()
    } else {
        alert("Please input a " + this.state.digits +"-digit number" )
      }
  }

  render() {

    return (
      <div>
        <h2>Numerical Bulls and Cows:</h2>
        <button onClick={this.newGame}>New Game</button>
        <p>I'm thinking of a {this.state.digits}-digit number...</p>
          <form>
            <label>Guess:</label>
            <input
              value = {this.state.guess}
              onChange={this.inputGuess}
              type="number"
              min='0'
              max={Math.pow(10, this.state.digits)-1}
              placeholder={'Input ' + this.state.digits + '-digit number'}
            />
            <button type="submit" onClick={this.resultCount}>Try</button><br/>
          </form>
          <Results
            records={this.state.records}
          />


      </div>
    );
  }
}

export default Console;
