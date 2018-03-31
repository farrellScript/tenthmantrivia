import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tenth Player Trivia</h1>
        </header>
        <p className="App-intro">
            Think you know a lot about baseball? Prove it!
        </p>
        <Link className="filler" to={'/playball'}>Play Ball</Link>
        <Link className="filler" to={'/manage'}>Manage Trivia Questions</Link>
      </div>
    );
  }
}

export default Home;
