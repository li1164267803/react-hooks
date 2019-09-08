import React, {Component}from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './pages/login/index'
import HooksDom from './pages/dome/hooks-dom'
import Order from './pages/order'

class App extends Component {
  render() {
    return(
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/hooks" component={HooksDom}></Route>
          <Route path="/order" component={Order}></Route>
        </Switch>
      </div>
    )
  }
}
export default App;