import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import COLORS from './COLORS.js'
import LandingPage from './LandingPage.js'
import SignupPage from './SignupPage.js'
import LoginPage from './LoginPage.js'
import InputsPage from './InputsPage.js'
import UserPage from './UserPage.js'
import GraphPage from './GraphPage.js'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom'

class App extends Component {

  state = {
    eightThings: ['','','','','','','',''],
    colors: COLORS.slice(0,8),
    scores: [1, 1, 1, 1, 1, 1, 1, 1],
    openColorPicker: null,
    activeThing: null,
  }

  constructor() {
    super();
    console.log(firebase.UserInfo)
    var config = {
      apiKey: "AIzaSyB5jm_5ICfGHHTSQ3abCBPPcQMOPfmCQZI",
      authDomain: "eight-things.firebaseapp.com",
      projectId: "eight-things",
      databaseURL: "https://eight-things.firebaseio.com/",
    };
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.database = firebase.firestore();
    this.fbookProvider = new firebase.auth.FacebookAuthProvider();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    this.auth.onAuthStateChanged(user => {
      if (user && !this.state.user) {
        this.setState({user: user});
      }
    });
  }

  componentDidMount() {
    this.auth.getRedirectResult().then((result) => {
      const user = result.user;
      if (user) {
        this.setState({user: user})
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.user && nextState.user) {
      this.routerComponent.history.push('/1')
    }
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
    const {user} = this.state;
    const commonProps = {
      globalSetState: this.globalSetState,
      auth: this.auth,
      firebase: firebase,
      database: this.database,
      user: user,
    }
    return (
      <Router ref={component => this.routerComponent = component}>
        <div className="app">
          <header className="app-header">
            <Link className="header-title" to='/'>Eight Things</Link>
            <span className="header-nav">
              {user ? (
                  <Link className="header-title" to='/user'>{user.displayName || user.email}</Link>
                ) : (
                  <a className="nav-link" to={'/login'} onClick={this.signIn}>Sign In</a>
                )
              }
            </span>
          </header>
          <section className="app-body">
            <Switch>
              <Route path="/" exact render={(routerProps) => {
                return <LandingPage {...this.state} {...commonProps} {...routerProps} />
              }}/>
              <Route path="/user" exact render={(routerProps) => {
                return <UserPage {...this.state} {...commonProps} {...routerProps} />
              }}/>
              <Route path="/signup" exact render={(routerProps) => {
                return <SignupPage {...this.state} {...commonProps} {...routerProps} />
              }}/>
              <Route path="/login" exact render={(routerProps) => {
                return <LoginPage {...this.state} {...commonProps} {...routerProps} />
              }}/>
              <Route path="/setup" exact render={(routerProps) => {
                return <InputsPage {...this.state} {...commonProps} {...routerProps} allValid={allValid}/>
              }}/>
              <Route path="/track" exact render={(routerProps) => {
                if (allValid) {
                  return <GraphPage {...this.state} {...commonProps} {...routerProps}/>
                }
                return <Redirect to="/1"/>
              }}/>
              <Route path="/" render={() => {
                return <Redirect to="/"/>
              }}/>
            </Switch>
          </section>
        </div>
      </Router>
    )
  }
}

export default App;
