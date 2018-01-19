import React, { Component } from 'react';

class Guesses extends Component {
  render() {
    return (
      <div>
        <h3>Guesses:</h3>
          <ol>
            {this.props.records.map((record, index) => <li key={index}>{record.guess}: {record.bulls}B {record.cows}C</li>)}
          </ol>
      </div>
    );
  }
}

export default Guesses;
