import React, { Component } from 'react';

class SignupPage extends Component {

  constructor() {
    super();
  }

  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  onChange = (field) => (e) => {
    this.setState({[field]: e.target.value})
  }

  submit = () => {
    const {email, password, passwordConfirmation} = this.state;
    if (email && password && (password === passwordConfirmation)) {
      console.log('creating a user')
      this.props.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
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
        <div className='description'>Signup</div>
        <div>
          <div className='signup-buttons'>
            <button onClick={this.facebookLogin}>Facebook</button>
            <button onClick={this.googleLogin}>Google</button>
          </div>
          <div className='divider'>-OR-</div>
          <div className='signup-form'>
            <input type="text" placeholder='email' onChange={this.onChange('email')} value={this.state.email}/>
            <input type="text" placeholder='password' onChange={this.onChange('password')} value={this.state.password}/>
            <input type="text" placeholder='confirm password' onChange={this.onChange('passwordConfirmation')} value={this.state.passwordConfirmation}/>
            <button onClick={this.submit}>Signup</button>
          </div>
        </div>
      </div>
    )
  }
}

export default SignupPage;