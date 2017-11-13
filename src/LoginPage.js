import React, { Component } from 'react';

class LoginPage extends Component {

  constructor() {
    super();
  }

  state = {
    email: '',
    password: '',
  }

  onChange = (field) => (e) => {
    this.setState({[field]: e.target.value})
  }

  submit = () => {
    const {email, password} = this.state;
    if (email && password) {
      this.props.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log('code')
        console.log(error.code)
        console.log('message')
        console.log(error.message)
      });
    }
  }

  facebookLogin = () => {
    this.props.auth.signInWithRedirect(new this.props.firebase.auth.FacebookAuthProvider());
  }

  googleLogin = () => {
    this.props.auth.signInWithRedirect(new this.props.firebase.auth.GoogleAuthProvider());
  }

  render() {
    return (
      <div>
        <div className='description'>Login</div>
        <div>
          <div className='signup-buttons'>
            <button onClick={this.facebookLogin}>Facebook</button>
            <button onClick={this.googleLogin}>Google</button>
          </div>
          <div className='divider'>-OR-</div>
          <form className='signup-form'>
            <input type="text" placeholder='email' onChange={this.onChange('email')} value={this.state.email}/>
            <input type="text" placeholder='password' onChange={this.onChange('password')} value={this.state.password}/>
            <button onClick={this.submit}>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage;