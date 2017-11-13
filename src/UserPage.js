import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class UserPage extends Component {

  constructor() {
    super();
  }

  signoutUser = () => {
    this.props.auth.signOut().then(() => {
      console.log('signing out')
      this.props.history.push('/login')
    }).catch(function(error) {
      console.log(error)
    });
  }

  render() {
    return (
      <div>
        <div className='description'>User</div>
        <div className='container'>
          <div style={{margin: '10px'}}><button onClick={this.signoutUser}>Signout</button></div>
        </div>
      </div>
    )
  }
}

export default UserPage;