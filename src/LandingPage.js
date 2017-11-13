import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class LandingPage extends Component {

  constructor() {
    super();
  }


  render() {
    const {user} = this.props;
    return (
      <div>
        <div className='description'>Eight Things is a daily tracking app to help you allocate your limitied time, energy, and focus.</div>
        <div className='container'>
          {!user && <div style={{margin: '10px'}}><Link className='button' to='/signup'>Signup</Link></div>}
          {!user && <div style={{margin: '10px'}}><Link className='button' to='/login'>Login</Link></div>}
          {user && <div style={{margin: '10px'}}><Link className='button' to='/setup'>Start Tracking</Link></div>}
        </div>
      </div>
    )
  }
}

export default LandingPage;