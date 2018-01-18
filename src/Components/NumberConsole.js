import React, { Component } from 'react';

class NumberConsole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    }
  }

  generateNumber() {
    console.log("Created secret number")
    console.log(Math.random())
  }

  showResult(e) {
    e.preventDefault();
    console.log('Show Bulls and Cows');
  }

  render() {
    console.log(this.props.number)
    return (
      <div>
        <h3>Number Game Component:</h3>
        <button onClick={this.generateNumber}>New Game</button>
        <form>
          <input
            type="number"
            min="0"
            max="9999"
            placeholder="Input number here"
          /><button onClick={this.showResult}>Try</button><br/>
        </form>
      </div>
    );
  }
}

export default NumberConsole;
