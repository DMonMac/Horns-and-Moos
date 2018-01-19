import React, { Component } from 'react';
import Guesses from './Guesses.js';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      digits: 4,
      guess: '',
      guesses: [],
      bulls: 0,
      cows: 0
    };
    this.newGame = this.newGame.bind(this);
    this.inputGuess = this.inputGuess.bind(this);
    this.showResult = this.showResult.bind(this);
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
    });
  }

  newGame() {
    let numberGen = Math.floor(Math.random()*Math.floor(Math.pow(10, this.state.digits)));
    let length = this.state.digits;
    let numberToGuess = '' + numberGen;
    while (numberToGuess.length < length) {
      numberToGuess = '0' + numberToGuess
    }
    this.setState({number: numberToGuess,
                   guess: '',
                   guesses: [],
                   bulls: 0,
                   cows: 0}, () => {
                     //console.log("Created new number: " + this.state.number)
                     //console.log("Guess: " + this.state.guess)
                     //console.log("Bulls: " + this.state.bulls)
                     //console.log("Cows: " + this.state.cows)
                   });
  }

  inputGuess(event) {
    this.setState({guess: event.target.value})
  }

  showResult(event) {
    event.preventDefault();
    if (this.state.guess.length === this.state.digits) {
      this.setState({guesses: this.state.guesses.concat(this.state.guess)});

      let numDigits = this.state.number.split('')
      let guessDigits = this.state.guess.split('')
      let ctr = -1
      let bulls = 0
      let cows = 0

      console.log("Result for " + this.state.guess + ":")

      numDigits.forEach(numDigit => {
        ctr++;
        console.log("Counter: "+ctr)
        console.log("Number Digit: "+numDigit)
        let guessDigit = guessDigits[ctr]
        console.log("Guess Digit: "+guessDigit)
        if ( guessDigit === numDigit) {
          bulls++;
          this.setState({bulls: bulls})
        }
      })

    } else {
        alert("Please input a " + this.state.digits +"-digit number" )
      }

  }

  render() {
    console.log("this.state.bulls: "+this.state.bulls)
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
            <button type="submit" onClick={this.showResult}>Try</button><br/>
          </form>
          <h3>Bulls: {this.state.bulls}</h3>
          <h3>Cows: {this.state.cows} </h3>
          <Guesses
            guesses={this.state.guesses}
          />
      </div>
    );
  }
}

export default Console;
