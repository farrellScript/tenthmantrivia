import React, { Component } from 'react';
import Game from "./Screens/Game.jsx";
import Manage from "./Screens/Manage.jsx";

import './DB'
import { BrowserRouter, Route } from 'react-router-dom';
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}


class App extends Component {
  render() {
    return (
      <div>
        
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Game} />
            <Route path="/manage" component={Manage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
