import React, { Component } from 'react';
import './App.css';
import './graph.css';

class App extends Component {

  state = {
    eightThings: ['friend','family','love','marriage','sex','sports','health','adventure'],
    step: 0,
    scores: [0, 0, 0, 0, 0, 0, 0, 0],
    activeThing: null,
  }

  allValid() {
    return this.state.eightThings.every(thing => {
      return thing !== '';
    })
  }

  render() {
    const { eightThings, step, activeThing, scores } = this.state;
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
                  return <li className='category-input' key={i}><input value={thing} placeholder={i + 1} onChange={(e) => {
                    this.setState({
                      eightThings: [...eightThings.slice(0, i), e.target.value, ...eightThings.slice(i + 1)]
                    })
                  }} /></li>
                })
              }
              </ul>
              { this.allValid() && <button onClick={() => {this.setState({step: 1})}}>Start Tracking <span>🙌</span></button> }
            </div>
          )}
          { (step === 1) && (
            <div className="step-two">
              <p className="App-title" >How did you do today?</p>
                <svg viewBox="0 0 100 100">
                  {
                    eightThings.map((thing, i) => {
                      return (
                        <g onMouseEnter={() => this.setState({activeThing: i})} onMouseLeave={() => this.setState({activeThing: null})} key={i} transform={`rotate(${(360 / eightThings.length) * i} 50,50)`}>
                          <line x1="50" y1="50" x2="95" y2="50" strokeWidth="2" stroke="pink"></line>
                          {[1, 2, 3, 4, 5].map((number, index) => {
                            const match = number === scores[i];
                            return <circle onClick={()=>{this.setState({scores: [...scores.slice(0, i), number, ...scores.slice(i + 1)]
                            })}} key={index} cx={`${50 + number * 9}`} cy="50" r="2" stroke="purple" strokeWidth="0" fill={match ? 'purple' : 'pink'} />
                          })}
                        </g>
                      )
                    })
                  }
                </svg>
                <div> {eightThings[activeThing]} </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

                  // <line x1="50" y1="50" x2="10" y2="10" strokeWidth="2" stroke="pink"></line>
                  // <line x1="50" y1="50" x2="50" y2="0" strokeWidth="2" stroke="pink"></line>
                  // <line x1="50" y1="50" x2="90" y2="10" strokeWidth="2" stroke="pink"></line>
                  // <line x1="50" y1="50" x2="100" y2="50" strokeWidth="2" stroke="pink"></line>
                  // <line x1="50" y1="50" x2="90" y2="90" strokeWidth="2" stroke="pink"></line>
                  // <line x1="50" y1="50" x2="50" y2="100" strokeWidth="2" stroke="pink"></line>
                  // <line x1="50" y1="50" x2="10" y2="90" strokeWidth="2" stroke="pink"></line>
                  // <line x1="50" y1="50" x2="0" y2="50" strokeWidth="2" stroke="pink"></line>

export default App;
