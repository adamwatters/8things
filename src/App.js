import React, { Component } from 'react';
import './App.css';
import './graph.css';
import { GithubPicker } from 'react-color'

const colorSet = ['#ff0000',
                  '#ff6c00',
                  '#ffa100',
                  '#ffd100',
                  '#6be1a7',
                  '#00ffff',
                  '#3bbedf',
                  '#3e80bf',
                  '#2f44a0',
                  '#d391b9',
                  '#ffc0cb',
                  '#228b22',
                  '#3fa750',
                  '#56c37b',
                  '#ffff00',
                  '#7fffd4',
                  '#000000',
                  '#383b3b',
                  '#707777',
                  '#f0ffff',
                  '#aeb9b9',
                  ]

const lightenColor = (color, percent) => {
    const num = parseInt(color,16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const B = (num >> 8 & 0x00FF) + amt
    const G = (num & 0x0000FF) + amt;
    return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
};

class App extends Component {

  state = {
    eightThings: ['love','art','fitness','language','health','yoga','cooking','programming'],
    colors: colorSet.slice(0,8),
    step: 0,
    scores: [1, 1, 1, 1, 1, 1, 1, 1],
    openColorPicker: null,
    activeThing: null,
  }

  constructor() {
    super();
    this.inputs = [];
  }

  allValid() {
    return this.state.eightThings.every(thing => {
      return thing !== '';
    })
  }

  render() {
    const { eightThings, step, activeThing, scores, openColorPicker, colors } = this.state;
    // each axis has an angle
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Eight Things</h1>
        </header>
        <section className="App-body">
          { (step === 0) && (
            <div className="step-one">
              <p className="App-title" >What eight things do you want to focus on in your life?</p>
              <ul className='category-inputs'>
              {
                eightThings.map((thing, i) => {
                  const inputStyle = {
                    outlineColor: colors[i],
                  }
                  const buttonStyle= {
                    backgroundColor: colors[i],
                    borderColor: colors[i],
                    outlineColor: colors[i],
                  }
                  return (
                    <li className='category-input' key={i}>
                      <input style={inputStyle} ref={el => this.inputs[i] = el} onFocus={()=>this.setState({openColorPicker:null})} value={thing} placeholder={i + 1} onChange={(e) => {
                        this.setState({
                          eightThings: [...eightThings.slice(0, i), e.target.value, ...eightThings.slice(i + 1)]
                        })}}/>
                      <button style={buttonStyle} className='color-button' onClick={() => {
                        this.setState({openColorPicker: i === openColorPicker ? null : i })}
                      }>
                      </button>
                      {i === openColorPicker && (
                        <span className='color-picker-container'>
                          <GithubPicker width={188} triangle={'top-right'} onChangeComplete={(color)=> {
                            this.setState({
                              colors: [...colors.slice(0, i), color.hex, ...colors.slice(i + 1)],
                              openColorPicker: null,
                            })
                          }} colors={colorSet} />
                        </span>
                      )}
                    </li>
                  )
                })
              }
              </ul>
              { this.allValid() && <button onClick={() => {this.setState({step: 1})}}>Start Tracking <span>🙌</span></button> }
            </div>
          )}
          { (step === 1) && (
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
                        <g onMouseEnter={() => this.setState({activeThing: i})} onMouseLeave={() => this.setState({activeThing: null})} key={i}>
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
                                  this.setState({scores: [...scores.slice(0, i), number, ...scores.slice(i + 1)]
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
          )}
          </section>
      </div>
    )
  }
}

export default App;
