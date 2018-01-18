import React, { Component } from 'react';

class NumberConsole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      digits: 4
    };
    this.newNumber = this.newNumber.bind(this);
  }

  componentDidMount() {
    let numberGen = Math.floor(Math.random()*Math.floor(Math.pow(10, this.state.digits)));
    let length = this.state.digits;
    let numberToGuess = '' + numberGen;
    while (numberToGuess.length < length) {
      numberToGuess = '0' + numberToGuess
      console.log(numberToGuess)
    }
    this.setState({number: numberToGuess});
  }

  newNumber() {
    let numberGen = Math.floor(Math.random()*Math.floor(Math.pow(10, this.state.digits)));
    let length = this.state.digits;
    let numberToGuess = '' + numberGen;
    while (numberToGuess.length < length) {
      numberToGuess = '0' + numberToGuess
    }
    this.setState({number: numberToGuess});
  }

  showResult() {
    console.log("Showing result of guessed number");
  }

  render() {
    console.log("Created new number: " + this.state.number)
    return (
      <div>
        <h3>Numerical Bulls and Cows:</h3>
        <button onClick={this.newNumber}>New Game</button>
          <div>
            <input
              //value ='0000'
              ref={(input) => {this.numberInput = input; }}
              type="number"
              min='0'
              max={Math.pow(10, this.state.digits)-1}
              placeholder="Input number here"
            /><button onClick={this.showResult}>Try</button><br/>
          </div>
      </div>
    );
  }
}

export default NumberConsole;
