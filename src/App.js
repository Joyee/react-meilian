import React from 'react';
import {
  // BrowserRouter,
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './App.less';
import Home from './views/home'
import Album from './views/album'
import My from './views/my'
// import Detail from './views/detail'
const Detail = React.lazy(() => import('./views/detail'))

function App () {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/album' component={Album}></Route>
          <Route path='/my' component={My}></Route>
          {/* <Route path='/detail/:postId' component={Detail}></Route> */}
          <React.Suspense fallback={<div>loading</div>}>
            <Route path='/detail/:postId' component={Detail}></Route>
          </React.Suspense>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
