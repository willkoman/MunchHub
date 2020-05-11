import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupList from './GroupList';
import GroupEdit from './GroupEdit';
import MenuView from "./MenuView";
import GroupListUser from "./GroupListUser";
class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/restaurants' exact={true} component={GroupList}/>
              <Route path='/home' component={GroupListUser}/>
            <Route path='/restaurants/:id/menu' component={MenuView}/>
            <Route path='/restaurants/:id' component={GroupEdit}/>

          </Switch>
        </Router>
    )
  }
}

export default App;