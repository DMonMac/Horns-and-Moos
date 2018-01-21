import React, { Component } from 'react';

class Guesses extends Component {
  render() {
    return (
      <div>
        <h3>Guesses:</h3>
          <ol>
            {this.props.records.map((record, index) => <li key={index}>{record.guess.toUpperCase()}: {record.horns} Horns, {record.moos} Moos</li>)}
          </ol>
      </div>
    );
  }
}

export default Guesses;
