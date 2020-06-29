import React, { Component } from 'react';

import NavBar from './component/navigationBar/navBar.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './component/logedIn/Login';
import Canvas from './component/logedIn/canvas.jsx';
import Home from './component/logedIn/home'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logStatus: false
    }
    this.onLogged = this.onLogged.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onLogged(username, password) {
    console.log('onLogged invoked')
    console.log(username, password)
    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      console.log('onLogged data:', data);
      this.setState({
        ... this.state,
        logStatus: data.logStatus
      })
    })
    .catch(err => console.log('err onLogged:', err))
  }

  onSignUp(username, password) {
    console.log('onSignUp invoked')
    console.log(username, password)
    fetch('/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      console.log('onSignUp data:', data);
      this.setState({
        ... this.state,
        logStatus: data.logStatus
      })
    })
    .catch(err => console.log('err onLogged:', err))
  }



  render() {
    let renderCanvas;
    //remove the bang in the if statement when finsihed
    if (!this.state.logStatus) {
      renderCanvas = <Canvas />
    };

    let renderLogin;
    //put a bang in the if statement when finished
    if (this.state.logStatus) {
      renderLogin = <Route path="/login" render={(routeProps) => (
        <Login onSignUp={this.onSignUp}  onLogged={ this.onLogged }/>
      )} />
    };

    let renderHome;
    //put a bang in the if statement when finsihed
    if (this.state.logStatus) {
      renderHome = <Route path="/"  component={Home}/>
    };

    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            {/* <Route path="/login"  component={Login} /> */}
            { renderLogin }
            {/* <Route path="/canvas"  component={Canvas}/> */}
            { renderHome }
          </Switch>
        </div>
        { renderCanvas }
    </Router>
    )
  }
}


export default App;
