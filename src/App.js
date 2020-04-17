import React from 'react';
import {
  // BrowserRouter,
  HashRouter as Router,
  Route
} from 'react-router-dom'
import './App.less';
import Home from './views/home'
import Album from './views/album'
import My from './views/my'
import Detail from './views/detail'

function App () {
  return (
    <Router>
      <div className="App">
        <Route path='/' exact component={Home}></Route>
        <Route path='/album' component={Album}></Route>
        <Route path='/my' component={My}></Route>
        <Route path='/detail/:postId' component={Detail}></Route>
      </div>
    </Router>
  );
}

export default App;
