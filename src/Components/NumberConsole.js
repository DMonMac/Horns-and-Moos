import React, { Component } from 'react';

class NumberConsole extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.number)
    return (
      <div>
        <h3>Number Game Component:</h3>
        <input placeholder="Input number here"/><button>Try</button><br/>
        <button>New Game</button>
      </div>
    );
  }
}

export default NumberConsole;
