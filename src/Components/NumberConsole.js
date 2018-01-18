import React, { Component } from 'react';

class NumberConsole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '0000',
      digits: 4,
      guess: ''
    };
    this.newNumber = this.newNumber.bind(this);
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

  newNumber() {
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

  inputGuess(event) {
    this.setState({guess: event.target.value})
  }

  showResult(event) {
    event.preventDefault();
    console.log("Guess: " + this.state.guess)
    if (this.state.guess.length === this.state.digits) {
        console.log("Showing result for " + this.state.guess);
    } else {
      alert("Please input a " + this.state.digits +"-digit number" )
    }

  }

  render() {
    return (
      <div>
        <h3>Numerical Bulls and Cows:</h3>
        <button onClick={this.newNumber}>New Game</button>
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
      </div>
    );
  }
}

export default NumberConsole;
