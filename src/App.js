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
import moment from 'moment'
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
    savedEightThings: null,
    allScores: null,
    todayScores: null,
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
    this.database = firebase.firestore();
    this.fbookProvider = new firebase.auth.FacebookAuthProvider();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    this.auth.getRedirectResult().then((result) => {
      const user = result.user;
      if (user) {
        this.setState({user: user});
        this.database.collection('categories').where("user", "==", user.uid).get().then(c => {
          if (!c.empty) {
            this.setState({savedEightThings: c.docs[0].data().things});
          }
        })
        this.database.collection('scores').where("user", "==", user.uid).get().then(c => {
          if (!c.empty) {
            if (moment().isSame(c.docs[0].data().day, 'day')) {
              this.setState({
                todayScores: c.docs[0].data().scores,
              });
            }
          }
        })
        this.unsubscribeToScores = this.database.collection('scores').where("user", "==", user.uid).onSnapshot(querySnapshot => {
          const allScores = [];
          querySnapshot.forEach((doc) => {
            allScores.push({
              date: doc.data().date,
              scores: doc.data().scores,
            })
          })
          this.setState({allScores})
        });
      }
    })

    this.auth.onAuthStateChanged(user => {
      if (user && !this.state.user) {
        this.setState({user: user});
        this.database.collection('categories').where("user", "==", user.uid).get().then(c => {
          if (!c.empty) {
            this.setState({savedEightThings: c.docs[0].data().things});
          }
        })
        this.database.collection('scores').where("user", "==", user.uid).get().then(c => {
          if (!c.empty) {
            if (moment().isSame(c.docs[0].data().day, 'day')) {
              this.setState({
                todayScores: c.docs[0].data().scores,
              });
            }
          }
        })
        this.unsubscribeToScores = this.database.collection('scores').where("user", "==", user.uid).onSnapshot(querySnapshot => {
          const allScores = [];
          querySnapshot.forEach((doc) => {
            allScores.push({
              date: doc.data().date,
              scores: doc.data().scores,
            })
          })
          this.setState({allScores})
        });
      } else if (!user && this.state.user) {
        this.unsubscribeToScores();
        this.setState({user: null, things: null});
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.user && nextState.user) {
      this.routerComponent.history.push('/setup')
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
    const {user, todayScores, savedEightThings} = this.state;
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
                  <Link className="nav-link" to={'/login'} onClick={this.signIn}>Log In</Link>
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
                if (!user) {
                  return <SignupPage {...this.state} {...commonProps} {...routerProps} />
                }
                return <Redirect to="/"/>
              }}/>
              <Route path="/login" exact render={(routerProps) => {
                if (!user) {
                  return <LoginPage {...this.state} {...commonProps} {...routerProps} />
                }
                return <Redirect to="/"/>
              }}/>
              <Route path="/setup" exact render={(routerProps) => {
                if (!savedEightThings) {
                  return <InputsPage {...this.state} {...commonProps} {...routerProps} allValid={allValid}/>
                }
                return <Redirect to="/"/>
              }}/>
              <Route path="/track" exact render={(routerProps) => {
                if (savedEightThings && !todayScores) {
                  return <GraphPage {...this.state} {...commonProps} {...routerProps}/>
                }
                return <Redirect to="/"/>
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
