import React, { Component } from 'react';
import './graph.css';
import {format} from 'date-fns'

class GraphPage extends Component {

  constructor() {
    super()
    this.today = format(new Date(), 'dddd')
  }

  render() {
    const { savedEightThings, scores, colors, globalSetState, user, database } = this.props;
    return (
      <div className="step-two">
          <p className="App-title" >{`How was your ${this.today}`}</p>
          <svg className="graph" viewBox="0 0 200 200">
            <path className="shape" d={
              scores.map((score, i) => {
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
                      const match = number === scores[i];
                      const withinScore = scores[i] && number <= scores[i];
                      const x = 100 + (number * 16) * Math.cos(2 * Math.PI * i / 8);
                      const y = 100 + (number * 16) * Math.sin(2 * Math.PI * i / 8);
                      return (
                        <g key={index}>
                          { match && <line style={{pointerEvents: 'none'}}x1="100" y1="100" x2={x} y2={y} strokeWidth="2" stroke={colors[i]}></line>}
                          <circle onClick={()=>{
                            globalSetState({scores: [...scores.slice(0, i), number, ...scores.slice(i + 1)]
                          })}} cx={x} cy={y} r="4" stroke={colors[i]} strokeWidth="0" fill={withinScore ? colors[i] : 'grey'} />
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
          <button onClick={() => {
              database.collection('scores').add({
                user: user.uid,
                day: new Date(),
                scores: scores,
              });
              globalSetState({todayScores: scores})
              this.props.history.push('/')
            }}>Save</button>
      </div>
    )
  }
}

export default GraphPage;
