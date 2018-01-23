import React, { Component } from 'react';

class Guesses extends Component {
  render() {
    return (
      <div>
        <h3>Guesses:</h3>
          <ol id="results-div">
            {this.props.records.map((record, index) => <li key={index}><span>{record.guess.toUpperCase()}</span>: <span>{record.horns}</span> Horns, <span>{record.moos}</span> Moos</li>)}
          </ol>
      </div>
    );
  }
}

export default Guesses;
