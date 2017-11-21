import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class LandingPage extends Component {

  constructor() {
    super();
  }

  state = {
    dayOffset: 0,
  }

  render() {
    const {user, todayScores, allScores, savedEightThings, colors} = this.props;
    return (
      <div>
        <div className='description'>{
          todayScores ?
            'Good job! Check in again tomorrow and keep your streak going.' :
            'Eight Things is a daily tracking app to help you allocate your limitied time, energy, and focus.'}
          </div>
        <div className='container landing'>
          {!user && <div style={{margin: '10px'}}><Link className='button' to='/signup'>Signup</Link></div>}
          {!user && <div style={{margin: '10px'}}><Link className='button' to='/login'>Login</Link></div>}
          {user && !savedEightThings && <div style={{margin: '10px'}}><Link className='button' to='/setup'>Start Tracking</Link></div>}
          {user && !todayScores && <div style={{margin: '10px'}}><Link className='button' to='/track'>Record Today</Link></div>}
          {user && savedEightThings && todayScores && (
            <div>
            <div style={{margin: '10px', 'display': 'flex'}}>
            <svg className="graph" viewBox="0 0 200 200">
              <path className="shape" d={
                todayScores.map((score, i) => {
                  const x = 100 + (score * 16) * Math.cos(2 * Math.PI * i / 8);
                  const y = 100 + (score * 16) * Math.sin(2 * Math.PI * i / 8);
                  if (i === 0) {
                    return `M ${x} ${y}`
                  }
                  return `L ${x} ${y}`
                }).join(' ')
              }/>
              {
                savedEightThings.map((thing, i) => {
                  const x = 100 + 80 * Math.cos(2 * Math.PI * i / 8);
                  const y = 100 + 80 * Math.sin(2 * Math.PI * i / 8);
                  const textOffsetX = i === 0 ? -10 : i === 4 ? 10 : 0;
                  const textOffsetY = i === 0 || i === 4 ? -6 : y <= 101 ? -3 : 10;
                  console.log(thing)
                  console.log(y)
                  const textX = 100 + + textOffsetX + 85 * Math.cos(2 * Math.PI * i / 8);
                  const textY = 100 + textOffsetY + 85 * Math.sin(2 * Math.PI * i / 8);
                  return (
                    <g key={i}>
                      <line x1="100" y1="100" x2={x} y2={y} strokeWidth="1" stroke="grey"></line>
                      {[1, 2, 3, 4, 5].map((number, index) => {
                        const match = number === todayScores[i];
                        const withinScore = todayScores[i] && number <= todayScores[i];
                        const x = 100 + (number * 16) * Math.cos(2 * Math.PI * i / 8);
                        const y = 100 + (number * 16) * Math.sin(2 * Math.PI * i / 8);
                        return (
                          <g key={index}>
                            { match && <line style={{pointerEvents: 'none'}}x1="100" y1="100" x2={x} y2={y} strokeWidth="2" stroke={colors[i]}></line>}
                            <circle cx={x} cy={y} r="4" stroke={colors[i]} strokeWidth="0" fill={withinScore ? colors[i] : 'grey'} />
                          </g>
                        )
                      })}
                      <text textAnchor="middle" x={textX} y={textY}>{thing}</text>
                    </g>
                  )
                })
              }
              <circle cx='100' cy='100' fill='white' r="2.5" />
              </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default LandingPage;