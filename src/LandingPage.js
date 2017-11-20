import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class LandingPage extends Component {

  constructor() {
    super();
  }

  render() {
    const {user, todayScores, savedEightThings, colors} = this.props;
    return (
      <div>
        <div className='description'>Eight Things is a daily tracking app to help you allocate your limitied time, energy, and focus.</div>
        <div className='container landing'>
          {!user && <div style={{margin: '10px'}}><Link className='button' to='/signup'>Signup</Link></div>}
          {!user && <div style={{margin: '10px'}}><Link className='button' to='/login'>Login</Link></div>}
          {user && !savedEightThings && <div style={{margin: '10px'}}><Link className='button' to='/setup'>Start Tracking</Link></div>}
          {user && !todayScores && <div style={{margin: '10px'}}><Link className='button' to='/setup'>Record Today</Link></div>}
          {user && savedEightThings && todayScores && (
            <div>
            <div>Good job! Check in again tomorrow and keep your streak going.</div>
            <div style={{margin: '10px', 'display': 'flex'}}>
            <div className="left">
                <svg viewBox="0 0 180 180">
                  <path d={
                    todayScores.map((score, i) => {
                      const x = 90 + (score * 10) * Math.cos(2 * Math.PI * i / 8);
                      const y = 90 + (score * 10) * Math.sin(2 * Math.PI * i / 8);
                      if (i === 0) {
                        return `M ${x} ${y}`
                      }
                      return `L ${x} ${y}`
                    }).join(' ')
                  }/>
                  {
                    savedEightThings.map((thing, i) => {
                      const x = 90 + 80 * Math.cos(2 * Math.PI * i / 8);
                      const y = 90 + 80 * Math.sin(2 * Math.PI * i / 8);
                      return (
                        <g key={i}>
                          <line x1="90" y1="90" x2={x} y2={y} strokeWidth="1" stroke="grey"></line>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((number, index) => {
                            const match = number === todayScores[i];
                            const withinScore = todayScores[i] && number <= todayScores[i];
                            const x = 90 + (number * 10) * Math.cos(2 * Math.PI * i / 8);
                            const y = 90 + (number * 10) * Math.sin(2 * Math.PI * i / 8);
                            return (
                              <g key={index}>
                                { match && <line style={{pointerEvents: 'none'}}x1="90" y1="90" x2={x} y2={y} strokeWidth="2" stroke={colors[i]}></line>}
                                <circle cx={x} cy={y} r="2.5" stroke={colors[i]} strokeWidth="0" fill={withinScore ? colors[i] : 'grey'} />
                              </g>
                            )
                          })}
                        </g>
                      )
                    })
                  }
                  <circle cx='90' cy='90' fill='white' r="2.5" />
                </svg>
              </div>
              <ul className="right">
                {
                  savedEightThings.map((thing, i) => {
                    return <li key={i} style={{color:colors[i]}}>{`${thing}: ${todayScores[i]}`}</li>
                  })
                }
                <button>Previous Day</button>
                <button>Next Day</button>
              </ul>
            </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default LandingPage;