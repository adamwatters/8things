import React, { Component } from 'react';
import './graph.css';

class GraphPage extends Component {

  render() {
    const { eightThings, scores, colors, globalSetState } = this.props;
    return (
      <div className="step-two">
        <div className="left">
          <p className="App-title" >How did you do today?</p>
          <svg viewBox="0 0 180 180">
            <path d={
              scores.map((score, i) => {
                const x = 90 + (score * 10) * Math.cos(2 * Math.PI * i / 8);
                const y = 90 + (score * 10) * Math.sin(2 * Math.PI * i / 8);
                if (i === 0) {
                  return `M ${x} ${y}`
                }
                return `L ${x} ${y}`
              }).join(' ')
            }/>
            {
              eightThings.map((thing, i) => {
                const x = 90 + 80 * Math.cos(2 * Math.PI * i / 8);
                const y = 90 + 80 * Math.sin(2 * Math.PI * i / 8);
                return (
                  <g key={i}>
                    <line x1="90" y1="90" x2={x} y2={y} strokeWidth="1" stroke="grey"></line>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((number, index) => {
                      const match = number === scores[i];
                      const withinScore = scores[i] && number <= scores[i];
                      const x = 90 + (number * 10) * Math.cos(2 * Math.PI * i / 8);
                      const y = 90 + (number * 10) * Math.sin(2 * Math.PI * i / 8);
                      return (
                        <g key={index}>
                          { match && <line x1="90" y1="90" x2={x} y2={y} strokeWidth="2" stroke={colors[i]}></line>}
                          <circle onClick={()=>{
                            globalSetState({scores: [...scores.slice(0, i), number, ...scores.slice(i + 1)]
                          })}} cx={x} cy={y} r="2.5" stroke={colors[i]} strokeWidth="0" fill={withinScore ? colors[i] : 'grey'} />
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
            eightThings.map((thing, i) => {
              return <li key={thing} style={{color:colors[i]}}>{`${thing}: ${scores[i]}`}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default GraphPage;
