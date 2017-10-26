import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import COLORS from './COLORS.js'
import InputsPage from './InputsPage.js'
import GraphPage from './GraphPage.js'
import LoginPage from './LoginPage.js'
import SignupPage from './SignupPage.js'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom'

class App extends Component {

  state = {
    eightThings: ['s','s','s','s','s','s','s','s'],
    colors: COLORS.slice(0,8),
    scores: [1, 1, 1, 1, 1, 1, 1, 1],
    openColorPicker: null,
    activeThing: null,
  }

  constructor() {
    super();
    var config = {
      apiKey: "AIzaSyB5jm_5ICfGHHTSQ3abCBPPcQMOPfmCQZI",
      authDomain: "eight-things.firebaseapp.com",
      projectId: "eight-things",
      databaseURL: "https://eight-things.firebaseio.com/",
    };
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.database = firebase.database();
    // this.provider = new firebase.auth.FacebookAuthProvider();
    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  componentDidMount() {
    this.auth.getRedirectResult().then((result) => {
      console.log(result)
      const user = result.user;
      if (user) {
        this.setState({user: user})
      }
    })
  }

  allValid() {
    return this.state.eightThings.every(thing => {
      return thing !== '';
    })
  }

  globalSetState = (state) => {
    this.setState(state)
  }

  render() {
    const allValid = this.allValid();
    const commonProps = {
      globalSetState: this.globalSetState,
      auth: this.auth,
      firebase: firebase,
      database: this.database,
    }
    return (
      <Router>
        <div className="app">
          <header className="app-header">
            <Link className="header-title" to='/'>Eight Things</Link>
            <span className="header-nav">
              <a className="nav-link" to={'/login'} onClick={() => {
                this.auth.signInWithRedirect(this.provider)
              }}>{this.state.user ? 'User' : 'Log In'}</a>
            </span>
          </header>
          <section className="app-body">
            <Switch>
              <Route path="/login" exact render={() => {
                return <LoginPage {...this.state} {...commonProps} allValid={allValid}/>
              }}/>
              <Route path="/signup" exact render={() => {
                return <SignupPage {...this.state} {...commonProps} allValid={allValid}/>
              }}/>
              <Route path="/1" exact render={() => {
                return <InputsPage {...this.state} {...commonProps} allValid={allValid}/>
              }}/>
              <Route path="/2" exact render={() => {
                if (allValid) {
                  return <GraphPage {...this.state} {...commonProps}/>
                }
                return <Redirect to="/1"/>
              }}/>
              <Route path="/" render={() => {
                return <Redirect to="/1"/>
              }}/>
            </Switch>
          </section>
        </div>
      </Router>
    )
  }
}

export default App;
