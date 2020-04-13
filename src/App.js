import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import './App.less';
import Home from './views/home'
import Album from './views/album'
import My from './views/my'
import Tabbar from './common/tabbar'

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Tabbar />
        <Route path='/' exact component={Home}></Route>
        <Route path='/album' exact component={Album}></Route>
        <Route path='/my' exact component={My}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
