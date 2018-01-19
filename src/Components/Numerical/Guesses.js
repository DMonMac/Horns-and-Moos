import React, { Component } from 'react';

class Guesses extends Component {
  render() {
    //console.log(this.props.guesses)
    return (
      <div>
        <h3>Guesses:</h3>
          <ol>
            {this.props.guesses.map((guess, index) => <li key={index}>{guess}</li>)}
          </ol>
      </div>
    );
  }
}

export default Guesses;
